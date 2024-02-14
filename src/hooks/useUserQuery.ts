import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api'
import { User } from '../types'

const useUserQuery = () => {
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUsers,
    select: (data): ReadonlyArray<User> =>
      data.map((user) => ({ ...user, id: user.email })),
    staleTime: Infinity,
  })

  return userQuery
}

export default useUserQuery
