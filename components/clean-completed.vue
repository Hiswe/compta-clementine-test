<script>
import { mapActions, mapGetters } from 'vuex'

import {
  TODOS,
  TODOS_GETTER_HAS_COMPLETED,
  TODOS_CLEAN_COMPLETED,
} from '~/store/todos'

export default {
  name: `cc-clean-completed`,
  computed: {
    ...mapGetters(TODOS, {
      hasCompleted: TODOS_GETTER_HAS_COMPLETED,
    }),
  },
  methods: {
    ...mapActions(TODOS, {
      cleanTodos: TODOS_CLEAN_COMPLETED,
    }),
  },
}
</script>

<template lang="pug">
v-scale-transition
  v-tooltip(left)
    template(v-slot:activator="{ on }")
      v-btn(
        fab
        fixed
        bottom
        right
        color="secondary"
        @click="cleanTodos"
        v-if="hasCompleted"
        v-on="on"
      )
        v-icon delete_sweep
    span clean completed
</template>

