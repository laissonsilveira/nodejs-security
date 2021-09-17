# nodejs-security

Project about NodeJS Security

> How can you protect your Node.js applications from potential threats?

## Security Overview

Introduction to OWASP and other sources

* https://www.owasp.org

OWASP top 10 in Node.js

* https://nodegoat.herokuapp.com

## Best Practices: Packages

Maintain package dependencies

`npm outdated`
`npm audit`


## Best Practices: Data

Data handling with type and validation

* https://github.com/chriso/validator.js

Set proper HTTP headers with Helmet

* https://helmetjs.github.io

`npm install helmet --save`

`app.use(helmet())`


Encrypt user data and session management

* https://nodejs.org/api/crypto.html#crypto_crypto

```js
const { createHmac } = await import('crypto');

const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');
console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
```

## Best Practices: Server Level

Rate limiting against DoS attacks

* https://www.npmjs.com/package/express-rate-limit

`npm install express-rate-limit --save`

```js
const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after an hour"
});

//  apply to all requests
app.use(limiter);
```

Use csurf to prevent CSRF attacks

* https://github.com/express/csurf

Use cookie attributes

* https://github.com/pillarjs/cookies
* https://github.com/expressjs/cookie-session

## Tools for Testing

Introduction to OWASP dependency check

* https://github.com/jeremylong/DependencyCheck/releases/download/v6.3.1/dependency-check-6.3.1-release.zip
* https://jeremylong.github.io/DependencyCheck/

Find vulnerabilities with Snyk

* https://snyk.io

Penetration testing with Burp

* https://portswigger.net/burp