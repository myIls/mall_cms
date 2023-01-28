import { IFilters } from './global/types'

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: IFilters
  }
}
