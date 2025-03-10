# Developer Notes

## How to Install LLL and run example apps in development mode:

The examples folder contains apps that will log output and errors to the console.

### Run example Node app and pipe it into lll:

```sh
# Start a node app then pipe it into lll ( without having to install lll as a package)
npm --prefix ./examples/node-app run start |& npm run start

# Run npm script with env vars
MY_VAR=42 npm --prefix ./examples/node-app run start |& npm run start

# Specify a port
npm --prefix ./examples/node-app run start |& LLL_PORT=1234 npm run start
 # http://localhost:1234/
```

### Run example Ruby app and pipe it into lll:

```sh
# Start a ruby app
ruby ./examples/ruby-app/ruby.rb | npm run start
```

### Install this folder as global npm package:

```sh
# if in this project folder:
npm i . -g

# Install this package from local folder
npm i path-to-this-project-folder -g

# Use double dash to pass flags in dev:
npm run start -- --version # will become: lll --version
```

## Related projects

Older project that is web socket based, pretty cool:

https://www.npmjs.com/package/shoe

https://github.com/thlorenz/hyperwatch

## Resources

Server Sent Events

https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

Pipes
https://www.gnu.org/software/bash/manual/bash.html ( 3.2.3 Pipelines )
