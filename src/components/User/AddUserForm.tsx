import { Box, Button, TextField, Typography } from '@mui/material'
import { NewUser } from '../../types'

function formatDateToYYYYMMDD(date: Date) {
  return date.toISOString().split('T')[0]
}

type Props = {
  onSubmit: (user: NewUser) => void
}

const AddUserForm = ({ onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const user = {
      name: `${form.get('name')}`,
      email: `${form.get('email')}`,
      company: `${form.get('company')}`,
      added: formatDateToYYYYMMDD(new Date()),
    }

    onSubmit(user)
    e.currentTarget.reset()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography color='#000' component='p' variant='body1'>
        Add User
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', gap: 1 }}>
        <TextField name='name' label='Name' />
        <TextField name='email' label='Email' type='email' />
        <TextField name='company' label='Company' />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default AddUserForm
