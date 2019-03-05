<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'

import { TODOS, TODOS_UPDATE, TODOS_DELETE } from '~/store/todos'

export default {
  name: `cc-todos-display`,
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
      if (this.isEditingTitle) {
        Vue.nextTick(() => this.$refs.inputTitle.focus())
      }
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
form.cc-todos-display(
  @dblclick="toggleEditing"
  @submit.prevent="updateTitle"
  :class="{'cc-todos-display--is-editing': isEditingTitle}"
)
  input(
    type="checkbox"
    v-model="form.completed"
    @change="updateTodo"
  )
  input(
    v-show="isEditingTitle"
    v-model="form.title"
    ref="inputTitle"
    @blur="updateTitle"
  )
  p(
    v-show="!isEditingTitle"
  ) {{form.title}}

  button(type="button" @click="removeTodo") remove

</template>

<style lang="scss" scoped>
.cc-todos-display {
  border: solid 1px green;
}
.cc-todos-display--is-editing {
  border-color: red;
}
input:focus {
  background: pink;
}
</style>
