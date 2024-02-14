import { FilterList } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'

const Filter = ({
  onChange,
  filterByCols,
}: {
  filterByCols: ReadonlyArray<{ id: string; label: string }>
  onChange: (colId: string, value: string) => void
}) => {
  const [filterCol, setFilterCol] = useState('')
  const [value, setValue] = useState('')
  const [filterState, setFilterState] = useState(false)

  const clearFilter = () => {
    onChange('none', '')
    setFilterState(false)
  }

  return (
    <>
      <Tooltip title='Filter list'>
        <IconButton onClick={() => setFilterState(true)}>
          <FilterList />
        </IconButton>
      </Tooltip>

      <Dialog open={filterState} onClose={() => setFilterState(false)}>
        <DialogTitle>Filter by Column</DialogTitle>
        <Box
          component='form'
          sx={{
            m: 2,
            gap: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          noValidate
          autoComplete='off'>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id='filter-by-label'>Filter By</InputLabel>
            <Select
              value={filterCol}
              id='select-filter-by'
              labelId='filter-by-label'
              label='Filter By'
              onChange={({ target }) => setFilterCol(target.value)}>
              {filterByCols.map((col) => (
                <MenuItem key={col.id} value={col.id}>
                  {col.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label='Filter'
            variant='outlined'
            onChange={({ target }) => setValue(target.value)}
          />
        </Box>

        <DialogActions>
          <Button onClick={() => onChange(filterCol, value)}>Apply</Button>
          <Button onClick={clearFilter}>Clear</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Filter
