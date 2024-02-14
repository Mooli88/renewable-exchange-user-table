import {
  Box,
  Paper,
  Table as MuiTable,
  TableContainer,
  TableCell,
} from '@mui/material'
import { ChangeEvent, createContext, useMemo, useState } from 'react'
import TableHead, { Order } from './TableHead/TableHead'
import TableToolbar from './TableToolbar/TableToolbar'
import useUserQuery from '../../hooks/useUserQuery'
import { Key } from '@mui/icons-material'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = <Key extends string>(
  order: Order,
  orderBy: Key
): ((
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

type Props = {
  data: ReadonlyArray<{ id: string; [Key: string]: string | number }>
  headCells: ReadonlyArray<{ id: string; label: string }>
  title: string
  children: React.ReactNode
}

type Ctx = {
  rows: Props['data']
  isSelected: (id: string) => boolean
  handleClick: (id: string) => void
}

export const TableContext = createContext<Ctx>({
  rows: [],
  isSelected: () => false,
  handleClick: () => false,
})

const Table = ({ data, headCells, title, children }: Props) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [selected, setSelected] = useState<ReadonlyArray<string>>([])

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id]
    setSelected(newSelected)
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  const rows = useMemo(
    () => data.slice().sort(getComparator(order, orderBy)),
    [data, order, orderBy]
  )

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContext.Provider
          value={{
            rows,
            isSelected,
            handleClick,
          }}>
          <TableToolbar title={title} numSelected={selected.length} />
          <TableContainer>
            <MuiTable sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
              <TableHead
                headCells={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              {children}
            </MuiTable>
          </TableContainer>
        </TableContext.Provider>
      </Paper>
    </Box>
  )
}

export default Table
