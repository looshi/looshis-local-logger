import { exec } from "child_process";
import { test } from "node:test";
import util from "util";
import assert from "node:assert";
const execPromise = util.promisify(exec);
const options = {
  timeout: 2000,
};

test("lll with options", async (t) => {
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

// I can't get the child process to inherit process.stdin.isTTY within node --test
// so an env var is used for testing purposes in server.js like so:
// if(process.stdin.isTTY || process.env.lll_testing_only === "cats")
// tests case where commmand is just "lll" not "some_program | lll" and NOT "lll -someoption"
test("lll with NO options and NO pipe", options, (t, done) => {
  exec(
    "npm run start",
    {
      env: { ...process.env, lll_testing_only: "cats" },
      stdio: ["ignore", "pipe", "pipe"],
    },
    function (error, stdout, stderr) {
      assert(stderr.includes("Error, could not start lll."));
      assert(stderr.includes("Usage: ./path-to-your-app |& lll"));
      done();
    }
  );
});
