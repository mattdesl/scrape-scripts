var scrape = require('../');
var test = require('tape');
var ecstatic = require('ecstatic');
var http = require('http');

test('should scrape HTML', run('http://localhost:8038/index.html'));
test('should scrape HTML', run('http://localhost:8038/'));
test('should scrape HTML', run('http://localhost:8038'));
test('should scrape HTML', run({
  uri: 'http://localhost:8038',
  loadSrc: false
}, ''));

function run (opt, scriptSrc) {
  return function (t) {
    t.plan(3);

    var handler = ecstatic(__dirname);
    var server = http.createServer(handler).listen(8038, function () {
      scrape(opt, function (err, results) {
        server.close();
        if (err) return t.fail(err);
        t.equal(results[0].type, undefined);
        t.equal(results[0].src, 'script.js');
        t.equal(results[0].body, typeof scriptSrc !== 'undefined' ? scriptSrc : "console.log('Hello');\n");
      });
    });
  };
}
