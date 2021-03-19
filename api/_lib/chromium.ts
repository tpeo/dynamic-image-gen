import core from 'puppeteer-core';
import { getOptions } from './options';
import { FileType } from './types';
let _page: core.Page | null;

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await core.launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(html: string, type: FileType, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 1080, height: 1920 });
    await page.setContent(html);
    //need to set timeout to load some assets but hardcoded
    // await setTimeout(() => {  console.log("World!"); }, 2000);
    const file = await page.screenshot({ type });
    return file;
}
