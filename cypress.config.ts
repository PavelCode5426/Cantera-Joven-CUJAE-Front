import { defineConfig } from 'cypress'
// import vitePreprocessor from "cypress-vite"
// import {resolve} from 'path'

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/index.ts',
    requestTimeout: 10000,
    defaultCommandTimeout: 10000,
    responseTimeout: 10000,
    baseUrl: 'http://localhost:3000',
    specPattern: ['./cypress/**/*.e2e.ts'],
    watchForFileChanges: true,
    chromeWebSecurity: false,

    trashAssetsBeforeRuns: false,
    video: true,
    videoCompression: 15,
    setupNodeEvents(on, config) {
      // on('after:spec', (spec, results) => {
      //   if (results && results.video)
      //     return results.video
      // })

      return config
    },
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },

  env: {
    LOGIN_UR: '/',
    ADMIN_URL: '/admin',
    API_URL: 'http://127.0.0.1:8000/api/v1/',
  },
})
