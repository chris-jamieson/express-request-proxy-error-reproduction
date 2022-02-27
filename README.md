# express-request-proxy error reproduction

Using Node version 16.14.0, [express-request-proxy](https://www.npmjs.com/package/express-request-proxy) fails to forward requests
which include a request body (payload) to the destination server.

Tested using Node 16.14.0 (NPM 8.3.1) and Express 4.17.3, with express-request-proxy package version 2.2.2

## Steps to reproduce

1. `git clone git@github.com:jamiesoncj/express-request-proxy-error-reproduction.git`
1. `cd express-request-proxy-error-reproduction.git`
1. `nvm install 16.14.0` then `nvm use 16.14.0`
1. `npm install`
1. `node main.js` (start the destination server)
1. `node proxy.js` (start the proxy server)
1. `curl -X GET http://localhost:3001/proxy-route` - send a simple GET request. Destination server should return OK
1. `curl -X POST http://localhost:3001/proxy-route -H 'Content-Type: application/json' ` - send a simple POST request with _no_ request body (payload). Destination server should return OK
1. `curl -X POST http://localhost:3001/proxy-route -H 'Content-Type: application/json' -d '{"example": "valuehere"}'` - send a simple POST request including a request body (payload). Destination server should return OK, however it hangs indefinitely. No error is thrown.

## Reverting to older version fixes the issue

1. `rm -rf node_modules` delete all node modules
1. In `package.json`, set engines:
   ```
   "engines": {
     "node": "14.18.3",
     "npm": "6.14.15"
   },
   ```
1. `nvm install 14.15.1` then `nvm use 14.15.1`
1. `node main.js` (start the destination server)
1. `node proxy.js` (start the proxy server)
1. `curl -X POST http://localhost:3001/proxy-route -H 'Content-Type: application/json' -d '{"example": "valuehere"}'` - send a simple POST request including a request body (payload). Destination server returns OK
