# looshis-local-logger

[![NPM Version](https://img.shields.io/npm/v/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger) [![NPM Downloads](https://img.shields.io/npm/dt/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger)

Stream logs in the browser!

![browser window showing logs](https://github.com/looshi/looshis-local-logger/blob/main/examples/example.png)

LLL is a command line program to view and filter terminal output in a browser.

LLL has no dependencies!

## Install

```sh
npm i -g looshis-local-logger
```

## How To Use

```sh
./path-to-your-app |& lll
# LLL is ready at: http://localhost:1224 open in browser
```

### Examples

```sh
# Pipe standard error in addition to standard output to lll.
npm run start |& lll

# Pipe only standard output to lll.
npm run start | lll

# Specify a different port for lll
LLL_PORT=1234; npm run start |& lll
 # http://localhost:1234

# Start a ruby app
ruby ./ruby.rb |& lll
```
