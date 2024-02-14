import { useState } from 'react'
import { Query } from '../../api'
import useUserQuery from '../../hooks/useUserQuery'
import Table from '../Table/Table'
import TableToolbar from '../Table/TableToolbar/TableToolbar'
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

  if (isLoading) return <div>Loading...</div>

  if (data)
    return (
      <Table
        title='Users'
        data={data}
        headCells={headCells}
        onFilter={(filterBy, value) =>
          setFilterBy({ filterBy, value } as Query)
        }>
        <UserTableBody />
      </Table>
    )

  return <div>Error...</div>
}

export default UserTable
