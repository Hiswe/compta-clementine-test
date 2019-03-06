<script>
import { mapActions } from 'vuex'

import { TODOS, TODOS_CREATE, TODOS_TOGGLE_ALL } from '~/store/todos'
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
      this.loading = true
      await this.todosCreate({ todo: { title: this.title } })
      this.title = ``
      this.loading = false
    },
    toggleAll() {
      this.todosToggleAll()
    },
    ...mapActions(TODOS, {
      todosCreate: TODOS_CREATE,
      todosToggleAll: TODOS_TOGGLE_ALL,
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
    v-tooltip(top)
      template(v-slot:activator="{ on }")
        v-btn(icon ripple @click="toggleAll" v-on="on")
          v-icon(color="grey darken-2") keyboard_arrow_down
      span toggle all on/off
  v-list-tile-content
    cc-text-field(
      v-model="title"
      name="new-todo-title"
      placeholder="what needs to be done?"
      :disabled="loading"
    )
  v-list-tile-action
    //- use mousedown to not interfere with blur events
    //- • this is to keep a button for mobile
    v-btn(icon ripple @mousedown.native="onSubmit")
      v-icon(color="secondary darken-2") add
</template>

<style lang="scss" scoped>
</style>
