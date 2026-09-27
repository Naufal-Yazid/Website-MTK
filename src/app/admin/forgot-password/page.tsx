'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { forgotPasswordAction } from '../login/actions'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await forgotPasswordAction(email)
      
      if (result.error) {
        toast.error('Gagal mengirim link', { description: result.error })
      } else if (result.success) {
        toast.success('Link terkirim', { description: 'Periksa email Anda untuk instruksi reset password.' })
        setIsSuccess(true)
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
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Masukkan email Anda dan kami akan mengirimkan link untuk mereset password.
          </p>
        </div>

        {!isSuccess ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Admin</label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@margatirtakencana.com"
                className="w-full"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#1E3A5F] hover:bg-[#0D1B2A] text-white py-2 h-11"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Kirim Link Reset
            </Button>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-6">
              Jika email tersebut terdaftar, Anda akan menerima email dengan instruksi lebih lanjut.
            </p>
          </div>
        )}
        
        <div className="text-center mt-6">
          <Link href="/admin/login" className="text-sm font-medium text-[#1E3A5F] hover:text-blue-800">
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  )
}
