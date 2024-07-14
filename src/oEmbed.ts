import { AUTHOR, DOMAIN, handleError, htmlResponse } from "./utils";

// 
// oEmbed - https://oembed.com/
//

const O_EMBED_BASE = {
    version: "1.0",
    author_name: AUTHOR,
    author_url: `https://github.com/${AUTHOR}`,
    provider_name: "Cloudflare Workers",
    provider_url: "https://workers.cloudflare.com/",
    cache_age: 60,
    thumbnail_url: `${DOMAIN}/photos/250/250`,
    thumbnail_width: 250,
    thumbnail_height: 250,
};

const O_EMBED_LINK = {
    ...O_EMBED_BASE,
    type: "link",
    title: "oEmbed Test - Link",
    url: `${DOMAIN}/link`,
};

const O_EMBED_PHOTO = {
    ...O_EMBED_BASE,
    type: "photo",
    title: "oEmbed Test - Photo",
    url: `${DOMAIN}/photos/250/250`,
    width: 250,
    height: 250,
};

const O_EMBED_VIDEO = {
    ...O_EMBED_BASE,
    type: "video",
    html: "<iframe src='https://www.youtube.com/embed/dQw4w9WgXcQ' width='250' height='250' frameborder='0' allowfullscreen></iframe>",
    width: 250,
    height: 250,
};

const O_EMBED_RICH = {
    ...O_EMBED_BASE,
    type: "rich",
    html: `<iframe src='${DOMAIN}' width='250' height='250' frameborder='0' allowfullscreen></iframe>`,
    width: 250,
    height: 250,
};

type OEmbedType = "link" | "photo" | "video" | "rich";
function formatTemplate(type: OEmbedType): string {
    return `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="application-name" content="oEmbed Test - ${type}">
    <meta name="title" content="oEmbed Test - ${type}">
    <link rel="alternate" type="application/json+oembed" href="${DOMAIN}/oembed?url=${type}" title="oEmbed">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#db0000">
    <meta name="color-scheme" content="dark light">
    <title>oEmbed Test - ${type}</title>
    </head>
    <body>
    <h1>oEmbed Test - ${type}</h1>
    </body>
    </html>`;
}

const HMTL = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="application-name" content="oEmbed Testbench">
<meta name="title" content="oEmbed Testbench">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#db0000">
<meta name="color-scheme" content="dark light">
<title>oEmbed Testbench</title>
</head>
<body>
<h1>oEmbed Testbench</h1>
<p>This is a simple Testsuite to test the oEmbed standard.</p>
<ul>
<li><a href="./oembed/link">Link</a></li>
<li><a href="./oembed/photo">Photo</a></li>
<li><a href="./oembed/video">Video</a></li>
<li><a href="./oembed/rich">Rich</a></li>
</ul>   </body>
</html>`;

export function handleOEmbed(request: Request<unknown, CfProperties<unknown>>): Response {
	// Handling oembed requests
	let url = new URL(request.url);
	let format = url.searchParams.get("format");
	let urlParam = url.searchParams.get("url");
	let maxwidth = url.searchParams.get("maxwidth");
	let maxheight = url.searchParams.get("maxheight");

	if (urlParam === null) {
        let type = url.pathname.split("/").pop()?.toLowerCase();
        if (type === "link" || type === "photo" || type === "video" || type === "rich") {
            return htmlResponse(formatTemplate(type as OEmbedType));
        }
        return htmlResponse(HMTL);

	}
	if (format !== null && format !== "json") {
		return handleError(501);
	}

	let data: any = null;
	if (urlParam.startsWith("link")) {
		data = O_EMBED_LINK;
	}
	if (urlParam.startsWith("photo")) {
		data = O_EMBED_PHOTO;
	}

	if (urlParam.startsWith("video")) {
		data = O_EMBED_VIDEO;
	}

	if (urlParam.startsWith("rich")) {
		data = O_EMBED_RICH;
	}

	if (data === null) {
		return handleError(404);
	}

	let width = data["width"] === null ? 0 : data["width"];
	if (maxwidth !== null && width > maxwidth) {
		return handleError(400);
	}
	let height = data["height"] === null ? 0 : data["height"];
	if (maxheight !== null && height > maxheight) {
		return handleError(400);
	}

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { "content-type": "application/json" },
	});
}
