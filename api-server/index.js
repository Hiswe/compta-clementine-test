'use strict'

const chalk = require('chalk')
const ip = require('ip')
const Koa = require('koa')
const bodyParser = require('koa-body')
const compress = require('koa-compress')
const json = require('koa-json')
const logger = require('koa-logger')
const Router = require('koa-router')
const cors = require('@koa/cors')

const config = require('./config')

const app = new Koa()

app.use(
  bodyParser({
    strict: false,
    // enable body parsing on delete methods
    parsedMethods: [`POST`, `PUT`, `PATCH`, `DELETE`],
  }),
)
app.use(compress())
app.use(json())
app.use(logger())

//----- ERRORS

app.use(async function handleApiError(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    const { status } = ctx
    const { message } = err
    // only log errors >= 500
    const s = (status / 100) | 0
    if (s > 4) {
      console.log(err.original ? err.original : err)
    }
    ctx.body = {
      error: true,
      status,
      message,
      stacktrace: err.stacktrace || err.stack || false,
    }
    ctx.app.emit(`error`, err, ctx)
  }
})

//----- ROUTER

const todos = require('./todos')

app.use(cors({}))

const apiRouter = new Router({
  prefix: `/todos`,
})

apiRouter.get(`/`, todos.list)
apiRouter.post(`/`, todos.create)
apiRouter.put(`/`, todos.bulkUpdate)
apiRouter.del(`/`, todos.bulkDelete)
apiRouter.get(`/:id`, todos.read)
apiRouter.put(`/:id`, todos.update)
apiRouter.del(`/:id`, todos.delete)

app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

//----- LAUNCH

const dbInit = require('./db')

dbInit.then(() => app.listen(config.PORT, endInit))

function endInit() {
  console.log(chalk.green(`[API]`), `on mode`, chalk.yellow(`development`))
  console.log(`     `, `http://localhost:${config.PORT}`)
  console.log(`     `, `http://127.0.0.1:${config.PORT}`)
  console.log(`     `, `http://${ip.address()}:${config.PORT}/`)
}
