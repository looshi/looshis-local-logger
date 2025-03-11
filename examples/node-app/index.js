function log() {
  const time = Math.ceil(Math.random() * 3);
  console.log("{ try to break the json: parser");
  console.log({ small_log_A: true });
  console.log({ small_log_B: false });
  setTimeout(() => {
    time === 1 ? console.error(err) : console.log(data());
    log();
  }, time * 300);
}
log();

const data = () =>
  JSON.stringify({
    node: "Example of a node app logging to stdout",
    time: Date.now(),
    MY_VAR: process.env.MY_VAR,
    small_array: Array(Math.ceil(Math.random() * 10)).fill("dogs"),
    large_array: Array(Math.ceil(Math.random() * 200)).fill(
      "cats ".repeat(Math.random() * 200)
    ),
  });
const err = new Error("node.js example error");
