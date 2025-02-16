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
        {name: 'robots', content: 'noindex'},
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
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
      portalUrl: '',
      companyId: '',
    },
    openaiApiKey: '',
    novuloUsername: '',
    novuloPassword: '',
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    "shadcn-nuxt",
    '@vueuse/nuxt',
    // '@nuxtjs/color-mode',
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

  // colorMode: {
  //   preference: 'light',
  //   classSuffix: '',
  // },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'nl',
    detectBrowserLanguage: {
      useCookie: false,
    },
    locales: [
      {
        code: 'nl',
        name: 'Nederlands',
        files: ['nl/common', 'nl/authentication', 'nl/claims', 'nl/contact', 'nl/home', 'nl/insurances', 'nl/invoices', 'nl/profile']
      },
      {
        code: 'en',
        name: 'English',
        files: ['en/common', 'en/authentication', 'en/claims', 'en/contact', 'en/home', 'en/insurances', 'en/invoices', 'en/profile']
      },
    ],
    customRoutes: 'config',
    pages: {
      'claims-chat': {
        en: '/claims-chat',
        nl: '/schade-chat',
      },
      contact: {
        en: '/contact',
        nl: '/contact',
      },
      insurances: {
        en: '/insurances',
        nl: '/verzekeringen',
      },
      intro: {
        en: '/intro',
        nl: '/intro',
      },
      invoices: {
        en: '/invoices',
        nl: '/facturen',
      },
      login: {
        en: '/login',
        nl: '/inloggen',
      },
      'password-recovery': {
        en: '/password-recovery',
        nl: '/wachtwoord-herstellen',
      },
      profile: {
        en: '/profile',
        nl: '/profiel',
      },
      register: {
        en: '/register',
        nl: '/registreren',
      },
      'report-claim': {
        en: '/report-claim',
        nl: '/schade-melden',
      },
      settings: {
        en: '/settings',
        nl: '/instellingen',
      },
      'update-password': {
        en: '/update-password',
        nl: '/wachtwoord-bijwerken',
      },
    },
  },

  dayjs: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    plugins: ['relativeTime', 'utc', 'timezone'],
  },

  compatibilityDate: '2024-12-17',
})