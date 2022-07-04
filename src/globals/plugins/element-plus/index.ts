import { type UserModule } from '~/types/types'
import ElementPlus from 'element-plus'
import esi18n from 'element-plus/es/locale/lang/es'

export const install: UserModule = ({ app }) => {
  app.use(ElementPlus,{
    locale: esi18n
  })
}
