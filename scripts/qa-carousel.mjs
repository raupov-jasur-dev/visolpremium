import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(500);
await page.locator("#karusel").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.screenshot({ path: "/workspace/screenshots/carousel.png" });

await page.goto("http://127.0.0.1:8080/create/guldasta", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.getByRole("button", { name: /Tahrirlash/ }).click();
await page.waitForTimeout(300);
await page.getByLabel("Kuyov ismi").fill("Alisher");
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/editor-live.png" });
const text = await page.locator("article").first().innerText();
console.log("INVITATION TEXT CONTAINS", text.includes("Alisher"), text.slice(0, 200).replace(/\n/g, " | "));
await browser.close();
