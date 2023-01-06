import InfiniteLoading from 'v3-infinite-loading/lib/v3-infinite-loading.umd'
import { type UserModule } from '~/types/types'

export const install: UserModule = ({ app }) => {
  app.use(InfiniteLoading, {

  })
}
