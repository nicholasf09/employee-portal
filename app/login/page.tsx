'use client'

import { useActionState } from 'react'
import { login } from '@/actions/auth'

type AuthState = { error?: string }

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    async (_prev: AuthState | undefined, formData: FormData): Promise<AuthState> => {
      const res = await login(formData)
      return res ?? {}
    },
    undefined
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-blue-100 bg-white/90 p-8 shadow-lg shadow-blue-100/60">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Login</h1>
        <p className="text-sm text-slate-500 mt-1">
          Masuk untuk melihat dashboard.
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-blue-100 bg-white px-3 py-2 transition focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="email@company.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-blue-100 bg-white px-3 py-2 transition focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="********"
            />
          </div>

          {state?.error ? (
            <p className="text-sm text-red-600">{state.error}</p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-blue-600 text-white py-2.5 font-medium shadow-md shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? 'Masuk...' : 'Login'}
          </button>
        </form>

        <p className="text-sm mt-4 text-slate-500">
          Belum punya akun?{' '}
          <a className="font-medium text-blue-600 hover:text-blue-700" href="/register">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
