import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire('C:/Users/Computer Market/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright/package.json');
const { chromium } = require('playwright');

const videoPath = process.argv[2];
const outDir = process.argv[3] || 'scratch/video_frames';

if (!videoPath) {
  throw new Error('Usage: node extract_video_frames.mjs <video> [outDir]');
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const videoUrl = pathToFileURL(videoPath).href;

await page.setContent(`
  <!doctype html>
  <meta charset="utf-8">
  <video id="v" src="${videoUrl}" muted playsinline preload="auto" style="max-width:100%;max-height:100%"></video>
  <canvas id="c"></canvas>
`);

const info = await page.evaluate(async () => {
  const video = document.querySelector('#v');
  await new Promise((resolve, reject) => {
    video.addEventListener('loadedmetadata', resolve, { once: true });
    video.addEventListener('error', () => reject(new Error('Video failed to load')), { once: true });
    video.load();
  });
  return {
    duration: video.duration,
    width: video.videoWidth,
    height: video.videoHeight,
  };
});

const times = [0.5, 2, 4, 6, 8, 10, 12]
  .filter((t) => Number.isFinite(info.duration) && t < info.duration - 0.1);

const results = [];
for (const time of times) {
  const dataUrl = await page.evaluate(async (time) => {
    const video = document.querySelector('#v');
    const canvas = document.querySelector('#c');
    const ctx = canvas.getContext('2d');

    await new Promise((resolve) => {
      video.addEventListener('seeked', resolve, { once: true });
      video.currentTime = time;
    });

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');
  }, time);

  const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
  const file = path.join(outDir, `frame_${String(time).replace('.', '_')}s.png`);
  await writeFile(file, buffer);
  results.push({ time, file });
}

await browser.close();
console.log(JSON.stringify({ info, results }, null, 2));
