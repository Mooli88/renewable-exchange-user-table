// const UsersDB = new Map();

import { User } from './types'

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch('https://zglinski.com/trex/users.json')

  return res.json()
}
