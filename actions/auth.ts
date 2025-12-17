'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

function getString(formData: FormData, key: string) {
  const v = formData.get(key)
  return typeof v === 'string' ? v.trim() : ''
}

export async function register(formData: FormData) {
  const email = getString(formData, 'email')
  const password = getString(formData, 'password')

  if (!email || !password) return { error: 'Email dan password wajib diisi.' }
  if (password.length < 6) return { error: 'Password minimal 6 karakter.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) return { error: error.message }

  redirect('/login')
}

export async function login(formData: FormData) {
  const email = getString(formData, 'email')
  const password = getString(formData, 'password')

  if (!email || !password) return { error: 'Email dan password wajib diisi.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: error.message }

  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
