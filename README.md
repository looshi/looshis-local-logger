# looshis-local-logger
[![NPM Version](https://img.shields.io/npm/v/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger) [![NPM Downloads](https://img.shields.io/npm/dt/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger)

Stream terminal output to the browser devtools!

![browser next to terminal](https://github.com/looshi/looshis-local-logger/blob/main/examples/example.png)

This package has no dependencies and is less than 100 lines of code.

## Install
```sh
npm i -g looshis-local-logger
```

## How To Use
Run `lll` as shown below, open browser at http://localhost:3333, open devtools.

```sh
# Start a node app
lll -- "node ./examples/node-app/index"

# Run npm script
lll -- "npm --prefix ./examples/node-app run start"

# Start a ruby app
lll -- "ruby ./examples/ruby-app/ruby.rb"

# Specify a port
PORT=1234 lll -- "npm --prefix ./examples/node-app run start"
 # Open browser at: http://localhost:1234/
```

## Alternatives:

V8 inspector for Node.js
https://nodejs.org/api/debugger.html#v8-inspector-integration-for-nodejs

IDE plugins

etc.

## Development Notes
The server will `spawn` an application in a subprocess.  The server listens for the subprocess stdout and stderr events and will send those messages to the client via server-sent events.

Run the examples in development mode:

```sh
# Download the source
git clone https://github.com/looshi/looshis-local-logger.git

# Start a node app
npm run start -- "node ./examples/node-app/index"

# Run npm script
npm run start -- "npm --prefix ./examples/node-app run start"

# Specify a port
PORT=1234 npm run start -- "npm --prefix ./examples/node-app run start"
 # http://localhost:1234/

# Start a ruby app
npm run start -- "ruby ./looshis-local-logger/examples/ruby-app/ruby.rb"

```

## Resources

Server Sent Events

https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

Child Process

https://nodejs.org/api/child_process.html#child-process

> If the subprocess writes to stdout in excess of that limit without the output being captured, the subprocess blocks waiting for the pipe buffer to accept more data.

Something to keep in mind that running as a subprocess can affect performance / behavior.

https://github.com/samerbuna/efficient-node/blob/main/500-child-processes.adoc
