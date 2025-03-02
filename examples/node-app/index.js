function log() {
  const time = Math.ceil(Math.random() * 3);
  setTimeout(() => {
    time === 1 ? console.error(err) : console.log(data());
    log();
  }, time * 500);
}
log();

const data = () =>
  JSON.stringify({
    node: "Example of a node app logging to stdout",
    time: Date.now(),
    MY_VAR: process.env.MY_VAR,
  });
const err = new Error("node.js example error");
