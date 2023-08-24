// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  modules: [
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [['defineStore', 'definePiniaStore']],
      },
    ]
  ]
})
