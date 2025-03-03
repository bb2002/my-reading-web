import puppeteer from 'https://deno.land/x/puppeteer@16.2.0/mod.ts'

Deno.serve(async (req) => {
  try {
    console.log(`wss://chrome.browserless.io?token=RrsSAg72qbhlx5ecae5802670c0027e75d7430a255`)
    // Visit browserless.io to get your free API token
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=RrsSAg72qbhlx5ecae5802670c0027e75d7430a255`,
    })
    const page = await browser.newPage()

    const url = 'https://www3.nhk.or.jp/news/html/20250302/k10014737791000.html';

    await page.goto(url)
    const screenshot = await page.screenshot()

    return new Response(screenshot, {
      headers: { 'Content-Type': 'image/png' },
    })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})