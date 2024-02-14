// const UsersDB = new Map();

import { User } from './types'

type Data = Omit<User, 'id'>

export const getUsers = async (): Promise<ReadonlyArray<Data>> => {
  const res = await fetch('https://zglinski.com/trex/users.json')

  return res.json()
}
