<script>
import { mapGetters } from 'vuex'

import { TODOS, TODOS_LIST, TODOS_GETTER_ACTIVE } from '~/store/todos'
import ccTodosCreate from '~/components/todos/create'
import ccTodosDisplay from '~/components/todos/display'
import ccDoubleClickHint from '~/components/double-click-hint'

export default {
  name: `page-index`,
  components: {
    ccTodosCreate,
    ccTodosDisplay,
    ccDoubleClickHint,
  },
  transition: `page`,
  async fetch(nuxtCtx) {
    const { store } = nuxtCtx
    await store.dispatch(`${TODOS}/${TODOS_LIST}`)
  },
  computed: {
    ...mapGetters(TODOS, {
      todos: TODOS_GETTER_ACTIVE,
    }),
  },
}
</script>

<template lang="pug">
main(role="main")
  v-card.elevation-6
    v-list.cc-todos-list
      cc-todos-create
      template(v-for="todo in todos")
        v-divider
        cc-todos-display(:todo="todo" :key="todo.id")
  cc-double-click-hint
</template>

<style lang="scss" scoped>
.cc-todos-list {
  padding: 0;
}
</style>
