import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  theme: {
    primary: `#ff7e3c`,
    secondary: `#3adda2`,
    accent: `#918dff`,
    error: `#e91e63`,
    warning: `#ffc107`,
    info: `#03a9f4`,
    success: `#8bc34a`,
  },
  options: {
    customProperties: true,
  },
})
