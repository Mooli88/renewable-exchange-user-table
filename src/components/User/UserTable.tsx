import { Box } from '@mui/material'
import { useState } from 'react'
import { Query } from '../../api'
import useDeleteUsers from '../../hooks/useDeleteUsers'
import useUpsertUser from '../../hooks/useUpsertUser'
import useUserQuery from '../../hooks/useUserQuery'
import Table from '../Table/Table'
import AddUserForm from './AddUserForm'
import UserTableBody from './UserTableBody/UserTableBody'

// type Props = {}
const headCells = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'company',
    label: 'Company',
  },
  {
    id: 'added',
    label: 'Added',
  },
] as const

const UserTable = () => {
  const [filterBy, setFilterBy] = useState<Query>()
  const { data, isLoading } = useUserQuery(filterBy)
  const addUser = useUpsertUser()
  const deleteUsers = useDeleteUsers()

  if (isLoading) return <div>Loading...</div>

  if (data)
    return (
      <Box sx={{ backgroundColor: 'white', padding: '2em' }}>
        <Table
          title='Users'
          data={data}
          headCells={headCells}
          onFilter={(filterBy, value) =>
            setFilterBy({ filterBy, value } as Query)
          }
          onDelete={(userIds) => deleteUsers.mutate(userIds)}>
          <UserTableBody />
        </Table>
        <AddUserForm onSubmit={(user) => addUser.mutate(user)} />
      </Box>
    )

  return <div>Error...</div>
}

export default UserTable
