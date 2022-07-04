import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import router from './globals/config/router'

import "../public/assets/js/jquery-ui/css/no-theme/jquery-ui-1.10.3.custom.min.css"
import "../public/assets/css/font-icons/entypo/css/entypo.css"
// import "http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic"
import "../public/assets/css/bootstrap.css"
import "../public/assets/css/neon-core.css"
import "../public/assets/css/neon-theme.css"
import "../public/assets/css/neon-forms.css"
import "../public/assets/css/skins/green.css"
import "../public/assets/css/custom.css"
import "../public/assets/css/font-icons/font-awesome/css/font-awesome.min.css"

import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  router,
  (ctx) => {
    // install all modules under `globals/plugins/`
    Object.values(import.meta.globEager('./globals/plugins/**/*.ts')).forEach(async i => {
        const install = i.install?.(ctx)
        if (install instanceof Promise)
            await install.then().catch((error)=> console.log(error))
    })
  },
)
