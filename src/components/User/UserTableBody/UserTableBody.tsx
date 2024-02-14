import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import { useContext } from 'react'
import { User } from '../../../types'
import { TableContext } from '../../Table/Table'

const UserTableBody = () => {
  const { rows, isSelected, handleClick } = useContext(TableContext)

  return (
    <TableBody>
      {(rows as User[]).map((row) => {
        const isItemSelected = isSelected(row.id)

        return (
          <TableRow
            hover
            onClick={() => handleClick(row.id)}
            role='checkbox'
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}>
            <TableCell padding='checkbox'>
              <Checkbox color='primary' checked={isItemSelected} />
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.company}</TableCell>
            <TableCell>{row.added}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default UserTableBody
