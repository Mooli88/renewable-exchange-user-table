import React from 'react'
import useUserQuery from '../../hooks/useUserQuery'
import Table from '../Table/Table'
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
    label: 'company',
  },
  {
    id: 'added',
    label: 'Added',
  },
] as const

const UserTable = () => {
  const { data, isLoading } = useUserQuery()

  if (isLoading) return <div>Loading...</div>

  if (data)
    return (
      <Table title='Users' data={data} headCells={headCells}>
        <UserTableBody />
      </Table>
    )

  return <div>Error...</div>
}

export default UserTable
