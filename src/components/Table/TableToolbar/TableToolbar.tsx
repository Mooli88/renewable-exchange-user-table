import { Delete } from '@mui/icons-material'
import { IconButton, Toolbar, Tooltip, Typography, alpha } from '@mui/material'
import { useContext } from 'react'
import { TableContext } from '../Table'

type Props = {
  title: string
  onDelete: () => void
  children?: React.ReactNode
}

const TableToolbar = ({ title, onDelete, children }: Props) => {
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
          variant='h5'
          id='tableTitle'
          component='h5'>
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete' onClick={onDelete}>
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        children
      )}
    </Toolbar>
  )
}

export default TableToolbar
