# looshis-local-logger
[![NPM Version](https://img.shields.io/npm/v/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger) [![NPM Downloads](https://img.shields.io/npm/dt/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger)

Stream terminal output to the browser devtools!

![browser next to terminal](https://github.com/looshi/looshis-local-logger/blob/main/examples/example.png)

LLL is a command line program which allows you to view terminal output in a browser's devtools.  Use the JSON inspector, filter, and more when viewing your terminal's output.

LLL has no dependencies.

## Install
```sh
npm i -g looshis-local-logger
```

## How To Use

Start an application from LLL:

```sh
lll "node ./examples/node-app/index.js"
```

OR start LLL in standalone mode:

```sh
lll
# LLL> Enter Commands
```

After LLL has started, open your browser and navigate to http://localhost:3333, open devtools and click on the console tab.

CTRL+C to exit.

### More Examples
```sh
# Start lll in standalone mode and enter a curl command
lll
curl -s https://swapi.dev/api/planets/1 \
  -H "Accept: application/json"

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
LLL is a lightweight node application that essentially captures stdout and serves it down to an html client.  LLL works slightly different depending on whether you pass it args ( spawn ) or not ( standalone ).

When given a command, LLL will spawn the given command in a subprocess.  The subprocess stdout/stderr events are then sent to a browser-based client via [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).


If no command is given, the server listens for stdin, runs that command, and sends its sdtout/stderr to the client via [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).
