<script>
import { mapGetters } from 'vuex'

import { TODOS, TODOS_LIST, TODOS_GETTER_DONE } from '~/store/todos'
import ccTodosDisplay from '~/components/todos/display'
import ccCleanCompleted from '~/components/clean-completed'

export default {
  name: `page-index`,
  components: {
    ccTodosDisplay,
    ccCleanCompleted,
  },
  transition: `page`,
  async fetch(nuxtCtx) {
    const { store } = nuxtCtx
    await store.dispatch(`${TODOS}/${TODOS_LIST}`)
  },
  computed: {
    ...mapGetters(TODOS, {
      todos: TODOS_GETTER_DONE,
    }),
  },
}
</script>

<template lang="pug">
main(role="main")
  v-card.elevation-6
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
