import {
  Checkbox,
  TableHead as MuiTableHead,
  TableCell,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import Box from '@mui/material/Box'
// import Checkbox from '@mui/material/Checkbox'
// import TableCell from '@mui/material/TableCell'
// import TableRow from '@mui/material/TableRow'
// import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import * as React from 'react'

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
    id: 'Company',
    label: 'company',
  },
  {
    id: 'added',
    label: 'Added',
  },
] as const

type Order = 'asc' | 'desc'

type Props = {
  numSelected: number
  onRequestSort: (property: string) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

const TableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}: Props) => {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => onRequestSort(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}

export default TableHead
