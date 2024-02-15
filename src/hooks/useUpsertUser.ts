import { useMutation } from '@tanstack/react-query'
import { upsertUser, queryClient } from '../api'
import { NewUser, User } from '../types'

export type FilterBy = 'none' | keyof Omit<User, 'id'>

const useUpsertUser = () => {
  const addUserMutation = useMutation({
    mutationFn: (user: NewUser) => upsertUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return addUserMutation
}

export default useUpsertUser
