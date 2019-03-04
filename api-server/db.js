'use strict'

const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

// this could be easily replaced with a real DB
// • for the exercice it wil be enough
// • it saves us for requiring a DB server
// • or to make a docker image
const adapter = new FileAsync(`async-db.json`)
const dbInit = low(adapter)

dbInit.then(db => db.defaults({ todos: [] }).write())

module.exports = dbInit
