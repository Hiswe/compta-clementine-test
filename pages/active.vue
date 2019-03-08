<script>
import { mapGetters } from 'vuex'

import { TODOS, TODOS_LIST, TODOS_GETTER_ACTIVE } from '~/store/todos'
import ccTodosCreate from '~/components/todos/create'
import ccTodosDisplay from '~/components/todos/display'

export default {
  name: `page-active`,
  components: {
    ccTodosCreate,
    ccTodosDisplay,
  },
  transition: `page`,
  head: {
    title: `active`,
  },
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
  cc-todos-create
  v-card.elevation-4
    v-list.cc-todos-list
      template(v-for="todo in todos")
        v-divider
        cc-todos-display(:todo="todo" :key="todo.id")
</template>

<style lang="scss" scoped>
.cc-todos-list {
  padding: 0;
}
</style>
