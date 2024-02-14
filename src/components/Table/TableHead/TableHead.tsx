import {
  Checkbox,
  TableHead as MuiTableHead,
  TableCell,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import * as React from 'react'
import { useContext } from 'react'
import { TableContext } from '../Table'

export type Order = 'asc' | 'desc'

type Props = {
  onRequestSort: (property: string) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  headCells: ReadonlyArray<{ id: string; label: string }>
}

const TableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  rowCount,
  onRequestSort,
  headCells,
}: Props) => {
  const { numSelected } = useContext(TableContext)

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
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}

export default TableHead
