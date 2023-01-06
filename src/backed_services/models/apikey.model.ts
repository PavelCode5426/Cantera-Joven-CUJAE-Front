export class ApikeyModel {
  id: number
  name: string
  key: string
  expired_at: string | undefined

  constructor(name: string, expired_at: string | undefined) {
    this.name = name
    this.expired_at = expired_at
  }
}
