import { htmlResponse } from "./utils";


const HMTL = `<!DOCTYPE html>
<html>
    <head>
        <title>OGP - Testsuite</title>
        <meta name="theme-color" content="#db0000">
        <meta name="color-scheme" content="dark light">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="creator" content="Ceddicedced">
        <meta name="robots" content="none">
        <link rel="icon" href="./static/favicon.svg" type="image/svg+xml">
    </head>
    <body>
        <h1>Welcome to the Embed - Testsuite!</h1>
        <p>This is a simple Testsuite to test <a href="https://ogp.me/">Open Graph Protocol</a>, <a href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary">Twitter Cards</a>, <a href="https://oembed.com/">oEmbed</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name">Standard Meta Tags</a>.</p>
        <p>Feel free to test the different endpoints and see how they are rendered on different platforms.</p>
        <p>The source code is available on <a href="www.github.com/ceddicedced/ogp-testbench">GitHub</a>.</p>
        <h2>Endpoints</h2>
        <ul>
            <li><a href="./ogp">Open Graph Protocol</a></li>
            <li><a>Twitter Cards</a></li>
            <ul>
                <li><a href="./twitter/summary">Summary</a></li>
                <li><a href="./twitter/large">Large Image</a></li>
                <li><a href="./twitter/app">App</a></li>
                <li><a href="./twitter/player">Player</a></li>
            </ul>
            <li><a href="./oembed">oEmbed</a></li>
            <li><a href="./meta">Standard Meta Tags</a></li>
        </ul>
    </body>
    <footer>
        <p>Powered by <a href="https://workers.cloudflare.com/">Cloudflare Workers</a></p>
    </footer>
    <style>
        footer {
            position: absolute;
            bottom: 0;
            width: 90%;
            text-align: center;
        }
</html>`;
export function homepageResponse(): Response {
  return htmlResponse(HMTL);
}



// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name
export const META_BASIC = `<!DOCTYPE html>
<html>
<head>
<meta name="application-name" content="[application-name] Meta Tag Testsuite">
<meta name="author" content="[author] Cedric Busacker">
<meta name="description" content="[description] Meta Tag Testsuite">
<meta name="generator" content="[generator] Cloudflare Workers">
<meta name="keywords" content="[keywords] Meta, Tag, Testsuite, Cloudflare Workers">
<meta name="referrer" content="origin">
<meta name="theme-color" content="#db0000">
<meta name="color-scheme" content="dark light">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="creator" content="[creator] Cedric Busacker">
<meta name="robots" content="none">
</head>
<body>
<h1>Standard Meta Tags</h1>
<p>This is a simple Testsuite to test the standard meta tags.</p>
</body>
</html>`;



