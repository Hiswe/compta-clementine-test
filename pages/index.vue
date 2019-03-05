<script>
import { mapState } from 'vuex'

import { TODOS, TODOS_LIST } from '~/store/todos'
import ccTodosCreate from '~/components/todos/create'
import ccTodosDisplay from '~/components/todos/display'

export default {
  name: `page-index`,
  components: {
    ccTodosCreate,
    ccTodosDisplay,
  },
  async fetch(nuxtCtx) {
    const { store } = nuxtCtx
    await store.dispatch(`${TODOS}/${TODOS_LIST}`)
  },
  computed: {
    ...mapState(`todos`, {
      todos: `list`,
    }),
  },
}
</script>

<template lang="pug">
main(role="main")
  p hello world!
  cc-todos-create
  ul
    li(v-for="todo in todos" :key="todo.id")
      cc-todos-display(:todo="todo")
  | double click to edit a todo
</template>
