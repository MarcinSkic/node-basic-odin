import express, { Express } from "express";
import { fileURLToPath } from "url";
import path from "path";

const app: Express = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, "../", "public");

app.get("/", (req, res) => {
    res.sendFile(path.join(htmlPath, "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(htmlPath, "about.html"));
});

app.get("/contact-me", (req, res) => {
    res.sendFile(path.join(htmlPath, "contact-me.html"));
});

app.get("/brew-coffee", (req, res) => {
    res.sendFile(path.join(htmlPath, "418.html"));
});

app.get("*", (req, res) => {
    res.status(404).sendFile(path.join(htmlPath, "404.html"));
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
