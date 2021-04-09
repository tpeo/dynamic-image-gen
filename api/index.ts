import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { getScreenshot } from './_lib/chromium';
import { getHtml as instaStory } from './_templates/insta-story/template';

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

//this file is only used to handle vercel requests
export default async function vercelHandler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        console.log(parsedReq);
        var html = '';
        let query = parsedReq.query;
        var file = null;
        const fileType = 'jpeg';
        //determine image template to return
        if (parsedReq.extension === 'insta-story') {
            const queryData = {
                movement: (query.movement as string || 'Do Your Part'),
                actions: (query.actions as string || 'completed 0 actions'),
                slug: (query.slug as string || 'dyp')
            }
            html = instaStory(queryData);
            file = await getScreenshot(html, fileType, isDev, 1080, 1920);
        }
        if (isHtmlDebug) {
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
        }
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
