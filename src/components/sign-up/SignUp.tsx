'use client'

import { User } from 'lucide-react'
import {
  type ComponentProps,
  useCallback,
  useId,
  useMemo,
  useState,
  useTransition,
} from 'react'
import Button from '../ui/button/Button'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6
const PASSWORD_RULES = {
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
}

export interface SignupProps {
  onSignup?: (email: string, password: string) => void
  onLogin?: () => void
}

export default function Signup({ onSignup, onLogin }: SignupProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isPending, startTransition] = useTransition()

  const agreeToTermsId = useId()

  // 비밀번호 강도 계산
  const passwordStrength = useMemo(() => {
    if (!password) return 0

    let strength = 0

    if (password.length >= MIN_PASSWORD_LENGTH) strength++

    if (
      PASSWORD_RULES.hasUpperCase.test(password) &&
      PASSWORD_RULES.hasLowerCase.test(password)
    )
      strength++
    if (PASSWORD_RULES.hasNumber.test(password)) strength++
    if (PASSWORD_RULES.hasSpecialChar.test(password)) strength++

    return Math.min(strength, 3)
  }, [password])

  // 비밀번호 유효성 검사
  const passwordValidation = useMemo(() => {
    return {
      length: password.length >= MIN_PASSWORD_LENGTH,
      hasLetters:
        PASSWORD_RULES.hasUpperCase.test(password) &&
        PASSWORD_RULES.hasLowerCase.test(password),
      hasNumber: PASSWORD_RULES.hasNumber.test(password),
      hasSpecialChar: PASSWORD_RULES.hasSpecialChar.test(password),
    }
  }, [password])

  const isPasswordValid = useMemo(() => {
    return (
      passwordValidation.length &&
      passwordValidation.hasLetters &&
      passwordValidation.hasNumber
    )
  }, [passwordValidation])

  const isPasswordMatch = useMemo(() => {
    return password === passwordConfirm && passwordConfirm.length > 0
  }, [password, passwordConfirm])

  const isFormValid = useMemo(() => {
    return (
      EMAIL_REGEX.test(email) &&
      isPasswordValid &&
      isPasswordMatch &&
      agreeToTerms
    )
  }, [email, isPasswordValid, isPasswordMatch, agreeToTerms])

  const handleSubmit = useCallback(() => {
    if (onSignup && isFormValid) {
      startTransition(() => {
        onSignup(email, password)
      })
    }
  }, [email, password, onSignup, isFormValid])

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
            passwordStrength={passwordStrength}
            passwordValidation={passwordValidation}
            isPasswordValid={isPasswordValid}
          />

          <PasswordConfirmInput
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            isPasswordMatch={isPasswordMatch}
          />

          {/* Agree to Terms Checkbox */}
          <div className="mb-32 flex items-center">
            <input
              type="checkbox"
              id={agreeToTermsId}
              checked={agreeToTerms}
              onChange={e => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <label
              htmlFor={agreeToTermsId}
              className="ml-2 text-sm text-gray-600"
            >
              이용약관에 동의합니다
            </label>
          </div>

          {/* Signup Button */}
          <div className="-m-[30px] flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isPending}
              variant="orange"
              className="w-full"
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
  const hasError = !!error

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
      {error && (
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
 * 비밀번호 입력 컴포넌트
 */
function PasswordInput({
  value,
  onChange,
  passwordStrength,
  passwordValidation,
  isPasswordValid,
  inputProps,
}: {
  value: string
  onChange: (value: string) => void
  passwordStrength: number
  passwordValidation: {
    length: boolean
    hasLetters: boolean
    hasNumber: boolean
    hasSpecialChar: boolean
  }
  isPasswordValid: boolean
  inputProps?: ComponentProps<'input'>
}) {
  const id = useId()

  const getStrengthColour = (level: number) => {
    if (level === 0) return 'bg-gray-200'
    if (level === 1) return 'bg-red-500'
    if (level === 2) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = (level: number) => {
    if (level === 0) return ''
    if (level === 1) return '약함'
    if (level === 2) return '보통'
    return '강함'
  }

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
        autoComplete="new-password"
        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        {...inputProps}
      />

      {value && (
        <>
          <div className="mt-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-gray-600">비밀번호 강도</span>
              <span
                className={`text-xs font-medium ${passwordStrength === 1 ? 'text-red-500' : passwordStrength === 2 ? 'text-yellow-500' : passwordStrength === 3 ? 'text-green-500' : ''}`}
              >
                {getStrengthText(passwordStrength)}
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map(level => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded transition-colors ${passwordStrength >= level ? getStrengthColour(passwordStrength) : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>

          {!isPasswordValid && (
            <div className="mt-2 space-y-1 text-xs">
              <p
                className={
                  passwordValidation.length ? 'text-green-600' : 'text-gray-500'
                }
              >
                ✓ {MIN_PASSWORD_LENGTH}자 이상
              </p>
              <p
                className={
                  passwordValidation.hasLetters
                    ? 'text-green-600'
                    : 'text-gray-500'
                }
              >
                ✓ 영문 대소문자 포함
              </p>
              <p
                className={
                  passwordValidation.hasNumber
                    ? 'text-green-600'
                    : 'text-gray-500'
                }
              >
                ✓ 숫자 포함
              </p>
              <p
                className={
                  passwordValidation.hasSpecialChar
                    ? 'text-green-600'
                    : 'text-gray-500'
                }
              >
                ✓ 특수문자 포함 (선택사항)
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

/**
 * 비밀번호 확인 입력 컴포넌트
 */
function PasswordConfirmInput({
  value,
  onChange,
  isPasswordMatch,
  inputProps,
}: {
  value: string
  onChange: (value: string) => void
  isPasswordMatch: boolean
  inputProps?: ComponentProps<'input'>
}) {
  const id = useId()

  return (
    <div role="group" className="flex flex-col">
      <label htmlFor={id} className="sr-only">
        비밀번호 확인
      </label>
      <input
        id={id}
        type="password"
        placeholder="비밀번호 확인"
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="new-password"
        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        {...inputProps}
      />
      {value && !isPasswordMatch && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-3 text-xs text-red-500"
        >
          비밀번호가 일치하지 않습니다
        </p>
      )}
      {value && isPasswordMatch && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-3 text-xs text-green-600"
        >
          비밀번호가 일치합니다
        </p>
      )}
    </div>
  )
}
