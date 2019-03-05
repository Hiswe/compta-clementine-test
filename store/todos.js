export const state = () => {
  return {
    list: [],
  }
}

export const TODOS_GETTER_LEFT_COUNT = `TODOS_GETTER_LEFT_COUNT`
export const TODOS_GETTER_ACTIVE = `TODOS_GETTER_ACTIVE`
export const TODOS_GETTER_DONE = `TODOS_GETTER_DONE`

export const TODOS = `todos`
export const TODOS_LIST = `TODOS_LIST`
export const TODOS_CREATE = `TODOS_CREATE`
export const TODOS_READ = `TODOS_READ`
export const TODOS_UPDATE = `TODOS_UPDATE`
export const TODOS_DELETE = `TODOS_DELETE`

const M_TODOS_LIST = `M_TODOS_LIST`
const M_TODOS_CREATE = `M_TODOS_CREATE`
const M_TODOS_UPDATE = `M_TODOS_UPDATE`
const M_TODOS_DELETE = `M_TODOS_DELETE`

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
}

export const mutations = {
  [M_TODOS_LIST](state, payload) {
    const { todos } = payload
    state.list = todos
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
}

export const actions = {
  async [TODOS_LIST](vuexCtx) {
    const { commit } = vuexCtx
    const { $axios } = this
    const todos = await $axios.$get(`/`)
    commit(M_TODOS_LIST, { todos })
  },
  async [TODOS_CREATE](vuexCtx, payload) {
    const { commit } = vuexCtx
    const { $axios } = this
    const { todo } = payload
    const newTodo = await $axios.$post(`/`, todo)
    commit(M_TODOS_CREATE, { todo: newTodo })
  },
  async [TODOS_UPDATE](vuexCtx, payload) {
    const { commit } = vuexCtx
    const { $axios } = this
    const { todo } = payload
    const updatedTodo = await $axios.$put(`/${todo.id}`, todo)
    commit(M_TODOS_UPDATE, { todo: updatedTodo })
  },
  async [TODOS_DELETE](vuexCtx, payload) {
    const { commit } = vuexCtx
    const { $axios } = this
    const { todo } = payload
    const deletedTodo = await $axios.$delete(`/${todo.id}`)
    commit(M_TODOS_DELETE, { todo: deletedTodo })
  },
}
