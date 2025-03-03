# Developer Notes

## How to Install LLL and run example apps in development mode:

Included in this examples folder are a couple of apps that will log some json as well as some errors on a timer just to demonstrate how those come through to the client app.

```sh
# Download the source
git clone https://github.com/looshi/looshis-local-logger.git

# Start a node app
npm run start "node ./examples/node-app/index"

# Run npm script with env vars to be passed to child process
MY_VAR=42 npm run start "npm --prefix ./examples/node-app run start"

# Specify a port
LLL_PORT=1234 npm run start "npm --prefix ./examples/node-app run start"
 # http://localhost:1234/

# Start a ruby app
npm run start "ruby ./examples/ruby-app/ruby.rb"

# Install this package from local folder
npm i path-to-this-project-folder -g
# if in this project folder, simply do:
npm i . -g
# Use double dash to pass flags in dev:
npm run start -- --version  # will become: lll --version
https://unix.stackexchange.com/questions/11376/what-does-double-dash-mean
```

## Related projects

Older project that is web socket based, pretty cool:

https://www.npmjs.com/package/shoe

https://github.com/thlorenz/hyperwatch

## Resources

Server Sent Events

https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

Child Process

https://nodejs.org/api/child_process.html#child-process

> If the subprocess writes to stdout in excess of that limit without the output being captured, the subprocess blocks waiting for the pipe buffer to accept more data.

Something to keep in mind that running as a subprocess can affect performance / behavior.

https://github.com/samerbuna/efficient-node/blob/main/500-child-processes.adoc
