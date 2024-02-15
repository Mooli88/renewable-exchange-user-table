import { NewUser, User } from './types'

type UserData = Omit<User, 'id'>
type Data = ReadonlyArray<UserData>

let UsersDB = new Map<string, Data[number]>()
let shouldPopulateDB = UsersDB.size === 0

const sleep = async () => {
  const timeout = Math.floor(Math.random() * 300) + 50
  await new Promise((resolve) => setTimeout(resolve, timeout))
}

const populateDB = async (): Promise<Data> => {
  if (!shouldPopulateDB) {
    await sleep()
    return Array.from(UsersDB.values())
  }

  const results = await fetch('https://zglinski.com/trex/users.json')

  const users: Data = await results.json()

  const usersMap = users.map((user) => [user.email, user] as const)
  UsersDB.clear()

  UsersDB = new Map(usersMap)
  shouldPopulateDB = false
  return users
}
export type Query = {
  filterBy: 'none' | keyof UserData
  value: string
}

export const getUsers = async (query?: Query): Promise<Data> => {
  let results = await populateDB()

  const { filterBy, value } = query ?? {}

  if (value && filterBy && filterBy !== 'none') {
    await sleep()
    results = results.filter((user) =>
      user[filterBy].toLowerCase().includes(value)
    )
  }

  return results
}

export const upsertUser = async (user: NewUser) => {
  await populateDB()

  UsersDB.set(user.email, user)

  return Array.from(UsersDB.values())
}

export const deleteUsers = async (ids: string[]) => {
  ids.forEach((id) => UsersDB.delete(id))

  return Array.from(UsersDB.values())
}
