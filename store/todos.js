import Vue from 'vue'
import shortid from 'shortid'

export const state = () => {
  return {
    list: [],
  }
}

export const TODOS_GETTER_LEFT_COUNT = `TODOS_GETTER_LEFT_COUNT`
export const TODOS_GETTER_ACTIVE = `TODOS_GETTER_ACTIVE`
export const TODOS_GETTER_DONE = `TODOS_GETTER_DONE`
export const TODOS_GETTER_HAS_COMPLETED = `TODOS_GETTER_HAS_COMPLETED`

export const TODOS = `todos`
export const TODOS_LIST = `TODOS_LIST`
export const TODOS_CREATE = `TODOS_CREATE`
export const TODOS_READ = `TODOS_READ`
export const TODOS_UPDATE = `TODOS_UPDATE`
export const TODOS_DELETE = `TODOS_DELETE`
export const TODOS_TOGGLE_ALL = `TODOS_TOGGLE_ALL`
export const TODOS_CLEAN_COMPLETED = `TODOS_CLEAN_COMPLETED`

const M_TODOS_LIST = `M_TODOS_LIST`
const M_TODOS_CREATE = `M_TODOS_CREATE`
const M_TODOS_UPDATE = `M_TODOS_UPDATE`
const M_TODOS_BULK_UPDATE = `M_TODOS_BULK_UPDATE`
const M_TODOS_DELETE = `M_TODOS_DELETE`
const M_TODOS_BULK_DELETE = `M_TODOS_BULK_DELETE`

export const getters = {
  [TODOS_GETTER_LEFT_COUNT](state) {
    const left = state.list.reduce(
      (acc, todo) => (todo.completed ? acc : acc + 1),
      0,
    )
    return left
  },
  [TODOS_GETTER_ACTIVE](state) {
    return state.list.filter(todo => !todo.completed)
  },
  [TODOS_GETTER_DONE](state) {
    return state.list.filter(todo => todo.completed)
  },
  [TODOS_GETTER_HAS_COMPLETED](state) {
    let hasCompleted = false
    for (let todo of state.list) {
      if (todo.completed) {
        hasCompleted = true
        break
      }
    }
    return hasCompleted
  },
}

export const mutations = {
  [M_TODOS_LIST](state, payload) {
    const { todos } = payload
    Vue.set(state, `list`, todos)
  },
  [M_TODOS_CREATE](state, payload) {
    const { todo } = payload
    state.list.push(todo)
  },
  [M_TODOS_UPDATE](state, payload) {
    const { todo } = payload
    const todoIndex = state.list.findIndex(item => item.id === todo.id)
    // handle Vue reactivity caveat
    // • https://vuejs.org/v2/guide/list.html#Caveats
    // • will be handled in Vue 3
    state.list.splice(todoIndex, 1, todo)
  },
  [M_TODOS_DELETE](state, payload) {
    const { todo } = payload
    const todoIndex = state.list.findIndex(item => item.id === todo.id)
    state.list.splice(todoIndex, 1)
  },
  [M_TODOS_BULK_UPDATE](state, payload) {
    // for now we only accept a full todo list
    // • because bulk update is only used with toggle all
    // • might optimize this in the future
    const { todos } = payload
    Vue.set(state, `list`, todos)
  },
  [M_TODOS_BULK_DELETE](state, payload) {
    const { todos } = payload
    const ids = todos.map(todo => todo.id)
    const remainingTodo = state.list.filter(todo => {
      return ids.findIndex(id => id === todo.id) < 0
    })
    Vue.set(state, `list`, remainingTodo)
  },
}

export const actions = {
  async [TODOS_LIST](vuexCtx) {
    const { commit } = vuexCtx
    const { $axios } = this
    const todos = await $axios.$get(`/`)
    commit(M_TODOS_LIST, { todos })
  },
  // better for the user experience to:
  // • update the store
  // • persist it in DB
  // → doesn't have to wait to the request to have an updated UI
  // → in case of XHR error an error page is displayed
  async [TODOS_CREATE](vuexCtx, payload) {
    const { commit } = vuexCtx
    const { $axios } = this
    const { todo } = payload
    const newTodo = {
      title: todo.title.trim(),
      completed: false,
      id: shortid.generate(),
    }
    commit(M_TODOS_CREATE, { todo: newTodo })
    const dbNewTodo = await $axios.$post(`/`, newTodo)
    commit(M_TODOS_UPDATE, { todo: dbNewTodo })
  },
  async [TODOS_UPDATE](vuexCtx, payload) {
    const { commit } = vuexCtx
    const { $axios } = this
    const { todo } = payload
    commit(M_TODOS_UPDATE, { todo })
    const updatedTodo = await $axios.$put(`/${todo.id}`, todo)
    commit(M_TODOS_UPDATE, { todo: updatedTodo })
  },
  async [TODOS_DELETE](vuexCtx, payload) {
    const { commit } = vuexCtx
    const { $axios } = this
    const { todo } = payload
    commit(M_TODOS_DELETE, { todo })
    await $axios.$delete(`/${todo.id}`)
  },
  async [TODOS_TOGGLE_ALL](vuexCtx, payload) {
    const { commit, state } = vuexCtx
    const { $axios } = this
    let isAllComplete = false
    for (let todo of state.list) {
      if (!todo.completed) {
        isAllComplete = true
        break
      }
    }
    const updatedTodos = state.list.map(todo => ({
      ...todo,
      completed: isAllComplete,
    }))
    commit(M_TODOS_BULK_UPDATE, { todos: updatedTodos })
    const dbUpdatedTodo = await $axios.$put(`/`, updatedTodos)
    commit(M_TODOS_BULK_UPDATE, { todos: dbUpdatedTodo })
  },
  async [TODOS_CLEAN_COMPLETED](vuexCtx, payload) {
    const { commit, state } = vuexCtx
    const { $axios } = this
    const deletedTodos = state.list.filter(todo => todo.completed)
    commit(M_TODOS_BULK_DELETE, { todos: deletedTodos })
    await $axios.$post(`/bulk-delete`, deletedTodos)
  },
}
