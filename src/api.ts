import { User } from './types'

type UserData = Omit<User, 'id'>
type Data = ReadonlyArray<UserData>

let UsersDB = new Map<string, Data[number]>()

const fetchUsers = async (): Promise<Data> => {
  const results = await fetch('https://zglinski.com/trex/users.json')

  const users: Data = await results.json()

  const usersMap = users.map((user) => [user.email, user] as const)
  UsersDB.clear()

  UsersDB = new Map(usersMap)

  return users
}
export type Query = {
  filterBy: 'none' | keyof UserData
  value: string
}

export const getUsers = async (query?: Query): Promise<Data> => {
  let results = Array.from(UsersDB.values()) as Data

  if (!UsersDB.size) {
    results = await fetchUsers()
  }

  const { filterBy, value } = query ?? {}

  if (value && filterBy && filterBy !== 'none') {
    results = results.filter((user) =>
      user[filterBy].toLowerCase().includes(value)
    )
  }

  return results
}

export const AddUsers = async (user: UserData) => {
  if (!UsersDB.size) {
    await fetchUsers()
  }

  UsersDB.set(user.email, user)

  return Array.from(UsersDB.values())
}

export const deleteUsers = async (id: string) => {
  if (!UsersDB.size) {
    await fetchUsers()
  }

  UsersDB.delete(id)

  return Array.from(UsersDB.values())
}
