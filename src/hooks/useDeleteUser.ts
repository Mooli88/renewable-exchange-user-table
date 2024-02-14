import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api'
import { User } from '../types'

export type FilterBy = 'none' | keyof Omit<User, 'id'>

const useUserQuery = (filterBy: FilterBy = 'none', value: string) => {
  const userQuery = useQuery({
    queryKey: ['users', { filterBy, value }],
    queryFn: () => getUsers({ filterBy, value }),
    select: (data): ReadonlyArray<User> =>
      data.map((user) => ({ ...user, id: user.email })),
    staleTime: Infinity,
  })

  return userQuery
}

export default useUserQuery
