'use client'

import { User } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useTransition } from 'react'

// 타입
import type { SignupProps } from './types'

// 훅
import { usePasswordStrength } from './hooks/usePasswordStrength'
import { useSignupForm } from './hooks/useSignupForm'

// 유효성 검사
import {
  isPasswordValid as checkPasswordValid,
  getEmailErrorMessage,
  getNameErrorMessage,
  getPasswordErrorMessage,
  validatePassword,
} from './validation'

// 하위 컴포넌트
import EmailInput from './components/EmailInput'
import NameInput from './components/NameInput'
import PasswordConfirmInput from './components/PasswordConfirmInput'
import PasswordInput from './components/PasswordInput'

// 버튼 공통 컴포넌트
import Button from '../ui/button/Button'

export default function Signup({
  onSignup,
  onLogin,
  signupError,
  onErrorChange,
}: SignupProps) {
  const [isPending, startTransition] = useTransition()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const agreeToTermsId = useId()

  // 폼 상태 관리
  const {
    name,
    email,
    password,
    passwordConfirm,
    agreeToTerms,
    touched,
    isPasswordMatch,
    isFormValid,
    setName,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setAgreeToTerms,
    setFieldTouched,
    setAllTouched: setAllTouched,
  } = useSignupForm()

  // 비밀번호 강도
  const { strength, getStrengthColour, getStrengthText } =
    usePasswordStrength(password)

  // 비밀번호 유효성 검사
  const passwordValidation = validatePassword(password)
  const isPasswordValid = checkPasswordValid(password)

  // 중복 이메일로 가입 시도(에러 발생) 시, 이메일 필드로 포커싱
  useEffect(() => {
    if (signupError && emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [signupError])

  const handleSubmit = useCallback(() => {
    setAllTouched()

    if (onSignup && isFormValid) {
      startTransition(() => {
        onSignup(email, password, name.trim())
      })
    }
  }, [name, email, password, onSignup, isFormValid, setAllTouched])

  const handleLogin = useCallback(() => {
    if (onLogin) {
      onLogin()
    }
  }, [onLogin])

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
          계정 만들기
        </h1>
        <p className="text-center text-gray-500">
          PawBuddy에 오신 것을 환영합니다!
        </p>
        <p className="mb-10 text-center text-gray-500">
          간단한 정보만 입력하면 바로 시작할 수 있어요
        </p>

        {/* Signup Form */}
        <div className="space-y-6">
          <NameInput
            value={name}
            onChange={value => {
              setName(value)
              setFieldTouched('name', false)
            }}
            onBlur={() => setFieldTouched('name', true)}
            error={getNameErrorMessage(name, touched.name)}
          />

          <EmailInput
            ref={emailInputRef}
            value={email}
            onChange={value => {
              setEmail(value)
              setFieldTouched('email', false)
              if (signupError && onErrorChange) {
                onErrorChange('')
              }
            }}
            onBlur={() => setFieldTouched('email', true)}
            error={getEmailErrorMessage(email, touched.email)}
          />

          {signupError && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {signupError}
            </div>
          )}

          <PasswordInput
            value={password}
            onChange={setPassword}
            onBlur={() => setFieldTouched('password', true)}
            passwordStrength={strength}
            passwordValidation={passwordValidation}
            isPasswordValid={isPasswordValid}
            showValidation={touched.password}
            errorMessage={
              touched.password ? getPasswordErrorMessage(password) : ''
            }
            getStrengthColour={getStrengthColour}
            getStrengthText={getStrengthText}
          />

          <PasswordConfirmInput
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            onBlur={() => setFieldTouched('passwordConfirm', true)}
            isPasswordMatch={isPasswordMatch}
            showError={touched.passwordConfirm}
          />

          {/* Agree to Terms Checkbox */}
          <div className="mb-32 flex items-center">
            <input
              type="checkbox"
              id={agreeToTermsId}
              checked={agreeToTerms}
              onChange={e => setAgreeToTerms(e.target.checked)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  setAgreeToTerms(!agreeToTerms)
                }
              }}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-orange-500"
            />
            <label
              htmlFor={agreeToTermsId}
              className="ml-2 cursor-pointer text-sm text-gray-600"
            >
              이용약관에 동의합니다
            </label>
          </div>

          {/* Signup Button */}
          <div className="-m-[30px] flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              variant="orange"
              className="w-full focus:border-blue-600"
            >
              {isPending ? '계정 만드는 중...' : '계정 만들기'}
            </Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <div className="mb-2 text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <button
              type="button"
              onClick={handleLogin}
              className="inline cursor-pointer text-orange-500 transition-colors hover:text-orange-600"
            >
              로그인하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
