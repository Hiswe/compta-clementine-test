<script>
import { mapState } from 'vuex'

import { TODOS, TODOS_LIST } from '~/store/todos'
import ccTodosCreate from '~/components/todos/create'
import ccTodosDisplay from '~/components/todos/display'
import ccCleanCompleted from '~/components/clean-completed'

export default {
  name: `page-index`,
  components: {
    ccTodosCreate,
    ccTodosDisplay,
    ccCleanCompleted,
  },
  transition: `page`,
  head: {
    title: `all`,
  },
  async fetch(nuxtCtx) {
    const { store } = nuxtCtx
    await store.dispatch(`${TODOS}/${TODOS_LIST}`)
  },
  computed: {
    ...mapState(TODOS, {
      todos: `list`,
    }),
  },
}
</script>

<template lang="pug">
main(role="main")
  cc-todos-create
  v-card.elevation-4
    v-list.cc-todos-list
      template(v-for="todo in todos")
        v-divider
        cc-todos-display(:todo="todo" :key="todo.id")
  cc-clean-completed
</template>

<style lang="scss" scoped>
.cc-todos-list {
  padding: 0;
}
</style>
