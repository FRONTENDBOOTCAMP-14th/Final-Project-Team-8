'use client'

import Button from '@/components/ui/button/Button'
import { User } from 'lucide-react'
import { useCallback, useId, useMemo, useState, useTransition } from 'react'
import EmailInput from './components/EmailInput'
import PasswordInput from './components/PasswordInput'

export interface LoginProps {
  onLogin?: (email: string, password: string) => void
  onSignUp?: () => void
  loginError?: string
  onErrorChange?: (error: string) => void
}

export default function Login({
  onLogin,
  onSignUp,
  loginError,
  onErrorChange,
}: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [isPending, startTransition] = useTransition()

  const keepLoggedInId = useId()

  const isFormValid = useMemo(() => {
    return email.trim().length > 0 && password.length > 0
  }, [email, password])

  const handleSubmit = useCallback(() => {
    if (onLogin && isFormValid) {
      if (loginError && onErrorChange) {
        onErrorChange('')
      }
      startTransition(() => {
        onLogin(email, password)
      })
    }
  }, [email, password, onLogin, isFormValid, loginError, onErrorChange])

  const handleSignUp = useCallback(() => {
    if (onSignUp) {
      onSignUp()
    }
  }, [onSignUp])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 pt-20 shadow-lg">
        {/* Profile Icon */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-none bg-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-3 border-orange-200">
              <User className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-2 mb-5 text-center text-2xl font-bold text-gray-800">
          로그인
        </h1>
        <p className="mb-20 text-center text-gray-500">
          PawBuddy에 오신 것을 환영합니다!
        </p>

        {/* Login Form */}
        <div className="space-y-6">
          <EmailInput value={email} onChange={setEmail} />

          <PasswordInput value={password} onChange={setPassword} />

          {loginError && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {loginError}
            </div>
          )}

          {/* Keep Logged In Checkbox */}
          <div className="mb-32 flex items-center">
            <input
              type="checkbox"
              id={keepLoggedInId}
              checked={keepLoggedIn}
              onChange={e => setKeepLoggedIn(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <label
              htmlFor={keepLoggedInId}
              className="ml-2 text-sm text-gray-600"
            >
              로그인 유지하기
            </label>
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isPending}
              variant="orange"
              className="w-full"
            >
              {isPending ? '로그인 중...' : '로그인'}
            </Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <div className="mb-2 text-sm text-gray-500">
            계정이 없으신가요?{' '}
            <button
              type="button"
              onClick={handleSignUp}
              className="inline cursor-pointer text-orange-500 transition-colors hover:text-orange-600"
            >
              회원가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
