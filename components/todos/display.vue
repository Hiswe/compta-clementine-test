<script>
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
  watch: {
    todo(updatedTodo) {
      this.form = cloneDeep(updatedTodo)
    },
  },
  methods: {
    toggleEditing() {
      this.isEditingTitle = !this.isEditingTitle
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
//- don't use dblclick for mobile support
//- • don't want to include another library
//- • could have been:
//-   @dblclick.native="toggleEditing"
v-list-tile.cc-todo(
  tag="form"
  avatar
  @submit.prevent.native="updateTitle"
)
  v-list-tile-avatar
    v-scale-transition
      cc-checkbox(
        v-model="form.completed"
        :name="`${todo.id}[completed]`"
        @input="updateTodo"
        v-show="!isEditingTitle"
      )
  v-list-tile-content
    cc-text-field.cc-todo__input(
      v-model="form.title"
      :name="`${todo.id}[title]`"
      :readonly="!isEditingTitle"
      :disabled="form.completed"
      @blur.native="updateTitle"
      @click.native="toggleEditing"
    )
  v-list-tile-action
    //- use mousedown to not interfere with blur events
    //- • this is to keep a button for mobile
    v-btn(v-if="!isEditingTitle" icon ripple @mousedown.native="removeTodo")
      v-icon(color="grey lighten-1") close
    v-btn(v-else icon ripple @mousedown.native="updateTitle")
      v-icon(color="secondary darken-2") check
</template>

<style lang="scss" scoped>
.cc-todo__input[disabled] {
  text-decoration: line-through;
}
</style>
