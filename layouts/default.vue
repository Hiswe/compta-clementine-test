<script>
import { mapGetters } from 'vuex'

import { TODOS, TODOS_GETTER_LEFT_COUNT } from '~/store/todos'

export default {
  name: `cc-layout`,
  computed: {
    ...mapGetters(TODOS, {
      left: TODOS_GETTER_LEFT_COUNT,
    }),
  },
}
</script>

<template lang="pug">
v-app.cc-app
  v-toolbar(color="primary" dark fixed app)
    v-toolbar-title.cc-title
      v-badge(
        color="secondary"
        overlap
        :value="left > 0"
      )
        template(v-slot:badge)
          span.cc-title__badge-text {{left}}
        nuxt-link.cc-title__link(to="/")
          img(
            src="/compta-clementine-logo_light.svg"
            width="138"
            height="26"
            alt="logo compta clementine"
          )
          | 's Todo
    v-spacer.hidden-xs-only
    v-toolbar-items.hidden-xs-only
      v-btn(flat nuxt to="/") all
      v-btn(flat nuxt to="/active") active
      v-btn(flat nuxt to="/done") done
  v-content
    v-container(fluid fill-height)
      v-layout(row)
        v-flex(xs12 sm6 offset-sm3)
          nuxt
    v-bottom-nav.hidden-sm-and-up(fixed :value="true" )
      v-btn(flat nuxt to="/") all
      v-btn(flat nuxt to="/active") active
      v-btn(flat nuxt to="/done") done
</template>

<style lang="scss" scoped>
.cc-title {
  overflow: visible;

  * {
    vertical-align: sub;
  }
  img {
    transform: translateY(-1px);
  }
}
.cc-title__link {
  color: currentColor;
  text-decoration: none;
  font-weight: 700;
}
.cc-title__badge-text {
  color: black;
  opacity: 0.7;
}
</style>

