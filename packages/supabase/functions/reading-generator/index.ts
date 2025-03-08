import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";
import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js@2";
import { Buffer } from "node:buffer";
import { toFile } from "https://deno.land/x/openai@v4.24.0/uploads.ts";

interface IResponse {
  count: number;
  error?: string;
}

function response({ count, error }: IResponse, httpCode: number) {
  return new Response(
    {
      count,
      error,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: httpCode,
    }
  );
}

function updateReadingsStatus(
  ids: string[],
  status: string,
  supabase: SupabaseClient
) {
  return supabase.from("readings").update({ status }).in("id", ids);
}

function updateReadingStatus(
  id: string,
  status: string,
  supabase: SupabaseClient
) {
  return supabase.from("readings").update({ status }).eq("id", id);
}

function levelTo(level: string) {
  switch (level) {
    case "jlpt_n1":
      return ["일본어", "N1"];
    default:
      return [];
  }
}

function lengthTo(length: string) {
  switch (length) {
    case "short":
      return "150~200자";
    case "medium":
      return "300~350자";
    case "long":
      return "500~600자";
    default:
      return null;
  }
}

Deno.serve(async (req) => {
  const OPENAI_KEY = Deno.env.get("OPENAI_KEY") ?? "";
  const BROWSERLESS_KEY = Deno.env.get("BROWSERLESS_KEY") ?? "";
  const NEXT_PUBLIC_SUPABASE_URL =
    Deno.env.get("NEXT_PUBLIC_SUPABASE_URL") ?? "";
  const NEXT_SERVICE_ROLE_KEY = Deno.env.get("NEXT_SERVICE_ROLE_KEY") ?? "";

  if (
    !OPENAI_KEY ||
    !BROWSERLESS_KEY ||
    !NEXT_PUBLIC_SUPABASE_URL ||
    !NEXT_SERVICE_ROLE_KEY
  ) {
    return response({ count: 0, error: "ENV not loaded" }, 500);
  }

  try {
    const supabase = createClient(
      NEXT_PUBLIC_SUPABASE_URL,
      NEXT_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("readings")
      .select("*")
      .eq("status", "PENDING");

    if (error) {
      return response({ count: 0, error: JSON.stringify(error) }, 500);
    }

    if (!data || data.length === 0) {
      return response({ count: 0 }, 200);
    }

    // ids 는 본문 생성기가 처리해야할 아이템을 의미
    const ids = data.map((d) => d.id);

    await updateReadingsStatus(ids, "DOWNLOADING", supabase);

    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_KEY}`,
    });
    const openai = new OpenAI({
      apiKey: OPENAI_KEY,
    });

    await Promise.all(
      data.map((d) => async () => {
        const levelToRes = levelTo(d.level);
        const langToRes = lengthTo(d.length);
        if (levelToRes.length === 0 || !langToRes) {
          await updateReadingStatus(d.id, "ERROR", supabase);
        }

        const page = await browser.newPage();
        await page.goto(d.original_url, { waitUntil: "networkidle0" });
        const html = await page.content();
        await page.close();

        const buffer = Buffer.from(html, "utf-8");
        const file = await openai.files.create({
          file: await toFile(buffer, `${d.id}.html`),
          purpose: "fine-tune",
        });
        const response = await openai.chat.completions.create({
          model: "gpt-o3-mini",
          messages: [
            {
              role: "system",
              content: `
              외국어 자격증 독해 공부를 도와주고 있어. 사용자는 어떤 언어로 작성된 웹 페이지를 HTML 형식의 파일로 업로드 할거야.
              업로드된 웹 페이지를 분석하여 어떤 내용인지 파악하고, 사용자가 원하는 언어와 수준에 맞춰 독해 본문을 만들어내야해.
              모든 응답은 프로그램이 파싱하기 때문에 지시를 정확히 수행하도록 해.
              `,
            },
            {
              role: "user",
              content: `
              ${d.id}.html 파일에는 웹 페이지가 저장되어 있어. 이 페이지에서 말하는 내용을 이해하고 아래 조건에 맞춰서 독해 본문을 생성해.
              - 페이지에 적당한 본문이 없다고 판단되면 '본문없음' 을 반환하도록 해.
              - 본문은 반드시 ${levelToRes[0]}로 작성해야해. 외래어가 있다면 ${levelToRes[0]} 표기법에 맞도록 적도록 해.
              - 생성되는 본문은 ${levelToRes[1]} 자격증에서 나올 수 있는 난이도가 되야 해.
              - 단어와 문법은 되도록 ${levelToRes[1]} 자격증에서 자주 출제되는 단어를 사용 해.
              - 만약, ${levelToRes[1]} 자격증 수준을 초과하는 단어나 문법이 있다면, 더 쉬운 단어로 바꿔야 해.
              - 본문의 길이는 ${langToRes} 정도가 되도록 작성 해.
              - 프로그램이 응답을 읽고 있으므로, 반드시 본문 내용만 반환하도록 해.
              `,
            },
          ],
        });
      })
    );

    // const browser = await puppeteer.connect({
    //   browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_KEY}`,
    // });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  // try {
  //   const browser = await puppeteer.connect({
  //     browserWSEndpoint: `wss://chrome.browserless.io?token=RrsSAg72qbhlx5ecae5802670c0027e75d7430a255`,
  //   });
  //   const page = await browser.newPage();

  //   const url =
  //     "https://www3.nhk.or.jp/news/html/20250302/k10014737791000.html";
  //   await page.goto(url);
  //   const html = await page.content();
  // } catch (e) {
  //   console.error(e);
  //   return new Response(JSON.stringify({ error: e.message }), {
  //     headers: { "Content-Type": "application/json" },
  //     status: 500,
  //   });
  // }
});
