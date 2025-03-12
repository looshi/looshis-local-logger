#! /usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const HERE = fileURLToPath(import.meta.url);
const CLIENT_FILE_PATH = `${path.dirname(HERE)}/client.html`;
const VERSION = "LLL v2.0.0";
const port = process.env.LLL_PORT || 4000;
let client; // allows only one client running at one time

http
  .createServer((req, res) => {
    if (req.url === "/events") {
      client = res;
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      });
    } else {
      const html = fs.readFileSync(CLIENT_FILE_PATH, "utf8");
      res.end(html.replace("{{port}}", port));
    }
  })
  .listen(port, () => {
    console.log(`LLL is ready at: http://localhost:${port}`);
  });

function sendMessage(message) {
  client?.write(`id: ${Date.now()}\n`);
  client?.write(`data: ${message}\n\n`);
}

let lastGoodJSON = "";
let isConcating = false;
function onStdIn(data) {
  // If the data is probably an error that came in from stderr
  if (data.startsWith("Error")) {
    const msg = data.trim().split(`\n`).join("NEW_LINE_CHARACTER");
    return sendMessage(msg);
  }

  data
    .trim()
    .split(`\n`)
    .forEach((line) => {
      // If the data is json-like start concatenating the chunks.
      const isLargeJsonStart =
        line.startsWith("{") &&
        line.includes(":") &&
        !line.endsWith("}") &&
        line.length > 256;
      const isLargeArrayStart =
        line.startsWith("[") &&
        line.includes(",") &&
        line.length > 256 &&
        !line.endsWith("]");

      if (isConcating === false && (isLargeJsonStart || isLargeArrayStart)) {
        isConcating = true;
      }

      if (isConcating) {
        try {
          lastGoodJSON += line.trim();
          // Done when the concatenated chunks can be parsed as one object.
          JSON.parse(lastGoodJSON);
          sendMessage(lastGoodJSON);
          isConcating = false;
          lastGoodJSON = "";
        } catch (e) {}
      } else {
        sendMessage(line.trim());
      }
    });
}

if (process.argv?.[2]) {
  // If lll is not part of a pipe and -h or -v given
  const [option] = process.argv[2].split(" ");

  if (option === "-v" || option === "--version") {
    console.log(VERSION);
    process.exit(0);
  }
  if (option === "-h" || option === "--help") {
    console.log(`
    Start your app and pipe its output to lll:
    ./path-to-your-app |& lll
    Then navigate to localhost:4000 in your browser.
    `);
    process.exit(0);
  }
  console.log(`unknown option ${option}`);
  process.exit(0);
} else if (process.stdin.isTTY || process.env.lll_testing_isTTY) {
  // if lll has no pipes before it, e.g. "lll" NOT "some_program | lll", exit early and show message to user
  console.error(`
    Error, could not start lll.
    Usage: ./path-to-your-app |& lll
    `);
  process.exit(0);
} else {
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onStdIn);
  process.stdin.pipe(process.stdout);
  process.stdin.on("close", () => {
    console.log("LLL has stopped.");
    process.exit(0);
  });
}
