import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { Query } from '../../api'
import useDeleteUsers from '../../hooks/useDeleteUsers'
import useUpsertUser from '../../hooks/useUpsertUser'
import useUserQuery from '../../hooks/useUserQuery'
import Table from '../Table/Table'
import AddUserForm from './AddUserForm'
import UserTableBody from './UserTableBody/UserTableBody'

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
  const { data = [], isFetching, isError } = useUserQuery(filterBy)
  const addUser = useUpsertUser()
  const deleteUsers = useDeleteUsers()

  if (isError) {
    return <div>Something went wrong</div>
  }

  return (
    <>
      {isFetching ? (
        <Backdrop open={true}>
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : null}
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
    </>
  )
}

export default UserTable
