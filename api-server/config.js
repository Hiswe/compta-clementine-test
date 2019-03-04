'use strict'

const rc = require('rc')

const pkg = require('../package.json')

const config = rc(`compta-clementine`, {})

config.VERSION = pkg.version

config.PORT = config.PORT || process.env.PORT || 4070

config.NODE_ENV = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev = config.NODE_ENV === `development`
config.isProd = config.NODE_ENV === `production`

module.exports = config
