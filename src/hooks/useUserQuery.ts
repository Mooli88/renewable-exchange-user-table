import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api'

const useUserQuery = () => {
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUsers,
    staleTime: Infinity,
  })

  return userQuery
}

export default useUserQuery
