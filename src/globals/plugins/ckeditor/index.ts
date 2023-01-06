// import CKEditor from 'ckeditor4-vue'
import CKEditor from '@ckeditor/ckeditor5-vue'

import { type UserModule } from '~/types/types'

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: UserModule = async ({ app }) => {
  // load_script('/assets/js/ckeditor/ckeditor.js')
  app.use(CKEditor)
}
