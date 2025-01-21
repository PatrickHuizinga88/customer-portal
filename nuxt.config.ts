import { APP_NAME } from './constants';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},

  vite: {
    optimizeDeps: {
      exclude: ['vee-validate']
    }
  },

  app: {
    // TODO - Setup: Change meta tags and add favicon
    head: {
      title: APP_NAME,
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'og:title', content: APP_NAME},
        {name: 'description', content: 'Kickstart your Nuxt app.'},
        {name: 'og:description', content: 'Kickstart your Nuxt app.'},
        {name: 'msapplication-TileColor', content: '#ffffff'},
        {name: 'theme-color', content: '#ffffff'},
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/logo.svg'},

        // Generate using https://realfavicongenerator.net/
        // {rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png'},
        // {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png'},
        // {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png'},
        // {rel: 'manifest', href: '/favicon/site.webmanifest'},
        // {rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#ffffff'},
      ],
    },
  },

  css: ['../assets/css/main.css'],

  runtimeConfig: {
    public: {
      baseUrl: 'localhost:3000',
      backendUrl: 'http://localhost:3001',
    },
    novuloUsername: '',
    novuloPassword: '',
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    "shadcn-nuxt",
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    'dayjs-nuxt',
  ],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [
        '/confirm-registration',
        '/password-recovery',
        '/register',
        '/update-password',
      ],
    }
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  colorMode: {
    preference: 'light',
    classSuffix: '',
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'nl',
        name: 'Nederlands',
        files: ['nl/common', 'nl/authentication', 'nl/claims', 'nl/contact', 'nl/home', 'nl/insurances', 'nl/profile']
      },
      // {
      //   code: 'en',
      //   name: 'English',
      //   files: ['en/common', 'en/authentication', 'en/home']
      // },
    ],
    // customRoutes: 'config',
    // pages: {
    //   register: {
    //     en: '/register',
    //     nl: '/registreren',
    //   },
    //   'password-recovery': {
    //     en: '/password-recovery',
    //     nl: '/wachtwoord-herstellen',
    //   },
    //   'update-password': {
    //     en: '/update-password',
    //     nl: '/wachtwoord-bijwerken',
    //   },
    //   users: {
    //     en: '/users',
    //     nl: '/gebruikers',
    //   },
    //   'users-create': {
    //     en: '/users/create',
    //     nl: '/gebruikers/aanmaken',
    //   },
    //   'users-id': {
    //     en: '/users/[id]',
    //     nl: '/gebruikers/[id]',
    //   },
    //   'users-id-edit': {
    //     en: '/users/[id]/edit',
    //     nl: '/gebruikers/[id]/bewerken',
    //   },
    //   customers: {
    //     en: '/customers/',
    //     nl: '/klanten/',
    //   },
    //   settings: {
    //     en: '/settings',
    //     nl: '/instellingen',
    //   },
    // },
    defaultLocale: 'nl',
  },

  dayjs: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    plugins: ['relativeTime', 'utc', 'timezone'],
  },

  compatibilityDate: '2024-12-17',
})