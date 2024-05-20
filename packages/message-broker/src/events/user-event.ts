export interface UserEvent {
  event: 'user.created' | 'user.updated'
  data: {
    id: string
    name: string
    email: string
  }
}