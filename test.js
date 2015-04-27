var scrape = require('./')
var test = require('tape')

test('requests all the scripts in a HTML site', run('http://mattdesl.github.io/ink/index.html'))
test('requests all the scripts in a HTML site', run('http://mattdesl.github.io/ink/'))
test('requests all the scripts in a HTML site', run('http://mattdesl.github.io/ink'))

function run(site) {
  return function(t) {
    t.plan(3)
    //could use local server here or something
    require('request').get({ 
      uri: 'http://mattdesl.github.io/ink/bundle.js' 
    }, function(err, r, expected) {
      scrape(site, function(err, results) {
        if (err) return t.fail(err)
        t.equal(results[0].type, undefined)
        t.equal(results[0].src, 'bundle.js')
        t.equal(results[0].body, expected)
      }) 
    })
  }
}