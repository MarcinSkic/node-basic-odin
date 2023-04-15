import http from "http";
import url, { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, "../", "public");

function router(req: http.IncomingMessage, res: http.ServerResponse) {
    const targetUrl = new url.URL(req.url ?? "", `http:\\${req.headers.host}`);
    console.log(targetUrl);
    switch (targetUrl.pathname) {
        case "/":
            serveFile("index.html", res);
            break;
        case "/about":
            serveFile("about.html", res);
            break;
        case "/contact-me":
            serveFile("contact-me.html", res);
            break;
        case "/brew-coffee":
            serveFile("418.html", res, 418);
            break;
        default:
            serveFile("404.html", res, 404);
            break;
    }
}

async function serveFile(
    filePath: string,
    res: http.ServerResponse,
    statusCode: number = 200
) {
    try {
        const fileContents = await fs.readFile(path.join(htmlPath, filePath));
        res.writeHead(statusCode, { "Content-Type": "text/html" });
        res.end(fileContents);
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server had a problem opening file");
    }
}

const server = http.createServer(router);

server.listen(PORT, () => {
    console.log("Server launched: http://localhost:3000");
});
