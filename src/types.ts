export type User = {
  id: string
  name: string
  email: string
  company: string
  added: string
}

export type NewUser = Omit<User, 'id'>