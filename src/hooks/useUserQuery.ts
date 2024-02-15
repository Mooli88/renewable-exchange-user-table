import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getUsers, Query } from '../api'
import { User } from '../types'

const useUserQuery = (filter?: Query) => {
  const userQuery = useQuery({
    queryKey: ['users', filter],
    queryFn: () => getUsers(filter),
    select: (data): ReadonlyArray<User> =>
      data.map((user) => ({ ...user, id: user.email })),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  })

  return userQuery
}

export default useUserQuery
