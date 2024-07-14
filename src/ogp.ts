//
// Open Graph Protocol - https://ogp.me/
//

import { handleError, htmlResponse } from "./utils";

// Following tags MUST always be included: og:title, og:type, og:image, og:url
export const OGP_BASIC = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>OGP Test - Website</title>
<meta property="og:title" content="OGP Test - Website" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ogp.me/" />
<meta property="og:image" content="https://ogp.me/logo.png" />
</head>
</html>`;

// Following tags CAN always be included: og:description, og:determiner, og:locale, og:locale:alternate, og:site_name, og:video, og:audio
export const OGP_OPTIONAL = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="OGP Test - Website" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ogp.me/" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:description" content="The Open Graph protocol enables any web page to become a rich object in a social graph." />
<meta property="og:determiner" content="the" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="de_DE" />
<meta property="og:site_name" content="Open Graph Protocol" />
<meta property="og:video" content="https://example.com/awesome.swf" />
<meta property="og:audio" content="https://example.com/awesome.mp3" />
</head>
</html>`;

export const OGP_ARTICLE = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="OGP Test - Article" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://ogp.me/" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:description" content="The Open Graph protocol enables any web page to become a rich object in a social graph." />
<meta property="og:determiner" content="the" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="fr_FR" />
<meta property="og:site_name" content="Open Graph Protocol" />
<meta property="article:published_time" content="2008-01-25T18:24:00Z" />
<meta property="article:modified_time" content="2008-01-25T18:24:00Z" />
<meta property="article:expiration_time" content="2008-01-25T18:24:00Z" />
<meta property="article:author" content="https://example.com/author" />
<meta property="article:section" content="Frontpage" />
<meta property="article:tag" content="Article Tag" />
</head>
</html>`;

export const OGP_BOOK = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>OGP Test - Book</title>
<meta property="og:title" content="OGP Test - Book" />
<meta property="og:type" content="book" />
<meta property="og:url" content="https://ogp.me/" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:description" content="The Open Graph protocol enables any web page to become a rich object in a social graph." />
<meta property="og:determiner" content="the" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="fr_FR" />
<meta property="og:site_name" content="Open Graph Protocol" />
<meta property="book:author" content="https://example.com/author" />
<meta property="book:isbn" content="978-3-16-148410-0" />
<meta property="book:release_date" content="2008-01-25" />
<meta property="book:tag" content="Book Tag" />
</head>
</html>`;

export const OGP_PROFILE = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="OGP Test - Profile" />
<meta property="og:type" content="profile" />
<meta property="og:url" content="https://ogp.me/" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:description" content="The Open Graph protocol enables any web page to become a rich object in a social graph." />
<meta property="og:determiner" content="the" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="de_DE" />
<meta property="og:site_name" content="Open Graph Protocol" />
<meta property="profile:first_name" content="Cedric" />
<meta property="profile:last_name" content="Busacker" />
<meta property="profile:username" content="Ceddicedced" />
</head>
</html>`;

const OGP_IMAGE = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="Open Graph Protocol" />
<meta property="og:type" content="image" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:image:secure_url" content="https://ogp.me/logo.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="300" />
<meta property="og:image:height" content="300" />
<meta property="og:image:alt" content="A shiny logo" />
</head>
</html>`;

const OGP_VIDEO = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="Open Graph Protocol" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:video" content="https://example.com/awesome.swf" />
<meta property="og:video:secure_url" content="https://example.com/awesome.swf" />
<meta property="og:video:type" content="application/x-shockwave-flash" />
<meta property="og:video:width" content="400" />
<meta property="og:video:height" content="300" />
<meta property="og:video:alt" content="A shiny video" />
</head>
</html>`;

const OGP_AUDIO = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="Open Graph Protocol" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:audio" content="https://example.com/awesome.mp3" />
<meta property="og:audio:secure_url" content="https://example.com/awesome.mp3" />
<meta property="og:audio:type" content="audio/mpeg" />
</head>
</html>`;

const OGP_ARRAY = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="Open Graph Protocol" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="300" />
<meta property="og:image:height" content="300" />
<meta property="og:image:alt" content="A shiny logo" />
<meta property="og:image" content="https://ogp.me/another-logo.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="300" />
<meta property="og:image:height" content="300" />
<meta property="og:image:alt" content="A shiny logo" />
<meta property="og:image" content="https://ogp.me/yet-another-logo.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="300" />
<meta property="og:image:height" content="300" />
<meta property="og:image:alt" content="A shiny logo" />
<meta property="og:image" content="https://ogp.me/one-more-logo.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="300" />
<meta property="og:image:height" content="300" />
<meta property="og:image:alt" content="A shiny logo" />
<meta property="og:image" content="https://ogp.me/last-logo.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="300" />
<meta property="og:image:height" content="300" />
<meta property="og:image:alt" content="A shiny logo" />
<meta property="og:image" content="https://ogp.me/very-last-logo.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="300" />
<meta property="og:image:height" content="300" />
<meta property="og:image:alt" content="A shiny logo" />
</head>
</html>`;

const OGP_SONG = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="Open Graph Protocol" />
<meta property="og:type" content="music.song" />
<meta property="og:url" content="https://ogp.me/" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:description" content="The Open Graph protocol enables any web page to become a rich object in a social graph." />
<meta property="music:duration" content="234" />
<meta property="music:album" content="https://example.com/album" />
<meta property="music:album:disc" content="1" />
<meta property="music:album:track" content="1" />
<meta property="music:musician" content="https://example.com/musician" />
</head>
</html>`;

const OGP_ALBUM = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="Open Graph Protocol" />
<meta property="og:type" content="music.album" />
<meta property="og:url" content="https://ogp.me/" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:description" content="The Open Graph protocol enables any web page to become a rich object in a social graph." />
<meta property="music:song" content="https://example.com/song" />
<meta property="music:song:disc" content="1" />
<meta property="music:song:track" content="1" />
<meta property="music:musician" content="https://example.com/musician" />
</head>
</html>`;

const OGP_PLAYLIST = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="Open Graph Protocol" />
<meta property="og:type" content="music.playlist" />
<meta property="og:url" content="https://ogp.me/" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:description" content="The Open Graph protocol enables any web page to become a rich object in a social graph." />
<meta property="music:song" content="https://example.com/song" />
<meta property="music:song:disc" content="1" />
<meta property="music:song:track" content="1" />
<meta property="music:song" content="https://example.com/another-song" />
<meta property="music:song:disc" content="1" />
<meta property="music:song:track" content="2" />
<meta property="music:creator" content="https://example.com/creator" />
</head>
</html>`;

const OGP_RADIO_STATION = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
<title>Open Graph Protocol</title>
<meta property="og:title" content="Open Graph Protocol" />
<meta property="og:type" content="music.radio_station" />
<meta property="og:url" content="https://ogp.me/" />
<meta property="og:image" content="https://ogp.me/logo.png" />
<meta property="og:description" content="The Open Graph protocol enables any web page to become a rich object in a social graph." />
<meta property="music:creator" content="https://example.com/creator" />
</head>
</html>`;

const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="application-name" content="OGP Testbench">
<meta name="title" content="OGP Testbench">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#db0000">
<meta name="color-scheme" content="dark light">
<title>OGP Testbench</title>
</head>
<body>
<h1>Welcome to the OGP - Testsuite!</h1>
<ul>
<li><a href="./ogp/basic">Basic</a></li>
<li><a href="./ogp/optional">Optional</a></li>
<li><a href="./ogp/article">Article</a></li>
<li><a href="./ogp/book">Book</a></li>
<li><a href="./ogp/profile">Profile</a></li>
<li><a href="./ogp/image">Image</a></li>
<li><a href="./ogp/video">Video</a></li>
<li><a href="./ogp/audio">Audio</a></li>
<li><a href="./ogp/array">Array</a></li>
<li><a href="./ogp/song">Song</a></li>
<li><a href="./ogp/album">Album</a></li>
<li><a href="./ogp/playlist">Playlist</a></li>
<li><a href="./ogp/radio_station">Radio Station</a></li>
</ul>   </body>
</html>`;

export function handleOGP(request: Request<unknown, CfProperties<unknown>>) {
		let url = new URL(request.url);
		let type = url.pathname.split("/")[2];
		if (type === undefined) {
			return htmlResponse(HTML);
		}
		if (type === "basic") {
			return htmlResponse(OGP_BASIC);
		}
		if (type === "optional") {
			return htmlResponse(OGP_OPTIONAL)
		}
		if (type === "article") {
			return htmlResponse(OGP_ARTICLE);
		}
		if (type === "book") {
			return htmlResponse(OGP_BOOK);
		}
		if (type === "profile") {
			return htmlResponse(OGP_PROFILE);
		}
		if (type === "image") {
			return htmlResponse(OGP_IMAGE);
		}
		if (type === "video") {
			return htmlResponse(OGP_VIDEO);
		}
		if (type === "audio") {
			return htmlResponse(OGP_AUDIO);
		}
		if (type === "array") {
			return htmlResponse(OGP_ARRAY);
		}
		if (type === "song") {
			return htmlResponse(OGP_SONG);
		}
		if (type === "album") {
			return htmlResponse(OGP_ALBUM);
		}
		if (type === "playlist") {
			return htmlResponse(OGP_PLAYLIST);
		}
		if (type === "radio_station") {
			return htmlResponse(OGP_RADIO_STATION);
		}

		return handleError(404);
}
