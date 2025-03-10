// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // ssr: false,
    app: {
        head: {
            title: 'Dividends calculator',
            link: [
                //bootstrap styles
                {
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
                    rel: 'stylesheet',
                    integrity: 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
                    crossorigin: 'anonymous'
                }
            ],
            script: [
                //bootstrap scripts
                {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
                    integrity: 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM',
                    crossorigin: 'anonymous'
                }
            ]
        }
    },
    css: ["@/assets/styles.scss", '@fortawesome/fontawesome-svg-core/styles.css'],
    runtimeConfig: {
        // The private keys which are only available within server-side
        apiSecret: '123',
        // Keys within public, will be also exposed to the client-side
        public: {
            apiBaseUrl: process.env.API_BASE_URL
        }
    },
    modules: [
        '@pinia/nuxt'
    ],
    ssr: false
    // vite: {
    //     css: {
    //         preprocessorOptions: {
    //             scss: {
    //                 additionalData: '@use "@/assets/styles.scss";'
    //             }
    //         }
    //     }
    // }
})
