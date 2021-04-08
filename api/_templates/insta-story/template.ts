import { readFileSync } from 'fs';

//any local assets must be turned into data strings and inserted into html
//bc puppeteer cannot access local files
//required images
let dyp_logo = 'data:image/svg+xml;utf8,' + encodeURIComponent(readFileSync(`${__dirname}/images/dyp.min.svg`).toString('utf8'));
let overlay_image = 'data:image/png;base64,' + readFileSync(`${__dirname}/images/v20_70.png`).toString('base64');
let bg = 'data:image/png;base64,' + readFileSync(`${__dirname}/images/v19_0.png`).toString('base64');
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
function getCss(background_image: String, slug_length: number) {
    const slug_limit = 7;
    return getFonts() + `body, html {
        margin: 0px;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
      }
      .overlay_image {
        width: 100%;
        height: 100%;
        position: fixed; /* Sit on top of the page content */
        display: block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url("${overlay_image}");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        opacity: 1;
        z-index: 998;
        mix-blend-mode: screen;
      }
      .background_image {
        width: 100%;
        height: 100%;
        ${
          !!background_image ? `background-image: url("${background_image}");` : `background-color: black;`
        }
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        opacity: 1;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
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
        padding-right: 7%;
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
        padding-right: 8%;
        ${
          slug_length > slug_limit ? "padding-top: 5%; \n padding-bottom: 3%;" : "padding-top: 7%; \n padding-bottom: 7%;"
        }
        justify-content: center;
        /* change from flex-start to center if slug long*/
        ${
          slug_length >slug_limit ? "align-items: center;" : "align-items: flex-start;"
        }
        z-index: 999;
      }
      .link_text {
        display: flex;
        ${
          slug_length >slug_limit ? "flex-direction: column;" : "flex-direction: row;"
        }
      }
      .text_chunk_1 {
        display: flex;
        flex: 2;
        padding-top: 5%;
        flex-direction: column;
        z-index: 999;
      }
      .text_chunk_2 {
        display: flex;
        flex: 5.5;
        flex-direction: column;
        z-index: 999;
      }
      .text_chunk_3 {
        display: flex;
        flex: 3.5;
        flex-direction: column;
        z-index: 999;
      }
      .regular_text {
        color: rgba(0,0,0,1);
        font-family: DM Mono;
        font-weight: Regular;
        font-size: 55px;
        opacity: 1;
        text-align: left;
        padding-bottom: 2.5%;
        z-index: 999;
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
        ${
          slug_length >slug_limit ? "text-align: center;" : "text-align: left;"
        }
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

//define what data should be passed from index
export interface InstaStoryReq {
  movement: string,
  slug: string,
  actions: string
}

// export function getHtml(bgImg="", actions=[], name="", slug="") {
export function getHtml(query: InstaStoryReq) {
    let movement_name = query.movement.toUpperCase().replace("-", " ");
    let movement_slug = query.slug;
    let actions_completed = query.actions.split("--").map(x => x.toUpperCase().replace(/-/g, " "));

    return `<!DOCTYPE html>
    <html>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            ${getCss(bg, movement_slug.length)}
        </style>
    <body>
      <div class="overlay_image"> </div>
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
            ${
              actions_completed.map((item, index) => {
                return (
                  `<span class="regular_text">${
                      item +
                      (index !== actions_completed.length - 1 ? "," : "")
                    }</span>`
                )
              }).join('\n')
            }
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
            <p class="link_text">
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