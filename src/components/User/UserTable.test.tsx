// sum.test.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  cleanup,
  render as rtlRender,
  screen,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeAll, it, vi } from 'vitest'
import App from '../../App'

const mockData = [
  {
    name: 'John Smith',
    email: 'john@smith.com',
    company: 'Google',
    added: '2019-07-01',
  },
  {
    name: 'Mark Smithy',
    email: 'mark@smithy.com',
    company: 'Amazon',
    added: '2020-02-14',
  },
  {
    name: 'Alex Smithson',
    email: 'alex@smithson.com',
    company: 'Facebook',
    added: '2021-03-15',
  },
]

const render = () => {
  const user = userEvent.setup({ delay: null })

  const queryClient = new QueryClient()
  const app = rtlRender(<App />, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  })

  return { ...app, user }
}

beforeAll(() => {
  vi.spyOn(window, 'fetch').mockImplementation(
    () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => mockData,
      }) as Promise<Response>
  )
})
afterEach(() => {
  cleanup()
})

it('should render UserTable', () => {
  render()
  screen.getByRole('heading', {
    level: 5,
    name: 'Users',
  })
})

it('should render UserTable with a list of users', async () => {
  render()

  await screen.findAllByText('John Smith')

  mockData.forEach((user) => {
    screen.getByText(user.name)
    screen.getByText(user.email)
    screen.getByText(user.company)
    screen.getByText(user.added)
  })
})

it('should add a user to the able on Add User form submit', async () => {
  const { user } = render()

  await screen.findAllByText('John Smith')

  const addUserTitle = screen.getByText('Add User')
  const addUserForm = within(
    within(addUserTitle.parentElement!).getByRole('form')
  )

  // const nameInput = addUserForm.getByLabelText('Name')
  // const emailInput = addUserForm.getByLabelText('Email')
  // const companyInput = addUserForm.getByLabelText('Company')
  const submitButton = addUserForm.getByRole('button', {
    name: 'Submit',
  })

  // await user.type(nameInput, 'Mooli m')
  // await user.type(emailInput, 'mooli@re.com')
  // await user.type(companyInput, 'Renewable Exchange')
  await user.click(submitButton)

  await screen.findByText('Mooli m')
  await screen.findByText('mooli@re.com')
  await screen.findByText('Renewable Exchange')
})
