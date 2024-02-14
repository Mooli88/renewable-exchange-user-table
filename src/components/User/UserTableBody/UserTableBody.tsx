import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useContext } from 'react'
import { TableContext } from '../../Table/Table'
import { User } from '../../../types'

// type Props = {}

const UserTableBody = () => {
  const { rows, isSelected, handleClick } = useContext(TableContext)

  return (
    <TableBody>
      {rows.map((row: User, index) => {
        const isItemSelected = isSelected(row.id)
        // const labelId = `enhanced-table-checkbox-${index}`

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
              <Checkbox
                color='primary'
                checked={isItemSelected}
                // inputProps={{
                //   'aria-labelledby': labelId,
                // }}
              />
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
