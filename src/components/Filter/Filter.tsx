import { FilterList } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'

const Filter = ({
  onChange,
  filterByCols,
}: {
  filterByCols: ReadonlyArray<{ id: string; label: string }>
  onChange: (colId: string, value: string) => void
}) => {
  const [filterColId, setFilterColId] = useState(filterByCols[0].id)
  const [filterState, setFilterState] = useState(false)
  const timeoutId = useRef(0)
  const anchorEl = useRef(null)

  const clearFilter = () => {
    onChange('none', '')
    setFilterState(false)
  }

  const onChangeDebounce = (value: string) => {
    clearTimeout(timeoutId.current)
    setTimeout(() => {
      onChange(filterColId, value)
    }, 150)
  }

  return (
    <>
      <Tooltip title='Filter list' ref={anchorEl}>
        <IconButton onClick={() => setFilterState(true)}>
          <FilterList />
        </IconButton>
      </Tooltip>

      <Popover
        anchorEl={anchorEl.current}
        open={filterState}
        onClose={() => setFilterState(false)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '1em',
          }}>
          <Typography variant='h6' component='h6'>
            Filter by Column
          </Typography>
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
                value={filterColId}
                id='select-filter-by'
                labelId='filter-by-label'
                label='Filter By'
                onChange={({ target }) => setFilterColId(target.value)}>
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
              onChange={({ target }) => onChangeDebounce(target.value)}
            />
          </Box>
          <Button onClick={clearFilter}>Clear</Button>
        </Box>
      </Popover>
    </>
  )
}

export default Filter
