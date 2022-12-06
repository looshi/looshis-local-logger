# looshis-local-logger
This is a node application that serves a child application's stdout on a specified port.

Allows Chrome/Firefox/etc. devtools to be used to filter/view/inspect stdout.

## Install
```sh
git clone https://github.com/looshi/looshis-local-logger.git
```

## Run
npm run start "[command to start your app]"

Navigate to:  http://localhost:3333/, open devtools.  Bask in the glory.

Run the examples:
```sh
# Start a node app via node
npm run start -- "node ./examples/node-app/index"

# Start a node app via npm
npm run start -- "npm --prefix ./examples/node-app run start"

# Specify a port
PORT=1234 npm run start -- "npm --prefix ./examples/node-app run start"
 # http://localhost:1234/

# Start a ruby app
npm run start "ruby ./examples/ruby-app/ruby.rb"

```


## This is dumb I can just use X
Alternatives:

V8 inspector for Node.js
https://nodejs.org/api/debugger.html#v8-inspector-integration-for-nodejs

IDE plugins

etc.


