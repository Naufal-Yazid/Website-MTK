'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid').min(1, 'Email tidak boleh kosong'),
  password: z.string().min(1, 'Password tidak boleh kosong'),
  rememberMe: z.boolean().optional(),
})

export async function loginAction(formData: { email: string; password: string; rememberMe: boolean }) {
  try {
    const parsed = loginSchema.safeParse(formData)
    if (!parsed.success) {
      return { error: 'invalid_format', details: parsed.error.flatten().fieldErrors }
    }

    const { email, password } = parsed.data

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have proxy refreshing
              // user sessions.
            }
          },
        },
      }
    )

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return { error: 'invalid_credentials' }
    }

    // Check if user's admin record is active
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (adminError || !adminData || !adminData.is_active) {
      await supabase.auth.signOut()
      return { error: 'disabled' }
    }

    return { success: true }
  } catch {
    return { error: 'unknown_error' }
  }
}

export async function forgotPasswordAction(email: string) {
  if (!email) return { error: 'Email diperlukan' }
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function resetPasswordAction(password: string) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
