import { Box, Table as MuiTable, Paper, TableContainer } from '@mui/material'
import { ChangeEvent, createContext, useMemo, useState } from 'react'
import TableHead, { Order } from './TableHead/TableHead'
import TableToolbar from './TableToolbar/TableToolbar'
import Filter from './TableToolbar/Filter'

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
  onFilter: (filterBy: string, value: string) => void
  children: React.ReactNode
}

type Ctx = {
  rows: Props['data']
  numSelected: number
  isSelected: (id: string) => boolean
  handleClick: (id: string) => void
}

export const TableContext = createContext<Ctx>({
  rows: [],
  isSelected: () => false,
  handleClick: () => false,
  numSelected: 0,
})

// const F = () => <Filter filterByCols={headCells} onChange={onFilter} />

const Table = ({ data, headCells, title, onFilter, children }: Props) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [selected, setSelected] = useState<ReadonlyArray<string>>([])

  const rows = useMemo(
    () => data.slice().sort(getComparator(order, orderBy)),
    [data, order, orderBy]
  )

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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContext.Provider
          value={{
            rows,
            isSelected,
            handleClick,
            numSelected: selected.length,
          }}>
          <TableToolbar
            title={title}
            filter={<Filter filterByCols={headCells} onChange={onFilter} />}
          />
          <TableContainer>
            <MuiTable sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
              <TableHead
                order={order}
                orderBy={orderBy}
                headCells={headCells}
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
