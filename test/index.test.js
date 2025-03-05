import { exec } from "child_process";
import test from "node:test";
import assert from "node:assert";

test("-h option", (t, done) => {
  const cmd = "npm run start -- -h";
  exec(cmd, (error, stdout, stderr) => {
    assert(stdout.includes("./path-to-your-app |& lll"));
    done();
  });
});

test("--help option", (t, done) => {
  const cmd = "npm run start -- --help";
  exec(cmd, (error, stdout, stderr) => {
    assert(stdout.includes("./path-to-your-app |& lll"));
    done();
  });
});

test("-v option", (t, done) => {
  const cmd = "npm run start -- -v";
  exec(cmd, (error, stdout, stderr) => {
    assert(stdout.includes("LLL v2.0.0"));
    done();
  });
});

test("--version option", (t, done) => {
  const cmd = "npm run start -- --version";
  exec(cmd, (error, stdout, stderr) => {
    assert(stdout.includes("LLL v2.0.0"));
    done();
  });
});

// fails
test("no option", (t, done) => {
  const cmd = "npm run start";
  exec(cmd, (error, stdout, stderr) => {
    assert(stdout.includes("Error, could not start lll"));
    done();
  });
});
