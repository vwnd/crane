import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSession } from '@/auth'

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: async () => {
    console.log('Loading the root route!')
    const { data } = await getSession()

    if (!data) {
      console.log('No active session found.')
      throw redirect({ to: '/auth/sign-in' })
    }
  },
})

function App() {
  return <div>Dashboard</div>
}
