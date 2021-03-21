import { parseRequest } from './_lib/parser';
import { getScreenshot } from './_lib/chromium';
import { getHtml } from './_templates/insta-story/template';

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

import { Context } from 'aws-lambda';

exports.instaStory = async function(event: any, context: Context) {
    try {
        const parsedReq = parseRequest(req);
        const html = getHtml();
        if (isHtmlDebug) {
            //handle error
            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "text/html",
                },
                body: html,
            };
        }
        const { fileType } = parsedReq;
        const file = getScreenshot(html, fileType, isDev);
        let cacheType = `public, immutable, no-transform, s-maxage=0, max-age=0`;
        // let cacheType = `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`;

        //handle error
        return {
            statusCode: 200,
            headers: {
                "Content-Type": `image/${fileType}`,
                "Cache-Control": cacheType
            },
            body: file,
          };
    } catch (e) {
        console.error(e);
        //handle error
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "text/html",
            },
            body: '<h1>Internal Error</h1><p>Sorry, there was a problem</p>',
          };
    }

};
