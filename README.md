# looshis-local-logger

[![NPM Version](https://img.shields.io/npm/v/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger) [![NPM Downloads](https://img.shields.io/npm/dt/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger)

View and filter logs in a browser during local development.

![browser window showing logs](https://github.com/looshi/looshis-local-logger/blob/main/examples/example.png)

LLL has no dependencies!

## Install

```sh
npm i -g looshis-local-logger
```

## How To Use

```sh
./your-app |& lll
# LLL is ready at: http://localhost:4000 open in browser
```

### Examples

```sh
# Pipe standard error in addition to standard output to lll
./your-app  |& lll

# Pipe only standard output to lll, ignore standard error
./your-app | lll

# Specify a different port for lll
./your-app | LLL_PORT=1234 lll
 # http://localhost:1234

# Run an npm script
npm run start |& lll

# Start a ruby app
ruby ./ruby.rb |& lll
```

### Filtering output

There is an editable javascript function at the top of the browser screen, it must be named "transform" and accepts one argument "logs" which are all of the logs received since the browser has been open. This can be edited to filter, map, and limit the output. Here are some examples:

```js
// Display only logs that contain the string "spinal tap", limit to 11
function transform(logs) {
  return logs.slice(-11).filter((log) => {
    return log.includes("spinal tap");
  });
}
```

```js
// Display only some nested property of JSON logs
function transform(logs) {
  return logs.map((log) => {
    try {
      return JSON.parse(log).some.nested.property;
    } catch (e) {
      return "could not parse";
    }
  });
}
```

## About

lll attempts to organize logs visually. Large logs may sometimes span multiple blocks due to size limitations of piping stdin. lll does its best to keep large JSON-stringified logs in tact. Other kinds of large logs may span multiple blocks in the browser ouptput, e.g. ruby, python, or stderr Error output, in the future this could be addressed.

lll has no dependencies and uses only javascript, html, css, and the built in node Test runner.
