import { createFileRoute, redirect } from '@tanstack/react-router'
import logo from '../logo.svg'
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
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
