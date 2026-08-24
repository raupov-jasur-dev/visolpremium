import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--no-sandbox"] });

async function shot(page, name) {
  await page.screenshot({ path: `/workspace/screenshots/${name}`, fullPage: false });
}

const logs = [];

// Mobile home
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("pageerror", (e) => logs.push("PAGE " + e.message));
mobile.on("console", (m) => { if (m.type() === "error") logs.push("CON " + m.text()); });
await mobile.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle", timeout: 30000 });
await mobile.waitForTimeout(800);
await shot(mobile, "mobile-home.png");
const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
console.log("mobile overflow", overflow);
await mobile.evaluate(() => window.scrollTo(0, 900));
await mobile.waitForTimeout(400);
await shot(mobile, "mobile-scroll.png");

const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
desk.on("pageerror", (e) => logs.push("PAGE " + e.message));
desk.on("console", (m) => { if (m.type() === "error") logs.push("CON " + m.text()); });
await desk.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle", timeout: 30000 });
await desk.waitForTimeout(600);
await desk.evaluate(() => window.scrollTo(0, 1100));
await desk.waitForTimeout(500);
await shot(desk, "carousel.png");
await desk.evaluate(() => window.scrollTo(0, 2800));
await desk.waitForTimeout(400);
await shot(desk, "how.png");

await desk.goto("http://127.0.0.1:8080/create/guldasta", { waitUntil: "networkidle", timeout: 30000 });
await desk.waitForTimeout(400);
await desk.getByRole("button", { name: /Tahrirlash/ }).click();
await desk.waitForTimeout(400);
await shot(desk, "editor-modal.png");
await desk.getByLabel("Kuyov ismi").fill("Alisher");
await desk.waitForTimeout(300);
await shot(desk, "editor-live.png");

await desk.goto("http://127.0.0.1:8080/yoq-sahifa", { waitUntil: "networkidle" });
await shot(desk, "404.png");

console.log("LOGS", JSON.stringify(logs, null, 2));
await browser.close();
