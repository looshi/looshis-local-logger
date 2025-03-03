# looshis-local-logger

[![NPM Version](https://img.shields.io/npm/v/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger) [![NPM Downloads](https://img.shields.io/npm/dt/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger)

Stream terminal output to the browser!

![browser next to terminal](https://github.com/looshi/looshis-local-logger/blob/main/examples/example.png)

LLL is a command line utility to view and filter terminal output in a browser.

LLL has no dependencies!

## Install

```sh
npm i -g looshis-local-logger
```

## How To Use

Start an application from LLL:

```sh
lll "node ./examples/node-app/index.js"
```

After LLL has started, open your browser and navigate to http://localhost:3333, open devtools and click on the console tab.

CTRL+C to exit.

### More Examples

```sh
# Run npm script:
lll "npm --prefix ./examples/node-app run start"
# Open browser at http://localhost:3333, open devtools.

# Specify a port:
LLL_PORT=1234 lll "npm --prefix ./examples/node-app run start"
 # Open browser at: http://localhost:1234/, open devtools.

# Start a ruby app:
lll "ruby ./examples/ruby-app/ruby.rb"
# Open browser at http://localhost:3333, open devtools.

# Pass env vars to the child process:
MY_VAR=3 lll "node ./examples/node-app/index"
# MY_VAR will be available in node-app.index.js
```

## How it works

LLL is a lightweight node application that captures stdout and serves it to an html client.

LLL will spawn the given command in a subprocess. The subprocess stdout/stderr events are then sent to a browser-based client via [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).
