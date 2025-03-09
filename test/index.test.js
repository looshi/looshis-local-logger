import { exec, spawn } from "child_process";
import { test } from "node:test";
import util from "util";
import assert from "node:assert";
const execPromise = util.promisify(exec);
const options = {
  timeout: 5000,
};

import http from "http";

test("serves stdin", options, (t, done) => {
  // No apparent way to escape stderr piped via |&, testing just "|" sdtin pipe here
  const command = "npm --prefix ./examples/node-app run start | npm run start";

  const subprocess = spawn(command, {
    shell: true,
    stdio: "inherit",
    detached: true,
  });

  setTimeout(() => {
    const opts = {
      hostname: "localhost",
      port: 4000,
      path: "/events",
      method: "GET",
      headers: { Accept: "text/event-stream" },
    };

    const req = http.request(opts, (res) => {
      res.setEncoding("utf8");

      res.on("data", (message) => {
        if (message.includes("Example of a node app logging to stdout")) {
          process.kill(-subprocess.pid);
          done();
        }
      });
      res.on("end", () => {
        process.kill(-subprocess.pid);
        done("Connection closed by server.");
      });
    });
    req.on("error", (e) => {
      process.kill(-subprocess.pid);
      done(`Error with request: ${e.message}`);
    });

    req.end();
  }, 1000);
});

test("lll with options and NO pipe", async (t) => {
  await t.test("-h", options, async (t) => {
    const cmd = "npm run start -- -h";
    const { stdout } = await execPromise(cmd);
    assert(stdout.includes("./path-to-your-app |& lll"));
  });

  await t.test("--help", options, async (t) => {
    const cmd = "npm run start -- --help";
    const { stdout } = await execPromise(cmd);
    assert(stdout.includes("./path-to-your-app |& lll"));
  });

  await t.test("-v", options, async (t) => {
    const cmd = "npm run start -- -v";
    const { stdout } = await execPromise(cmd);
    assert(stdout.includes("LLL v2.0.0"));
  });

  await t.test("--version", options, async (t) => {
    const cmd = "npm run start -- --version";
    const { stdout } = await execPromise(cmd);
    assert(stdout.includes("LLL v2.0.0"));
  });

  await t.test("unsupported option", options, async (t) => {
    const cmd = "npm run start -- --badoption";
    const { stdout } = await execPromise(cmd);
    assert(stdout.includes("unknown option --badoption"));
  });
});

// process.stdin.isTTY = "I don't have a pipe running into me"
// No apparent way to set child process process.stdin.isTTY as true within node --test
// An env var is used for testing purposes in server.js like so:
// if(process.stdin.isTTY || process.env.lll_testing_isTTY)
// tests case where command is just "lll" not "some_program | lll" and NOT "lll -someoption"
test("lll with NO options and NO pipe", options, (t, done) => {
  exec(
    "npm run start",
    {
      env: { ...process.env, lll_testing_isTTY: true },
      stdio: ["ignore", "pipe", "pipe"],
    },
    function (error, stdout, stderr) {
      assert(stderr.includes("Error, could not start lll."));
      assert(stderr.includes("Usage: ./path-to-your-app |& lll"));
      done();
    }
  );
});
