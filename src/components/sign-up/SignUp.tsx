'use client'

import { Eye, EyeOff, User } from 'lucide-react'
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
  onSignup?: (email: string, password: string, name: string) => void
  onLogin?: () => void
}

export default function Signup({ onSignup, onLogin }: SignupProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isPending, startTransition] = useTransition()

  // 각 필드(이메일, 비밀번호 등)의 방문 여부를 추적하는 touched 상태
  // - 사용자가 입력 중일 때는 에러를 보여주지 않고
  // - 필드를 떠났을 때(onBlur)만 에러를 표시하여 UX 개선
  // - 예: 이메일을 'aaa@'까지만 입력한 상태에서는 에러 없음, 필드 이탈 시 에러 표시
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  })

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
    return passwordValidation.length && passwordValidation.hasLetters
  }, [passwordValidation])

  const isPasswordMatch = useMemo(() => {
    return password === passwordConfirm && passwordConfirm.length > 0
  }, [password, passwordConfirm])

  const isFormValid = useMemo(() => {
    return (
      name.trim().length > 0 &&
      EMAIL_REGEX.test(email) &&
      isPasswordValid &&
      isPasswordMatch &&
      agreeToTerms
    )
  }, [name, email, isPasswordValid, isPasswordMatch, agreeToTerms])

  const handleSubmit = useCallback(() => {
    // 폼 제출 시 모든 필드를 touched로 설정
    // - 사용자가 어떤 필드를 건드리지 않고 바로 제출 버튼을 누른 경우,
    // - 모든 필드의 에러를 한 번에 표시하여 무엇을 입력해야 하는지 알려줌
    setTouched({
      name: true,
      email: true,
      password: true,
      passwordConfirm: true,
    })

    // 폼이 유효한 경우에만 실제 회원가입 진행
    if (onSignup && isFormValid) {
      startTransition(() => {
        onSignup(email, password, name.trim())
      })
    }
    // 폼이 유효하지 않으면 위에서 설정한 touched 상태로 인해 에러 메시지 표시
  }, [name, email, password, onSignup, isFormValid])

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
            onChange={setName}
            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
            error={
              touched.name && name.trim().length === 0
                ? '이름을 입력해주세요'
                : ''
            }
          />

          <EmailInput
            value={email}
            onChange={setEmail}
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            error={
              touched.email && !EMAIL_REGEX.test(email)
                ? email.length === 0
                  ? '이메일을 입력해주세요'
                  : '올바른 이메일 형식을 입력해주세요 (예: example@email.com)'
                : ''
            }
          />

          {/* showValidation prop으로 유효성 비밀번호 검사 메시지 표시 시점 제어
          - touched.password가 false일 때: 비밀번호 강도만 표시
          - touched.password가 true일 때: 강도 + 세부 요구사항(6자 이상, 영문, 숫자 등) 표시
           */}
          <PasswordInput
            value={password}
            onChange={setPassword}
            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
            passwordStrength={passwordStrength}
            passwordValidation={passwordValidation}
            isPasswordValid={isPasswordValid}
            showValidation={touched.password}
          />

          {/* showError prop으로 비밀번호 일치/불일치 메시지 표시 시점 제어 */}
          <PasswordConfirmInput
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            onBlur={() =>
              setTouched(prev => ({ ...prev, passwordConfirm: true }))
            }
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
          {/* 여기도 수정함 */}
          {/* disabled 조건에서 isFormValid 제거
          - 버튼을 항상 활성화하여 사용자가 언제든 제출 시도 가능
          - 제출 시 유효하지 않은 필드들의 에러가 모두 표시됨
           */}
          <div className="-m-[30px] flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={isPending}
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
 * 이름(닉네임) 입력 컴포넌트
 */

function NameInput({
  value,
  onChange,
  onBlur,
  error,
  inputProps,
}: {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  inputProps?: ComponentProps<'input'>
}) {
  const id = useId()
  const hasError = !!error

  return (
    <div role="group" className="flex flex-col">
      <label htmlFor={id} className="sr-only">
        이름
      </label>
      <input
        id={id}
        type="text"
        placeholder="이름"
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        autoComplete="name"
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
 * 이메일 입력 컴포넌트
 */
function EmailInput({
  value,
  onChange,
  onBlur,
  error,
  inputProps,
}: {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
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
        onBlur={onBlur}
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
  onBlur,
  passwordStrength,
  passwordValidation,
  isPasswordValid,
  showValidation,
  inputProps,
}: {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  passwordStrength: number
  passwordValidation: {
    length: boolean
    hasLetters: boolean
    hasNumber: boolean
    hasSpecialChar: boolean
  }
  isPasswordValid: boolean
  showValidation?: boolean
  inputProps?: ComponentProps<'input'>
}) {
  const id = useId()

  const hasError =
    (!value && showValidation) || (value && !isPasswordValid && showValidation)

  const [showPassword, setShowPassword] = useState(false)

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
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호"
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete="new-password"
          className={`w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${hasError ? 'border-red-500' : 'border-gray-300'}`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

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

          {!isPasswordValid && showValidation && (
            <div className="mt-2 space-y-1 text-xs">
              <p
                className={
                  passwordValidation.length ? 'text-green-600' : 'text-gray-500'
                }
              >
                ✓ {MIN_PASSWORD_LENGTH}자 이상 (필수)
              </p>
              <p
                className={
                  passwordValidation.hasLetters
                    ? 'text-green-600'
                    : 'text-gray-500'
                }
              >
                ✓ 영문 대소문자 포함 (필수)
              </p>
              <p
                className={
                  passwordValidation.hasNumber
                    ? 'text-green-600'
                    : 'text-gray-500'
                }
              >
                ✓ 숫자 포함 (선택사항)
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

      {!value && showValidation && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-3 text-xs text-red-500"
        >
          비밀번호를 입력해주세요
        </p>
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
  onBlur,
  isPasswordMatch,
  showError,
  inputProps,
}: {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  isPasswordMatch: boolean
  showError?: boolean
  inputProps?: ComponentProps<'input'>
}) {
  const id = useId()

  const hasError =
    (!value && showError) || (value && !isPasswordMatch && showError)

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div role="group" className="flex flex-col">
      <label htmlFor={id} className="sr-only">
        비밀번호 확인
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호 확인"
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete="new-password"
          className={`focus:ring-orange-500' w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 ${hasError ? 'border-red-500' : 'border-gray-300'}`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {value && showError && !isPasswordMatch && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-3 text-xs text-red-500"
        >
          비밀번호가 일치하지 않습니다
        </p>
      )}
      {value && showError && isPasswordMatch && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-3 text-xs text-green-600"
        >
          비밀번호가 일치합니다
        </p>
      )}
      {!value && showError && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-3 text-xs text-red-500"
        >
          비밀번호 확인을 입력해주세요
        </p>
      )}
    </div>
  )
}
