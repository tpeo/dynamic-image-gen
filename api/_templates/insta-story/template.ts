import { readFileSync } from 'fs';
// import marked from 'marked';
// import { sanitizeHtml } from './sanitizer';
// import { ParsedRequest } from './types';
// const twemoji = require('twemoji');
// const twOptions = { folder: 'svg', ext: '.svg' };
// const emojify = (text: string) => twemoji.parse(text, twOptions);

//any local assets must be turned into data strings and inserted into html
//bc puppeteer cannot access local files
//required images
let dyp_logo = 'data:image/svg+xml;utf8,' + encodeURIComponent(readFileSync(`${__dirname}/images/dyp.min.svg`).toString('utf8'));
let background_image = 'data:image/png;base64,' + readFileSync(`${__dirname}/images/v20_70.png`).toString('base64');
//required fonts
const dm_ext = readFileSync(`${__dirname}/../../_fonts/dm_mono_latin_ext.woff2`).toString('base64');
const dm = readFileSync(`${__dirname}/../../_fonts/dm_mono_latin.woff2`).toString('base64');
const fugaz = readFileSync(`${__dirname}/../../_fonts/fugaz_one.woff2`).toString('base64');

function getFonts() {
    return `
    @font-face {
      font-family: 'Fugaz One';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${fugaz}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'DM Mono';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${dm_ext}) format('woff2');
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'DM Mono';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${dm}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    `;
}
function getCss() {
    return getFonts() + `body, html {
        margin: 0px;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
      }
      .background_image {
        width: 100%;
        height: 100%;
        background-image: url("${background_image}");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        opacity: 1;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        /* justify-content: space-around; */
        flex-direction: column;
      }
      .dyp_logo {
        width: 17%;
        height: 17%;
        object-fit: contain;
        margin-top: 5%;
        margin-bottom: 2%;
      }
      .content_view {
        width: 80%;
        height: 70%;
        display: flex;
        flex-direction: column;
      }
      .top_content_view {
        flex: 7;
        background: rgba(242,242,242,1);
        opacity: 1;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        /* align-items: center; */
        justify-content: space-evenly;
        padding-left: 8%;
        padding-top: 5%;
        padding-bottom: 5%;
      }
      .bottom_content_view {
        flex: 1;
        background: rgba(155,69,51,1);
        opacity: 1;
        display: flex;
        flex-direction: column;
        padding-left: 8%;
        padding-top: 8%;
        padding-bottom: 5%;
        justify-content: center;
        overflow: hidden;
      }
      .text_chunk_1 {
        display: flex;
        flex: 2;
        padding-top: 5%;
        flex-direction: column;
      }
      .text_chunk_2 {
        display: flex;
        flex: 5.5;
        flex-direction: column;
      }
      .text_chunk_3 {
        display: flex;
        flex: 3.5;
        flex-direction: column;
      }
      .regular_text {
        color: rgba(0,0,0,1);
        font-family: DM Mono;
        font-weight: Regular;
        font-size: 55px;
        opacity: 1;
        text-align: left;
        padding-bottom: 2.5%;
      }
      .bottom_text {
        color: rgba(255,255,255,1);
        font-family: DM Mono;
        font-weight: Medium;
        font-size: 49px;
        opacity: 1;
        text-align: left;
      }
      .white_italic_url {
        color: rgba(255,255,255,0.8);
        font-family: Fugaz One;
        font-weight: Regular;
        font-size: 61px;
        opacity: 1;
        text-decoration: underline;
        -webkit-text-decoration-color: rgba(255, 255, 255, 1); /* Safari */
        text-decoration-color: rgba(255, 255, 255, 1);
      }
      .white_italic_slash {
        color: rgba(255,255,255,1);
        font-family: Fugaz One;
        font-weight: Regular;
        font-size: 58px;
        opacity: 1;
        text-align: left;
      }
      .white_italic_slug {
        color: rgba(255,255,255,1);
        font-family: Fugaz One;
        font-weight: Regular;
        font-size: 61px;
        opacity: 1;
        text-align: left;
        text-decoration: underline;
      }
      .black_italic_text {
        color: rgba(0,0,0,1);
        font-family: Fugaz One;
        font-weight: Regular;
        font-size: 61px;
        opacity: 1;
        text-align: left;
        padding-bottom: 2.5%;
      }`;
}

export function getHtml() {
    // const { text, theme, md, fontSize, images, widths, heights } = parsedReq;
    let movement_name = "ARSENAL BANNING";
    let movement_slug = "nico";
    // let actions_completed = [];

    return `<!DOCTYPE html>
    <html>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            ${getCss()}
        </style>
    <head>
      <title>
        Document</title>
    </head>
    <body>
      <div class="background_image">
        <img class="dyp_logo" src="${dyp_logo}"/>
        <div class="content_view">
          <div class="top_content_view">
            <div class="text_chunk_1">
              <span class="regular_text">
                I DID MY PART AND...
              </span>
            </div>
            <div class="text_chunk_2">
              <span class="regular_text">
                SIGNED 31 PETITIONS,
              </span>
              <span class="regular_text">
                DONATED $50,
              </span>
              <span class="regular_text">
                SENT 7 TEXTS,
              </span>
              <span class="regular_text">
                MADE 2 PHONE CALLS
              </span>
            </div>
            <div class="text_chunk_3">
              <span class="regular_text">
                TO SUPPORT THE
              </span>
              <span class="black_italic_text">
                ${movement_name}
              </span>
              <span class="regular_text">
                MOVEMENT.
              </span>
            </div>
          </div>
          <div class="bottom_content_view">
            <span class="bottom_text">
              JOIN ME @</span>
            <p style="display: flex">
              <span class="white_italic_url">
                DOYOURPART.io
              </span>
              <span class="white_italic_slug">
                /${movement_slug}
              </span>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>`;
}

// function getImage(src: string, width ='auto', height = '225') {
//     return `<img
//         class="logo"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//         width="${sanitizeHtml(width)}"
//         height="${sanitizeHtml(height)}"
//     />`
// }

// function getPlusSign(i: number) {
//     return i === 0 ? '' : '<div class="plus">+</div>';
// }
