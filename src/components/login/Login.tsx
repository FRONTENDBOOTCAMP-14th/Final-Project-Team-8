'use client'

import Button from '@/components/ui/button/Button'
import { User } from 'lucide-react'
import {
  type ComponentProps,
  useCallback,
  useId,
  useMemo,
  useState,
  useTransition,
} from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

export interface LoginProps {
  onLogin?: (email: string, password: string) => void
  onSignUp?: () => void
}

export default function Login({ onLogin, onSignUp }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [isPending, startTransition] = useTransition()

  const keepLoggedInId = useId()

  const isFormValid = useMemo(() => {
    return EMAIL_REGEX.test(email) && password.length >= MIN_PASSWORD_LENGTH
  }, [email, password])

  const handleSubmit = useCallback(() => {
    if (onLogin && isFormValid) {
      startTransition(() => {
        onLogin(email, password)
      })
    }
  }, [email, password, onLogin, isFormValid])

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
          <EmailInput
            value={email}
            onChange={setEmail}
            error={
              email && !EMAIL_REGEX.test(email)
                ? '올바른 이메일 형식을 입력해주세요 (예: example@email.com)'
                : ''
            }
          />

          <PasswordInput
            value={password}
            onChange={setPassword}
            error={
              password && password.length < MIN_PASSWORD_LENGTH
                ? `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다`
                : ''
            }
          />

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

/**
 * 이메일 입력 컴포넌트
 */
function EmailInput({
  value,
  onChange,
  error,
  inputProps,
}: {
  value: string
  onChange: (value: string) => void
  error?: string
  inputProps?: ComponentProps<'input'>
}) {
  const id = useId()
  const hasError = !!error && error.length > 0

  return (
    <div role="group" className="flex flex-col">
      <label htmlFor={id} className="sr-only">
        이메일 주소
      </label>
      <input
        id={id}
        type="email"
        placeholder="이메일 주소"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        autoComplete="email"
        className={`rounded-lg border px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${hasError ? 'border-red-500' : 'border-gray-300'}`}
        {...inputProps}
      />
      {hasError && (
        <div
          role="alert"
          aria-live="polite"
          id={`${id}-error`}
          className="mt-3 text-xs text-red-500"
        >
          {error}
        </div>
      )}
    </div>
  )
}

/**
 * 패스워드 입력 컴포넌트
 */
function PasswordInput({
  value,
  onChange,
  error,
  inputProps,
}: {
  value: string
  onChange: (value: string) => void
  error?: string
  inputProps?: ComponentProps<'input'>
}) {
  const id = useId()
  const hasError = !!error && error.length > 0

  return (
    <div role="group" className="flex flex-col">
      <label htmlFor={id} className="sr-only">
        비밀번호
      </label>
      <input
        id={id}
        type="password"
        placeholder="비밀번호"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        autoComplete="current-password"
        className={`rounded-lg border px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${hasError ? 'border-red-500' : 'border-gray-300'}`}
        {...inputProps}
      />
      {hasError && (
        <div
          role="alert"
          aria-live="polite"
          id={`${id}-error`}
          className="mt-3 text-xs text-red-500"
        >
          {error}
        </div>
      )}
    </div>
  )
}
