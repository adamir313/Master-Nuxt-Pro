// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    prerender: {
      routes: ['/landing'],
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    // The private keys which are only available server-side
    stripeSecret: '',
    stripeWebhookSecret: '',
    // Keys within public are also exposed client-side
    public: {
      urlBase: 'http://localhost:3000',
      stripeKey: ''
    }
  }
});

