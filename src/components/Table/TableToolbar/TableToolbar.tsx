import { Delete } from '@mui/icons-material'
import { IconButton, Toolbar, Tooltip, Typography, alpha } from '@mui/material'
import { useContext } from 'react'
import { TableContext } from '../Table'

type Props = {
  title: string
  filter?: React.ReactNode
}

const TableToolbar = ({ title, filter }: Props) => {
  const { numSelected } = useContext(TableContext)

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'>
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : null}
      {filter}
    </Toolbar>
  )
}

export default TableToolbar
