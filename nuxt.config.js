export default {
  plugins: [`@/plugins/vue-libraries.js`],
  axios: {
    // baseURL: `http://localhost:4060/v1`,
    // browserBaseURL: `http://localhost:4060/v1`,
    // credentials: true,
  },
  modules: [`@nuxtjs/axios`],
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
