'use client'

import { User } from 'lucide-react'
import React, {
  useCallback,
  useId,
  useMemo,
  useState,
  useTransition,
} from 'react'
import Input from '../ui/input/Input'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

export interface LoginProps {
  onLogin?: (email: string, password: string) => void
  onSignUp?: () => void
}

const Login = ({ onLogin, onSignUp }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [isPending, startTransition] = useTransition()

  // useId로 고유한 ID 생성 (접근성 향상)
  const emailId = useId()
  const passwordId = useId()
  const keepLoggedInId = useId()

  // useMemo로 폼 유효성 검사 메모이제이션
  const isFormValid = useMemo(() => {
    return EMAIL_REGEX.test(email) && password.length >= MIN_PASSWORD_LENGTH
  }, [email, password])

  // useCallback으로 함수 메모이제이션
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

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value)
  }, [])

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value)
  }, [])

  const handleKeepLoggedInChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeepLoggedIn(e.target.checked)
    },
    []
  )

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg pt-20">
        {/* Profile Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-none">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border-3 border-orange-200">
              <User className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-5 mt-8">
          로그인
        </h1>
        <p className="text-center text-gray-500 mb-8">
          PawBuddy에 오신 것을 환영합니다!
        </p>

        {/* Login Form */}
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor={emailId} className="sr-only">
              이메일 주소
            </label>
            <Input
              id={emailId}
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={handleEmailChange}
            />
            {email && !EMAIL_REGEX.test(email) && (
              <p className="text-xs text-red-500 mt-3">
                올바른 이메일 형식을 입력해주세요 (예: example@email.com)
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor={passwordId} className="sr-only">
              비밀번호
            </label>
            <Input
              id={passwordId}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            />
            {password && password.length < 6 && (
              <p className="text-xs text-red-500 mt-3">
                비밀번호는 최소 6자 이상이어야 합니다
              </p>
            )}
          </div>

          {/* Keep Logged In Checkbox */}
          <div className="flex items-center mb-32">
            <input
              type="checkbox"
              id={keepLoggedInId}
              checked={keepLoggedIn}
              onChange={handleKeepLoggedInChange}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label
              htmlFor={keepLoggedInId}
              className="ml-2 text-sm text-gray-600"
            >
              로그인 유지하기
            </label>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isPending}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isPending ? '로그인 중...' : '로그인'}
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-500 mb-2">
            계정이 없으신가요?{' '}
            <button
              onClick={handleSignUp}
              className="text-orange-500 hover:text-orange-600 transition-colors inline cursor-pointer"
            >
              회원가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
