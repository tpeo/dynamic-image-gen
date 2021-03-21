import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { getScreenshot } from './_lib/chromium';
import { getHtml } from './_templates/insta-story/template';

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

//this file is only used to handle vercel requests
export default async function vercelHandler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        const html = getHtml();
        if (isHtmlDebug) {
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
        }
        const { fileType } = parsedReq;
        const file = await getScreenshot(html, fileType, isDev);
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/${fileType}`);

        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=0, max-age=0`);//doesn't store in cache
        // res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`); //stores in cache for hecka long
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}
