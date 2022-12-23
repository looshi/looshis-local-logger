# looshis-local-logger
[![NPM Version](https://img.shields.io/npm/v/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger) [![NPM Downloads](https://img.shields.io/npm/dt/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger)

Stream terminal output to the browser devtools!

![browser next to terminal](https://github.com/looshi/looshis-local-logger/blob/main/examples/example.png)

Leverage the devtool's features like the JSON inspector and filtering for your raw terminal output.

LLL has no dependencies and is less than 150 lines of code.

## Install
```sh
npm i -g looshis-local-logger
```

## How To Use

Send stdout to the browser:

```sh
lll
# Open browser at http://localhost:3333, open devtools.
# Make a GET request for JSON of the planet tatooine ( translated to wookiee ):
LLL> curl -s https://swapi.dev/api/planets/1/?format=wookiee \
  -H "Accept: application/json"
```

Send an application's stdout to the browser:

```sh
lll "node ./examples/node-app/index"
# Open browser at http://localhost:3333, open devtools.
```

CTRL+C to exit.

### More Examples
```sh
# Run npm script:
lll "npm --prefix ./examples/node-app run start"
# Open browser at http://localhost:3333, open devtools.

# Specify a port:
PORT=1234 lll "npm --prefix ./examples/node-app run start"
 # Open browser at: http://localhost:1234/, open devtools.

# Start a ruby app:
lll "ruby ./examples/ruby-app/ruby.rb"
# Open browser at http://localhost:3333, open devtools.

# Pass env vars to the child process:
MY_VAR=3 lll "node ./examples/node-app/index"
# MY_VAR will be available in node-app.index.js
```

## How it works
The server will spawn the given command in a subprocess.  The subprocess stdout/stderr events are then sent to the client via server-sent events.

If no command is given the server listens for stdin, runs that command, and sends its sdtout/stderr to the client via server-sent events.

## Development Notes
Run the examples in development mode:

```sh
# Download the source
git clone https://github.com/looshi/looshis-local-logger.git

# Start a node app
npm run start "node ./examples/node-app/index"

# Run npm script
npm run start "npm --prefix ./examples/node-app run start"

# Specify a port
PORT=1234 npm run start "npm --prefix ./examples/node-app run start"
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
