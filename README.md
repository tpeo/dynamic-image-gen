<a href="https://vercel.com/new/project?template=vercel/og-image"><img width="128" src="https://vercel.com/button" align="right"></a>

# Jonathan's Dynamic Image Generation for DoYourPart.io
Creating images to share to social media dynamically + og images for link sharing. Originally forked from vercel/og-image to be launched on Vercel. I rewrote to add more image templates and launch on AWS Lambda.

# Dynamic Social Media dn OG Image as a Service

Serverless service that generates dynamic Open Graph images that you can embed in your `<meta>` tags.

For each keystroke, headless chromium is used to render an HTML page and take a screenshot of the result which gets cached.

See the image embedded in the tweet for a real use case.


## What is an Open Graph Image?

Have you ever posted a hyperlink to Twitter, Facebook, or Slack and seen an image popup?
How did your social network know how to "unfurl" the URL and get an image?
The answer is in your `<head>`.

The [Open Graph protocol](http://ogp.me) says you can put a `<meta>` tag in the `<head>` of a webpage to define this image.

It looks like the following:

```html
<head>
  <title>Title</title>
  <meta property="og:image" content="http://example.com/logo.jpg" />
</head>
```

## Why use this service?

It takes forever to design an image for every single campaign page and social media share. And we don't want the exact same image for every user because that wouldn't make the image special to share. So... we automate it, nice!


## Deploy your own

You'll want to fork this repository and deploy your own image generator.


## Authors
- Jonathan Wong @wonathanjong
