'use strict'

const shortid = require('shortid')

const dbInit = require('./db')

module.exports = {
  list: listTodos,
  bulkDelete: bulkDeleteTodo,
  bulkUpdate: bulkUpdateTodo,
  create: createTodo,
  read: readTodo,
  update: updateTodo,
  delete: deleteTodo,
}

async function listTodos(ctx) {
  const db = await dbInit
  const dbTodos = await db.get(`todos`).value()
  ctx.body = dbTodos
}

async function bulkUpdateTodo(ctx) {
  const db = await dbInit
  const todos = ctx.request.body
  const dbTodos = await db.get(`todos`).value()
  todos
    .map(todo => {
      return dbTodos.findIndex(dbTodo => dbTodo.id === todo.id)
    })
    .forEach((dbIndex, index) => {
      dbTodos[dbIndex] = todos[index]
    })
  // this will return the full store
  const updatedTodos = await db.set(`todos`, dbTodos).write()
  ctx.body = updatedTodos.todos
}

async function bulkDeleteTodo(ctx) {
  const db = await dbInit
  const todos = ctx.request.body
  const ids = todos.map(todo => todo.id)
  await db
    .get(`todos`)
    .remove(todo => ids.findIndex(id => id === todo.id) >= 0)
    .write()
  ctx.body = todos
}

async function createTodo(ctx) {
  const db = await dbInit
  const { title, id, completed } = ctx.request.body
  const newTodo = {
    title: title.trim(),
    id: id ? id : shortid.generate(),
    completed: typeof completed === `boolean` ? completed : false,
    createdAt: new Date().valueOf(),
    updatedAt: new Date().valueOf(),
  }
  await db
    .get(`todos`)
    .push(newTodo)
    .write()
  const todo = await db
    .get(`todos`)
    .find({ id: newTodo.id })
    .value()
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
