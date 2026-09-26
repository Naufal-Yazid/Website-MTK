'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { loginAction } from './actions'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isBlocked) {
      toast.error('Terlalu banyak percobaan', { description: 'Coba lagi dalam 10 menit.' })
      return
    }
    setIsLoading(true)

    try {
      const result = await loginAction({ email, password, rememberMe })
      
      if (result.error) {
        const nextAttempts = failedAttempts + 1
        setFailedAttempts(nextAttempts)
        if (nextAttempts >= 5) {
          setIsBlocked(true)
          window.setTimeout(() => {
            setFailedAttempts(0)
            setIsBlocked(false)
          }, 10 * 60 * 1000)
        }
        if (result.error === 'invalid_format') {
          toast.error('Format tidak valid', { description: 'Periksa kembali email dan password Anda.' })
        } else if (result.error === 'invalid_credentials') {
          toast.error('Kredensial salah', { description: 'Email atau password yang Anda masukkan salah.' })
        } else if (result.error === 'disabled') {
          toast.error('Akun dinonaktifkan', { description: 'Akun admin Anda sedang dinonaktifkan.' })
        } else {
          toast.error('Terjadi kesalahan', { description: 'Silakan coba lagi.' })
        }
      } else if (result.success) {
        setFailedAttempts(0)
        setIsBlocked(false)
        toast.success('Login berhasil')
        router.push('/admin/dashboard')
      }
    } catch {
      toast.error('Terjadi kesalahan sistem')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('min-h-screen flex', font.className)}>
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-gradient-to-b from-[#1E3A5F] to-[#0D1B2A] p-12 text-white text-center">
        <motion.div className="flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Image
            src="/images/brand/mtk logo 1.png"
            alt="Logo Marga Tirta Kencana"
            width={208}
            height={208}
            className="mb-8 h-52 w-52 object-contain"
            priority
          />
          <h1 className="text-4xl font-bold mb-4">Admin Portal</h1>
          <p className="mx-auto max-w-md text-base leading-7 text-blue-100/85">
            Portal manajemen terpadu untuk mengelola properti, leads, dan memonitor performa website Marga Tirta Kencana.
          </p>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <motion.div 
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Selamat Datang</h2>
            <p className="mt-2 text-sm text-gray-500">Silakan masuk ke akun Anda untuk melanjutkan.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="admin@margatirtakencana.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#1E3A5F] focus:ring-[#1E3A5F] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Ingat saya selama 30 hari
                </label>
              </div>

              <div className="text-sm">
                <Link href="/admin/forgot-password" className="font-medium text-[#1E3A5F] hover:text-blue-800">
                  Lupa password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || isBlocked}
              className="w-full bg-[#1E3A5F] hover:bg-[#0D1B2A] text-white py-2 h-11"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isBlocked ? 'Coba lagi dalam 10 menit' : 'Masuk ke Dashboard'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
