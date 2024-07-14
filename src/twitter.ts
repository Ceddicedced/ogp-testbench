// 
// Twitter Cards - https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
//

import { handleError, htmlResponse } from "./utils";

const TWITTER_SUMMARY = `<!DOCTYPE html>
<html>
<head>
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@ceddicedced">
<meta name="twitter:creator" content="@ceddicedced">
<meta name="twitter:title" content="X Test - Summary">
<meta name="twitter:description" content="This is a simple summary card for the testsuite.">
<meta name="twitter:image" content="./photos/200/200">
</head>
</html>`;
const TWITTER_CARD_LARGE = `<!DOCTYPE html>
<html>
<head>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@ceddicedced">
<meta name="twitter:creator" content="@ceddicedced">
<meta name="twitter:title" content="X Test - Large Image">
<meta name="twitter:description" content="This is a simple large image card for the testsuite.">
<meta name="twitter:image" content="./photos/200/200">
</head>
</html>`;
const TWITTER_APP = `<!DOCTYPE html>
<html>
<head>
<meta name="twitter:card" content="app">
<meta name="twitter:site" content="@Wikipedia">
<meta name="twitter:description" content="Access the free encyclopedia on your mobile device.">
<meta name="twitter:app:country" content="US">
<meta name="twitter:app:name:iphone" content="Wikipedia">
<meta name="twitter:app:id:iphone" content="324715238">
<meta name="twitter:app:url:iphone" content="wikipedia://article/Meta_element">
<meta name="twitter:app:name:ipad" content="Wikipedia">
<meta name="twitter:app:id:ipad" content="324715238">
<meta name="twitter:app:url:ipad" content="wikipedia://article/Meta_element">
<meta name="twitter:app:name:googleplay" content="Wikipedia">
<meta name="twitter:app:id:googleplay" content="org.wikipedia">
<meta name="twitter:app:url:googleplay" content="wikipedia://article/Meta_element">
</head>
</html>`;

// TODO
export const TWITTER_PLAYER = `<!DOCTYPE html>
<html>
<head>
<meta name="twitter:card" content="player">
<meta name="twitter:site" content="@ceddicedced">
<meta name="twitter:title" content="X Test - Player">
<meta name="twitter:description" content="This is a simple player card for the testsuite.">
<meta name="twitter:image" content="https://graphics8.nytimes.com/images/2012/02/12/us/12whitney-span/12whitney-span-articleLarge.jpg">
<meta name="twitter:player" content="https://www.nytimes.com/video/players/offsite/index.html?videoId=100000007142295">
<meta name="twitter:player:width" content="480">
<meta name="twitter:player:height" content="480">
<meta name="twitter:player:stream" content="https://www.nytimes.com/video/players/offsite/index.html?videoId=100000007142295">
<meta name="twitter:player:stream:content_type" content="video/mp4">
</head>
</html>`;


export function handleTwitter(request: Request<unknown, CfProperties<unknown>>): Response {
	// Handling twitter card requests
	let path = new URL(request.url).pathname;
	if (path.includes("summary")) {
		return htmlResponse(TWITTER_SUMMARY);
	}
	else if (path.includes("large")) {
		return htmlResponse(TWITTER_CARD_LARGE);
	}
	else if (path.includes("app")) {
		return htmlResponse(TWITTER_APP);
	}
	else if (path.includes("player")) {
		return htmlResponse(TWITTER_PLAYER);
	}
	else {
		return handleError(404);
	}
}

