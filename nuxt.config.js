export default {
  plugins: [`@/plugins/vue-libraries.js`],
  axios: {
    baseURL: `http://localhost:4070/todos`,
    browserBaseURL: `http://localhost:4070/todos`,
    // credentials: true,
  },
  css: [`vuetify/dist/vuetify.min.css`, `@/assets/global.css`],
  modules: [`@nuxtjs/axios`],
  loading: {
    color: `#3adda2`,
  },
  head: {
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
      { rel: `icon`, href: `/favicon.png`, type: `image/png` },
    ],
    link: [
      {
        rel: `stylesheet`,
        href: `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons`,
      },
    ],
  },
}
