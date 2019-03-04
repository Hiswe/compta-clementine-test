'use strict'

const shortid = require('shortid')

const dbInit = require('./db')

module.exports = {
  list: listTodos,
  create: createTodo,
  read: readTodo,
  update: updateTodo,
  delete: deleteTodo,
}

async function listTodos(ctx) {
  const db = await dbInit
  const todos = await db.get(`todos`).value()
  ctx.body = todos
}

async function createTodo(ctx) {
  const db = await dbInit
  const { title } = ctx.request.body
  const newTodo = {
    title: title.trim(),
    id: shortid.generate(),
    completed: false,
    createdAt: new Date().valueOf(),
    updatedAt: new Date().valueOf(),
  }
  const todo = await db
    .get(`todos`)
    .push(newTodo)
    .write()
  ctx.body = todo
}

async function readTodo(ctx) {
  const db = await dbInit
  const { id } = ctx.params
  const todo = await db
    .get(`todos`)
    .find({ id })
    .value()
  ctx.body = todo
}

async function updateTodo(ctx) {
  const db = await dbInit
  const { id } = ctx.params
  const { title, completed } = ctx.request.body
  const todoUpdate = await db
    .get(`todos`)
    .find({ id })
    .assign({ title, completed, updatedAt: new Date().valueOf() })
    .write()
  ctx.body = todoUpdate
}

async function deleteTodo(ctx) {
  const db = await dbInit
  const { id } = ctx.params
  const todo = await db
    .get(`todos`)
    .remove({ id })
    .write()
  ctx.body = todo
}
