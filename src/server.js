#! /usr/bin/env node

import { spawn } from 'node:child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const HERE = fileURLToPath(import.meta.url);
const CLIENT_FILE_PATH = `${path.dirname(HERE)}/client.html`;

// server
const port = process.env.PORT || 3333;
let client;  // allows only one client running at one time
http.createServer((req, res) => {
  if (req.url === '/events') {
    client = res;
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    });
    sendMessage("LLL ready...")
  } else {
    const html = fs.readFileSync(CLIENT_FILE_PATH, 'utf8');
    res.end(html.replace("{{port}}", port));
  }
}).listen(port, () => {
  console.log(`LLL now running at http://localhost:${port}`)
});

// https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events
function sendMessage(message) {
  client?.write(`id: ${Date.now()}\n`);
  client?.write(`data: ${message}\n\n`);
}

// child process
if (process.argv.length < 3) {
  console.error("LLL error: missing command argument");
  console.error("usage: npm run start -- [command]");
  process.exit(1);
}

const [program, ...args] = process.argv[2].split(' ');
console.log("lll spawning:", program, args);

function onData(data) {
  const msg = data.toString();
  msg.trim().split(`\n`).forEach((line) => {
    sendMessage(line);
    console.log(line);
  });
}
const child = spawn(program, args);
child.stdout.on('data', onData);
child.stderr.on('data', onData);
child.on('close', (code) => {
  const msg = `LLL child process exited with code ${code}`;
  sendMessage(msg);
  console.log(msg);
});
