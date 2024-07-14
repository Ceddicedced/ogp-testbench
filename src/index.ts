
import * as home from "./home";
import { handleTwitter } from "./twitter";
import { handleOEmbed } from "./oEmbed";
import { getContentType, getStatic, handleError, htmlResponse } from "./utils";
import { handleOGP } from "./ogp";


addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event.request));
}
);

addEventListener("scheduled", (event) => {
	event.waitUntil(handleScheduled(event));
}
);

async function handleScheduled(event: ScheduledEvent) {
	console.log("Scheduled event", event);
}

async function handleRequest(request: Request): Promise<Response> {
	// Log the request details
	//await logRequest(request);

	// Handle the request
	let method = request.method;
	if (method === "OPTIONS") {
		return _handleOPTIONS(request);
	}
	if (method === "POST") {
		return _handlePOST(request);
	}
	if (method === "GET") {
		return _handleGET(request);
	}
	// Return a 405 if the method is not allowed
	return new Response("Method not allowed", {
		status: 405,
		headers: { "content-type": "text/plain" },
	});
}

// Debug function to log request details
async function logRequest(request: Request) {
	console.debug("--- Got a request ---");
	console.debug("Method:", request.method);
	console.debug("URL:", request.url);
	// Log headers
	console.debug("Headers:");
	request.headers.forEach((value, key) => {
		console.debug(`  ${key}: ${value}`);
	});
	console.debug("Body:", request.body);
	// Log Cloudflare specific properties
	console.debug("CF properties:");
	let cf: { [key: string]: any }  = request.cf === undefined ? {"error": "No cf properties"} : request.cf;
	for (let key in cf) {
		console.debug(`  CF.${key}: ${cf[key]}`);
	}
	let bot: { [key: string]: any } = cf.bot === undefined ? {"error": "No bot properties"} : cf.botManagement;
	console.debug("CF.bot properties:");
	for (let key in bot) {
		console.debug(`  CF.bot.${key}: ${bot[key]}`);
	}
	console.debug("--- End of request ---");

}

function _handleOPTIONS(request: Request<unknown, CfProperties<unknown>>) {
	// Retun options response
	return new Response(null, {
		status: 204,
		headers: {
			"access-control-allow-origin": "*",
			"access-control-allow-methods": "GET, POST, OPTIONS",
			"access-control-allow-headers": "*",
		},
	});
}

function _handlePOST(request: Request<unknown, CfProperties<unknown>>) {
	// Not implemented
	return new Response("Method not allowed", {
		status: 405,
		headers: { "content-type": "text/plain" },
	});
}

function _handleGET(request: Request<unknown, CfProperties<unknown>>): Response{
	// If url is empty, return a 404
	const logString = `- ${request.headers.get("user-agent") || "No user agent"} === ${request.headers.get("cf-ipcountry") || "No country"}`;
	console.info(logString);
	let path: string  = new URL(request.url).pathname;
	if (path === "/") {
		return home.homepageResponse();
	}
	if (path.startsWith("/error")) {
		let status = parseInt(path.split("/")[2]);
		return handleError(status);
	}
	if (path.startsWith("/photos")) {
		return handlePhotos(request);	
	}
	if (path.startsWith("/meta")) {
		return htmlResponse(home.META_BASIC);
	}
	if (path.startsWith("/twitter")) {
		return handleTwitter(request);
	}
	if (path.startsWith("/oembed")) {
		return handleOEmbed(request);
	}
	if (path.startsWith("/ogp")) {
		return handleOGP(request);
	}
	if (path.startsWith("/static")) {
		return handleStatic(request);
	}
	if (path === "/robots.txt") {
		return new Response("User-agent: *\nDisallow: /", {
			status: 200,
			headers: { "content-type": "text/plain" },
		});
	}
	if (path === "/favicon.ico") {
		return new Response(null, {
			status: 301,
			headers: { location: "/static/favicon.svg" },
		});
	}
	// Return a 404 for all other paths
	return handleError(404);
}





function handlePhotos(request: Request<unknown, CfProperties<unknown>>): Response {
	// Redirect to https://picsum.photos/ with arguments
	let url = new URL(request.url);
	let foo = url.pathname.split("/");
	
	// Get width and height from the path
	let width = foo[2];
	let height = foo[3];

	if (width === undefined || height === undefined) {
		return handleError(400);
	}

	let blur = url.searchParams.get("blur");
	let grayscale = url.searchParams.get("grayscale");
	let random = url.searchParams.get("random");
	let urlParams = [];

	if (blur !== null) {
		urlParams.push(`blur=${blur}`);
	}
	if (grayscale !== null) {
		urlParams.push(`grayscale=${grayscale}`);
	}
	if (random !== null) {
		urlParams.push(`random=${random}`);
	}
	let urlParamsString = urlParams.join("&");
	let urlToRedirect = `https://picsum.photos/${width}/${height}`;
	if (urlParamsString !== "") {
		urlToRedirect += "?" + urlParamsString;
	}
	return Response.redirect(urlToRedirect);
}

function handleStatic(request: Request<unknown, CfProperties<unknown>>): Response {
	let url = new URL(request.url);
	let path = url.pathname;
	let file = path.split("/").pop();
	if (file === undefined) {
		return handleError(404);
	}
	let headers = new Headers();
	headers.set("content-type", getContentType(file));
	return new Response(getStatic(file), {
		status: 200,
		headers: headers,
	});
}
