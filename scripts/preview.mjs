import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function fileFor(url = "/") {
  const pathname = decodeURIComponent(url.split("?")[0] || "/");
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const requested = resolve(join(root, safePath));

  if (!requested.startsWith(root)) return null;
  if (existsSync(requested) && statSync(requested).isFile()) return requested;

  const indexFile = join(requested, "index.html");
  if (existsSync(indexFile)) return indexFile;

  const htmlFile = `${requested}.html`;
  if (existsSync(htmlFile)) return htmlFile;

  return join(root, "404.html");
}

createServer((request, response) => {
  const file = fileFor(request.url);

  if (!file || !existsSync(file)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(file.endsWith("404.html") ? 404 : 200, {
    "Content-Type": types[extname(file)] || "application/octet-stream"
  });
  createReadStream(file).pipe(response);
}).listen(port, host, () => {
  console.log(`Preview running at http://${host}:${port}`);
});
