# looshis-local-logger

[![NPM Version](https://img.shields.io/npm/v/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger) [![NPM Downloads](https://img.shields.io/npm/dt/looshis-local-logger.svg?style=flat)](https://www.npmjs.com/package/looshis-local-logger)

View and filter logs in a browser during local development.

![browser window showing logs](https://github.com/looshi/looshis-local-logger/blob/main/examples/example.png)

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

## About

lll is a command-line utility that serves its stdin to a browser, allowing developers a convenient way to filter, format, and copy/paste logs during local development. Any app that outputs to stdout can be used with lll.

lll does its best to keep large JSON logs intact. Other types of logs may span multiple blocks; this may be addressed in the future.

lll is written in HTML, CSS, and JavaScript with no dependencies.
