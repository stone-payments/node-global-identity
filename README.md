# node-global-identity

Global identity library for node.js.

# Usage

```js
import GlobalIdentity from 'node-global-identity';

const gi = new GlobalIdentity({
  apiKey: 'YOUR-API-KEY',
  url: 'GLOBAL-IDENTITY-ADDRESS',
});

gi.authenticate(email, password)
  .then((res) => {
    console.log(res);
    // => { authentication_token: 'token',  user_key: 'key', name: 'user name' }
  })
  .catch((err) => {
    console.error(err);
    // => { message: 'message error' }
  });
```
