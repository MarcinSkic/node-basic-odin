var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import http from "http";
import url, { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, "../", "public");
function router(req, res) {
    var _a;
    const targetUrl = new url.URL((_a = req.url) !== null && _a !== void 0 ? _a : "", `http:\\${req.headers.host}`);
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
function serveFile(filePath, res, statusCode = 200) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileContents = yield fs.readFile(path.join(htmlPath, filePath));
            res.writeHead(statusCode, { "Content-Type": "text/html" });
            res.end(fileContents);
        }
        catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server had a problem opening file");
        }
    });
}
const server = http.createServer(router);
server.listen(PORT, () => {
    console.log("Server launched: http://localhost:3000");
});
