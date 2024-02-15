import { useMutation } from '@tanstack/react-query'
import { deleteUsers, queryClient } from '../api'
import { User } from '../types'

export type FilterBy = 'none' | keyof Omit<User, 'id'>

const useDeleteUsers = () => {
  const deleteUsersMutation = useMutation({
    mutationFn: (userIds: string[]) => deleteUsers(userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return deleteUsersMutation
}

export default useDeleteUsers
