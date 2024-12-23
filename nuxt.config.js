export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'UPLB | SRPVS',
    htmlAttrs: {
      lang: 'en',
    },
      
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/uplbicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '@fortawesome/fontawesome-svg-core/style-css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vs-pagination',
    '~/plugins/auth',
    '~/plugins/vue-html2pdf.js',
    '~/plugins/veevalidate.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    // With options
    ['@nuxtjs/moment', { /* module options */ }],
    '@nuxtjs/fontawesome',
    
  ],
  fontawesome: {
    set: '@fortawesome/free-solid-svg-icons',
    // icons: ['faHome']
    icons:{
     solid:true,
     brands:true
    }
   },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    // '@nuxtjs/fontawesome'
  ],
  
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    withCredentials: true,
    baseURL: process.env.API_BASE_URL,
    // browserBaseURL: "http://localhost:8000",
    // credentials : true,
    // proxy: false,
    // debug: true,
  },
  // env: {
  //   apiBaseUrl: process.env.API_BASE_URL
  // },
  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.API_BASE_URL
  //   }
  // },

  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: process.env.API_BASE_URL
  //   }
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: [
    //   '@fortawesome/fontawesome-svg-core',
    //   '@fortawesome/free-solid-svg-icons',
    //   '@fortawesome/free-regular-svg-icons',
    //   '@fortawesome/free-brands-svg-icons',
    //   '@fortawesome/vue-fontawesome'
    // ]
  },

  auth: {
    strategies: {
      local: {
        // token: {
        //   property: 'access_token',
        //   required: true,
        //   type: 'Bearer'
        // },
        // user: {
        //   property: 'user',
        //   autoFetch: false
        // },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: false }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      // callback: '/auth/login',
      home: '/'
    },
    rewriteRedirects: true
  },
  router: {
    // mode: 'hash',
    middleware: ['auth'],
    fullPathRedirect: false
  },
}
