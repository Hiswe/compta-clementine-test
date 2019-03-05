<script>
export default {
  name: `cc-layout`,
}
</script>

<template lang="pug">
v-app.cc-app
  v-toolbar(color="primary" dark fixed app)
      v-toolbar-title.cc-title
        nuxt-link.cc-title__link(to="/")
          img(
            src="/compta-clementine-logo_light.svg"
            width="138"
            height="26"
            alt="logo compta clementine"
          )
          | 's Todo
      v-spacer
      v-toolbar-items(class="hidden-sm-and-down")
        v-btn(flat nuxt to="/") all
        v-btn(flat nuxt to="/active") active
        v-btn(flat nuxt to="/done") done
  v-content
    v-container(fluid fill-height)
      v-layout(row)
        v-flex( xs12 sm6 offset-sm3)
          nuxt
</template>

<style lang="scss" scoped>
.cc-title {
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
</style>

