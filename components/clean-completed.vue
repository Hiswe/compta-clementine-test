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
    // fix fab button positioning when have a bottom navigation
    // • https://github.com/vuetifyjs/vuetify/issues/2895
    moveForBottomNavStyle() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return `bottom: 65px`
      }
    },
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
  v-btn(
    fab
    fixed
    bottom
    right
    color="secondary"
    :style="moveForBottomNavStyle"
    @click="cleanTodos"
    v-if="hasCompleted"
  )
    v-icon delete_sweep
</template>
