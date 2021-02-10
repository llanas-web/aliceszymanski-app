
export default {
    components: true,
    env: {
        strapiBaseUri: process.env.API_URL || "http://localhost:1337"
    },
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Duru+Sans&family=Expletus+Sans:wght@400&family=Playfair+Display&family=Source+Sans+Pro&family=Cinzel:wght@400;500;600;700&family=EB+Garamond&display=swap" },
            { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css" },
            { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' }
        ]
    },
    /*
    ** Global CSS
    */
    css: [
        "bulma",
        { src: '~/assets/main.scss', lang: 'scss' },
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        "~/plugins/vue-parallaxy",
        "~/plugins/vue-simple-markdown",
        { src: '@/plugins/nuxt-awesome-swiper.js', mode: 'client' },
        { src: '~/plugins/vue-plyr', mode: 'client' },
        { src: '~/plugins/vue-youtube', mode: 'client' }
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        "@nuxtjs/fontawesome"
    ],
    fontawesome: {
        icons: {
            solid: true,
            brands: true
        }
    },
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
        '@nuxtjs/bulma',
        "@nuxtjs/apollo",
        '@nuxtjs/axios',
    ],
    axios: {
        // extra config e.g
        baseURL: process.env.API_URL || 'http://localhost:1337',
        debug: process.env.NODE_ENV != 'production'
    },
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: process.env.BACKEND_URL || 'http://localhost:1337/graphql'
            }
        }
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
        postcss: {
            preset: {
                features: {
                    customProperties: false
                }
            }
        },
        transpile: ['vue-youtube-embed']
    }
}
