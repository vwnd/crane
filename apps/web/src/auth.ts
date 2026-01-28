import { createAuthClient } from 'better-auth/react'

export const { signUp, useSession, getSession } = createAuthClient({
  baseURL: 'http://localhost:8787',
})
