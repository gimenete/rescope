# rescope

Magically mock dependencies by changing the scope.

This library is just a tiny experiment that uses proxies and `new Function()` to change the scope of existing functions and objects. Why? Let's say you have this code:

```javascript
const fs = require('fs')

const ENCODING = null

class Service {
  readFile(filename) {
    return fs.readFileSync(filename, ENCODING);
  }
}

module.exports = Service
```

In order to unit test the `readFile` method you should mock the `fs` module. There are [ways](https://jestjs.io/docs/en/mock-functions#mock-implementations) to do that, but for example there's no way to change the `ENCODING` variable. With `rescope` you can do both. Full example:

```javascript
  const service = new Service();
  // Change the value of `fs` and `ENCODING`
  const readFileSync = jest.fn(filename => `<h1>Fake ${filename}</h1>`)
  const rescoped = rescopeObject(service, { fs: { readFileSync }, ENCODING: 'utf8' });
  const result = rescoped.readFile("index.html");
  // Test the results
  expect(result).toMatchInlineSnapshot(`"<h1>Fake index.html</h1>"`);
  expect(readFileSync).toHaveBeenCalledWith('index.html', 'utf8')
```
