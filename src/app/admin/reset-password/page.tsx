'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { resetPasswordAction } from '../login/actions'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validatePassword = (pass: string) => {
    return pass.length >= 8 && /[a-zA-Z]/.test(pass) && /[0-9]/.test(pass)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Password tidak cocok', { description: 'Pastikan konfirmasi password sama dengan password baru.' })
      return
    }

    if (!validatePassword(password)) {
      toast.error('Password lemah', { description: 'Password harus minimal 8 karakter dan mengandung huruf serta angka.' })
      return
    }

    setIsLoading(true)

    try {
      const result = await resetPasswordAction(password)
      
      if (result.error) {
        toast.error('Gagal mereset password', { description: result.error })
      } else if (result.success) {
        toast.success('Password berhasil direset', { description: 'Silakan login dengan password baru Anda.' })
        router.push('/admin/login')
      }
    } catch {
      toast.error('Terjadi kesalahan sistem')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8', font.className)}>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <Image 
            src="/images/brand/mtk logo 1.png" 
            alt="MTK Logo" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900">Buat Password Baru</h2>
          <p className="mt-2 text-sm text-gray-600">
            Silakan masukkan password baru Anda.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">Password Baru</label>
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

            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">Konfirmasi Password Baru</label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <p className="text-xs text-gray-500">
              * Minimal 8 karakter, harus mengandung kombinasi huruf dan angka.
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#1E3A5F] hover:bg-[#0D1B2A] text-white py-2 h-11"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Simpan Password Baru
          </Button>
        </form>
      </div>
    </div>
  )
}
