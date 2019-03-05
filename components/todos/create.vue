<script>
import { mapActions } from 'vuex'

import { TODOS, TODOS_CREATE } from '~/store/todos'
import CcTextField from '~/components/form/text-field'

export default {
  name: `cc-todos-create`,
  components: {
    CcTextField,
  },
  data() {
    return {
      title: ``,
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      console.log(`submit`)
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
v-list-tile(
  tag="form"
  @submit.native.prevent="onSubmit"
)
  v-list-tile-avatar
  v-list-tile-content
    cc-text-field(
      v-model="title"
      name="new-todo-title"
      placeholder="what needs to be done?"
      :disabled="loading"
    )
</template>

<style lang="scss" scoped>
</style>
