const { rescopeObject } = require("./");

const ENCODING = null
class Service {
  readFile(filename) {
    return fs.readFileSync(filename, ENCODING);
  }
}

test('the whole thing', () => {
  const service = new Service();
  const readFileSync = jest.fn(filename => `<h1>Fake ${filename}</h1>`)
  const rescoped = rescopeObject(service, { fs: { readFileSync }, ENCODING: 'utf8' });
  const result = rescoped.readFile("index.html");
  expect(result).toMatchInlineSnapshot(`"<h1>Fake index.html</h1>"`);
  expect(readFileSync).toHaveBeenCalledWith('index.html', 'utf8')
});
