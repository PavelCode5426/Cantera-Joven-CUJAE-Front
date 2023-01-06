import type { PaginateResponse } from '~/globals/config/axios'

function paginateResponse<T>() {
  return ref<PaginateResponse<T>>({
    httpCode: 200,
    current_page: 1,
    next: undefined,
    results: [],
    total_pages: 0,
    previous: undefined,
    count: 0,
  })
}

export default paginateResponse
