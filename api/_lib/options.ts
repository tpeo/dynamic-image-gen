import Chromium = require("chrome-aws-lambda")
const exePath = process.platform === 'win32'
? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
: process.platform === 'linux'
? '/usr/bin/google-chrome'
: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

interface Options {
    args: string[];
    executablePath: string;
    headless: boolean;
}

export async function getOptions(isDev: boolean) {
    let options: Options;
    if (isDev) {
        options = {
            args: [],
            executablePath: exePath,
            headless: true
        };
    } else {
        options = {
            args: Chromium.args,
            executablePath: await Chromium.executablePath,
            headless: Chromium.headless,
        };
    }
    return options;
}
