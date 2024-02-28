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

    e.currentTarget.reset()

    onSubmit(user)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography color='#000' component='p' variant='body1'>
        Add User
      </Typography>
      <Box
        component='form'
        name='add-user-form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', gap: 1 }}>
        <TextField
          name='name'
          label='Name'
          defaultValue='Mooli m'
          data-testid='name-input'
        />
        <TextField
          name='email'
          label='Email'
          type='email'
          defaultValue='mm@re.com'
        />
        <TextField
          name='company'
          label='Company'
          defaultValue='Renewable Exchange'
        />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default AddUserForm
