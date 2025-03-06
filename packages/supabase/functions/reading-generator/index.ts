import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const OPENAI_KEY = Deno.env.get("OPENAI_KEY") ?? "";
  const BROWSERLESS_KEY = Deno.env.get("BROWSERLESS_KEY") ?? "";
  const NEXT_PUBLIC_SUPABASE_URL =
    Deno.env.get("NEXT_PUBLIC_SUPABASE_URL") ?? "";
  const NEXT_PUBLIC_SUPABASE_ANON_KEY =
    Deno.env.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") ?? "";

  if (
    OPENAI_KEY ||
    BROWSERLESS_KEY ||
    NEXT_PUBLIC_SUPABASE_URL ||
    NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return new Response(
      JSON.stringify({
        error: "env not found",
      })
    );
  }

  try {
    const supabaseClient = createClient(
      NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const openai = new OpenAI({
      apiKey: OPENAI_KEY,
    });
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_KEY}`,
    });
  } catch (ex) {}

  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=RrsSAg72qbhlx5ecae5802670c0027e75d7430a255`,
    });
    const page = await browser.newPage();

    const url =
      "https://www3.nhk.or.jp/news/html/20250302/k10014737791000.html";
    await page.goto(url);
    const html = await page.content();
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
