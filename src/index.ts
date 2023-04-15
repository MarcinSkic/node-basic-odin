import http from "http";
import { Url } from "url";

const PORT = 3000;

const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Hi!</h1>");
    }
);

server.listen(PORT, () => {
    console.log("Server launched: http://localhost:3000");
});
