import { getScreenshot } from './_lib/chromium';
import { getHtml as instaStory } from './_templates/insta-story/template';
// import { Context } from 'aws-lambda';

exports.instaStory = async function (event: any = {}): Promise<any> {
    try {
        console.log(event)
        var html = '';
        // let query = parsedReq.query;
        var file = null;
        const fileType = 'jpeg';
        //determine image template to return
        // const queryData = {
        //     movement: (query.movement as string || 'Do Your Part'),
        //     actions: (query.actions as string || 'completed 0 actions'),
        //     slug: (query.slug as string || 'dyp')
        // }
        const queryData = {
            movement: 'Do Your Part',
            actions: 'completed 0 actions',
            slug: 'dyp'
        }
        html = instaStory(queryData);
        console.log(html);
        file = await getScreenshot(html, fileType, false, 1080, 1920);
        console.log(file);
        let cacheType = `public, immutable, no-transform, s-maxage=0, max-age=0`;
        // let cacheType = `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`;
        //handle error
        console.log('time to return');
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

