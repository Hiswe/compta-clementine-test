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
v-card
  v-list.cc-todos-list
    cc-todos-create
    template(v-for="todo in todos")
      v-divider
      cc-todos-display(:todo="todo" :key="todo.id")
  p double click to edit a todo
</template>

<style lang="scss" scoped>
.cc-todos-list {
  padding: 0;
}
</style>
