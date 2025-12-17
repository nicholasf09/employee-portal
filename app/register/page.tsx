'use client'

import { register } from '@/actions/auth'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-blue-100 bg-white/90 p-8 shadow-lg shadow-blue-100/60">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Register</h1>
        <p className="text-sm text-slate-500 mt-1">
          Buat akun untuk akses portal.
        </p>

        <form action={register} className="mt-6 space-y-4">
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
              placeholder="min 6 karakter"
            />
          </div>

          {/* Error dari Server Action via searchParams TIDAK wajib.
             Cara paling sederhana: pakai return object + useActionState.
             Tapi kalau dosen tidak minta useActionState, kamu bisa tetap pakai versi yang robust di bawah. */}
          <RegisterButton />
        </form>

        <p className="text-sm mt-4 text-slate-500">
          Sudah punya akun?{' '}
          <a className="font-medium text-blue-600 hover:text-blue-700" href="/login">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

import { useActionState } from 'react'

function RegisterButton() {
  // Trick: re-bind action supaya kita bisa tampilkan error tanpa client-side auth logic
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | undefined, formData: FormData) => {
      const res = await register(formData)
      return res ?? {}
    },
    undefined
  )

  return (
    <>
      {state?.error ? (
        <p className="text-sm text-red-600">{state.error}</p>
      ) : null}

      <button
        formAction={formAction}
        disabled={pending}
        className="w-full rounded-xl bg-blue-600 text-white py-2.5 font-medium shadow-md shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Mendaftar...' : 'Register'}
      </button>
    </>
  )
}
