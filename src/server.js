#! /usr/bin/env node
import { spawn, exec } from 'node:child_process';
import readline from 'readline';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const HERE = fileURLToPath(import.meta.url);
const CLIENT_FILE_PATH = `${path.dirname(HERE)}/client.html`;
const VERSION = 'LLL v1.2.0';
const port = process.env.LLL_PORT || 3333;
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
    sendMessage(VERSION)
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

if (process.argv[2]) {
  // If command was passed, start the command as a subprocess and stream its output.
  const [program, ...args] = process.argv[2].split(' ');
  if (program === "-v" || program === "--version") {
    console.log(VERSION);
    process.exit(0);
  }
  if (program === "-h" || program === "--help") {
    console.log(`
    Start listening for stdin:
    lll
    OR start an app:
    lll "node ./examples/node-app/index"
    Then navigate to localhost:3333 in your browser and open devtools.
    `);
    process.exit(0);
  }

  console.log("LLL spawning:", program, ...args);
  const child = spawn(program, args);
  child.stdout.on('data', onData);
  child.stderr.on('data', onData);
  child.on('close', (code) => {
    const msg = `LLL child process exited with code ${code} `;
    sendMessage(msg);
  });
} else {
  // If no command was passed, start LLL in standalone mode and listen for stdin.
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
