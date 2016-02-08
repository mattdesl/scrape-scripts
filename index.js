var cheerio = require('cheerio')
var map = require('map-limit')
var request = require('request')
var assign = require('object-assign')
var url = require('url')
var path = require('path')

var limit = 25

function scripts(body) {
  var $ = cheerio.load(body)
  var tags = []
  $('script').each(function(idx, el) {
    el = $(el)
    tags.push({
      type: el.attr('type'),
      src: el.attr('src'),
      body: el.html() || ''
    })
  })
  return tags
}

function fetch(base, script, cb) {
  request.get({ uri: script.src, baseUrl: base }, function(err, resp, body) {
    if (err) return cb(err)
    cb(null, assign({}, script, { body: body }))
  })
}

module.exports = function(opt, done) {
  if (typeof opt === 'string')
    opt = { uri: opt }
  else
    opt = opt||{}

  if (typeof done !== 'function')
    throw new TypeError('expected callback function')

  //first grab site body
  request.get(opt, function(err, resp, body) {
    if (err) return done(err)

    //parse script tags
    var tags = scripts(body)
    var baseUrl = url.parse(opt.uri || opt.url)
    var base = baseUrl.href
    if (baseUrl.pathname !== '/' && path.extname(base)) {
      base = path.dirname(base)
    }

    //map script resources
    map(tags, limit, function(item, next) { 
      if (item.src) { //request and replace body
        fetch(base, item, next)
      } else {
        next(null, item)
      }
    }, done)
  })
}