function log() {
  const time = Math.round(Math.random() * 4000);
  setTimeout(() => {
    time % 3 == 0 ?
      console.log(data()) :
      console.error(err);
    log();
  }, time)
}
log();

const data = () => JSON.stringify({
  node: 'Example of a node app logging to stdout',
  time: Date.now(),
})
const err = new Error('node.js example error');
