var scrape = require('./')
var test = require('tape')

test('requests all the scripts in a HTML site', function(t) {
  t.plan(3)
  //could use local server here or something
  require('request').get({ 
    uri: 'http://mattdesl.github.io/ink/bundle.js' 
  }, function(err, r, expected) {
    scrape('http://mattdesl.github.io/ink/index.html', function(err, results) {
      if (err) return t.fail(err)
      t.equal(results[0].type, undefined)
      t.equal(results[0].src, 'bundle.js')
      t.equal(results[0].body, expected)
    }) 
  })
})