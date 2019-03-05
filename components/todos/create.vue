<script>
import { mapActions } from 'vuex'

import { TODOS, TODOS_CREATE } from '~/store/todos'

export default {
  name: `cc-todos-create`,
  data() {
    return {
      title: ``,
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      await this.todosCreate({ todo: { title: this.title } })
      this.title = ``
      this.loading = false
    },
    ...mapActions(TODOS, {
      todosCreate: TODOS_CREATE,
    }),
  },
}
</script>

<template lang="pug">
form.cc-todos-create(
  @submit.prevent="onSubmit"
)
  input(
    type="text"
    v-model="title"
    :disabled="loading"
  )
</template>

<style lang="scss" scoped>
.cc-todos-create {
  input {
    border: 1px solid black;
  }
}
</style>

