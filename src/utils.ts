
export function handleError(status: number) {
	// Return a redirect to the http.cat image for the status code
	if (isNaN(status)) {
		status = 500;
	}
	return Response.redirect(`https://http
	.cat/${status}`, 302);

}

export function htmlResponse(html: string, status: number = 200) {
	// Return a response with the html string
	return new Response(html, {
		status: status,
		headers: {
			"content-type": "text/html",
		},
	});
}

export function getContentType(file: string): string {
	let extension = file.split(".").pop();
	if (extension === undefined) {
		return "text/plain";
	}
	switch (extension) {
		case "html":
			return "text/html";
		case "css":
			return "text/css";
		case "js":
			return "text/javascript";
		case "png":
			return "image/png";
		case "jpg":
		case "jpeg":
			return "image/jpeg";
		case "svg":
			return "image/svg+xml";
		default:
			return "text/plain";
	}
}

export function getStatic(file: string): string {
	switch (file) {
		case "favicon.svg":
			const svg = `
		  `;
		  return svg;

		case "manifest.json":
			const manifest = `{
				"name": "Embed - Testsuite",
				"short_name": "OGP",
				"start_url": "/",
				"background_color": "#db0000",
				"display": "standalone",
				"theme_color": "#db0000",
				"icons": [
				  {
					"src": "/static/favicon.svg",
					"sizes": "192x192",
					"type": "image/svg+xml"
				  }
				]
			  }`;
			return manifest;

		case "logo.png":
			return "https://ogp.me/logo.png";

		case "thumbnail.png":
			return "https://ogp.me/thumbnail.png";
		default:
			return "Not found";
	}
}

export const DOMAIN = "https://ogp-testbench.ceddicedced.workers.dev";
export const AUTHOR = "Ceddicedced";