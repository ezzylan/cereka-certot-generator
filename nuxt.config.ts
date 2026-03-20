// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/seo",
    "nuxt-auth-utils",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "motion-v/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: { daunBaseURL: "https://daun.me" },
    oauth: {
      oidc: { clientId: "", clientSecret: "" },
    },
    turso: { databaseUrl: "", authToken: "" },
  },
  site: {
    url: "https://certotje.netlify.app",
    name: "CertotJe",
    description: "Hasilkan certot anda sendiri dengan mudah.",
  },
  sitemap: { zeroRuntime: true },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/cereka-logo.svg",
        },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit", "@ai-sdk/vue", "zod"],
    },
  },
});
