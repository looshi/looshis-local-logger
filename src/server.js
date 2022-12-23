#! /usr/bin/env node
import { spawn, exec } from 'node:child_process';
import readline from 'readline';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const HERE = fileURLToPath(import.meta.url);
const CLIENT_FILE_PATH = `${path.dirname(HERE)}/client.html`;

const port = process.env.PORT || 3333;
let client;  // allows only one client running at one time
let rl;

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
  console.log(`LLL is ready at: http://localhost:${port}`)
  rl?.prompt();
});

function sendMessage(message) {
  client?.write(`id: ${Date.now()}\n`);
  client?.write(`data: ${message}\n\n`);
}

function onData(data) {
  const msg = data.toString();
  msg.trim().split(`\n`).forEach((line) => {
    sendMessage(line);
    console.log(line);
  });
}

if (process.argv.length > 3) {
  const [program, ...args] = process.argv[2].split(' ');
  console.log("LLL spawning:", program, args);

  const child = spawn(program, args);
  child.stdout.on('data', onData);
  child.stderr.on('data', onData);
  child.on('close', (code) => {
    const msg = `LLL child process exited with code ${code}`;
    sendMessage(msg);
  });
} else {
  let input = [];

  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'LLL>',
  });

  rl.on('line', (line) => {
    if (line.trim().length === 0) return;
    input.push(line);

    let tail = line[line.length - 1];
    if (tail === "\\") return;  // Wait until last char is NOT  "\" for multiline commands.
    const cmd = input.join(' ').replace(/\\/g, "");
    sendMessage(cmd);

    exec(cmd, (error, stdout, stderr) => {
      const output = error || stdout || stderr;
      onData(output);
      console.log(output);
      input = [];
      rl.prompt();
    });
  });
}
