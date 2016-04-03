var cheerio = require('cheerio')
var map = require('map-limit')
var request = require('request')
var assign = require('object-assign')
var url = require('url')
var path = require('path')
var fs = require('fs')
var limit = 25

function scripts (body) {
  var $ = cheerio.load(body)
  var tags = []
  $('script').each(function (idx, el) {
    el = $(el)
    tags.push({
      type: el.attr('type'),
      src: el.attr('src'),
      body: el.html() || ''
    })
  })
  return tags
}



module.exports = function (opt, done) {
  if (typeof opt === 'string') opt = { uri: opt }
  else opt = opt || {}

  if (typeof done !== 'function') throw new TypeError('expected callback function')

  getFileString(opt, function (err, body) {
    if (err) done(err)
    // parse script tags
    var tags = scripts(body)
    var baseUrl = url.parse(opt.uri || opt.url)
    var base = baseUrl.href
    if (baseUrl.pathname !== '/' && path.extname(base)) {
      base = path.dirname(base)
    }

    // Do not load contents of scripts if option set to false
    if (typeof opt.loadContents !== 'undefined' && !opt.loadContents) return done(null, tags)

    // map script resources
    map(tags, limit, function (item, next) {
      if (item.src) { // request and replace body
        getFileString(item, next)
      } else {
        next(null, item)
      }
    }, done)
  })
}

// Get string contents of file (local or external)
function getFileString (opt, cb) {
  var uri = opt.uri || ''
  if (!uri && opt.src) uri = opt.src
  // Get local file
  if (uri.indexOf('http') === -1) {
    return fs.readFile(uri, 'utf8', function (err, data) {
      if (err) return cb(err, null)
      cb(null, data)
    })
  }
  // Get external file
  request.get(opt, function (err, resp, body) {
    if (err) return cb(err, null)
    cb(null, body)
  })
}
