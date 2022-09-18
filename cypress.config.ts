import { defineConfig } from "cypress";
// import vitePreprocessor from "cypress-vite"
// import {resolve} from 'path'

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: ["/cypress/**/*.e2e.ts"],
    watchForFileChanges: true,
    chromeWebSecurity: false,
    // setupNodeEvents:function (on, config) {
    //     on("file:preprocessor",vitePreprocessor(resolve(__dirname,'./vite.config.ts')))
    // }
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
