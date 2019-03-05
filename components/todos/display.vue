<script>
// import Vue from 'vue'
import { mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'

import { TODOS, TODOS_UPDATE, TODOS_DELETE } from '~/store/todos'
import CcCheckbox from '~/components/form/checkbox'
import CcTextField from '~/components/form/text-field'

export default {
  name: `cc-todos-display`,
  components: {
    CcCheckbox,
    CcTextField,
  },
  props: {
    todo: Object,
  },
  data() {
    return {
      form: {},
      isEditingTitle: false,
    }
  },
  created() {
    // local copy for editing
    this.form = cloneDeep(this.todo)
  },
  methods: {
    toggleEditing() {
      this.isEditingTitle = !this.isEditingTitle
      // if (this.isEditingTitle) {
      //   Vue.nextTick(() => this.$refs.inputTitle.focus())
      // }
    },
    updateTodo() {
      this.todosUpdate({ todo: this.form })
    },
    removeTodo() {
      this.todosDelete({ todo: this.form })
    },
    updateTitle() {
      this.isEditingTitle = false
      this.updateTodo()
    },
    ...mapActions(TODOS, {
      todosUpdate: TODOS_UPDATE,
      todosDelete: TODOS_DELETE,
    }),
  },
}
</script>

<template lang="pug">
v-list-tile.cc-todos-display(
  tag="form"
  avatar
  :class="{'cc-todos-display--is-editing': isEditingTitle}"
  @dblclick.native="toggleEditing"
  @submit.prevent.native="updateTitle"
)
  v-list-tile-avatar
    cc-checkbox(
      v-model="form.completed"
      :name="`${todo.id}[completed]`"
      @input="updateTodo"
    )
  v-list-tile-content
    cc-text-field(
      v-model="form.title"
      :name="`${todo.id}[title]`"
      :readonly="!isEditingTitle"
      :disabled="form.completed"
      @blur.native="updateTitle"
    )
  v-list-tile-action(
    v-show="!isEditingTitle"
  )
    v-btn(icon ripple @click="removeTodo")
      v-icon(color="grey lighten-1") close
</template>

<style lang="scss" scoped></style>
