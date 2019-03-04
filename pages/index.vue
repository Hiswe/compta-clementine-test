<script>
import { TODOS_LIST } from '~/store/todos'
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
    await store.dispatch(`todos/${TODOS_LIST}`)
  },
}
</script>

<template lang="pug">
main(role="main")
  p hello world!
  cc-todos-create
</template>
