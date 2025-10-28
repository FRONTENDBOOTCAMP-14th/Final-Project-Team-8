import { Eye, EyeOff } from 'lucide-react'
import { useId, useState, type ComponentProps } from 'react'
import type { PasswordValidation } from '../types'
import { MIN_PASSWORD_LENGTH } from '../validation'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  passwordStrength: number
  passwordValidation: PasswordValidation
  isPasswordValid: boolean
  showValidation?: boolean
  errorMessage?: string
  getStrengthColour: (level: number) => string
  getStrengthText: (level: number) => string
  inputProps?: ComponentProps<'input'>
}

export default function PasswordInput({
  value,
  onChange,
  onBlur,
  passwordStrength,
  passwordValidation,
  isPasswordValid,
  showValidation,
  errorMessage,
  getStrengthColour,
  getStrengthText,
  inputProps,
}: PasswordInputProps) {
  const id = useId()
  const [showPassword, setShowPassword] = useState(false)

  const hasError =
    (!value && showValidation) ?? (value && !isPasswordValid && showValidation)

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
          className={`w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#FF6000] focus:ring-1 focus:ring-[#FF6000] ${hasError ? 'border-red-500' : 'border-gray-300'}`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
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

          {errorMessage && (
            <p
              role="alert"
              aria-live="polite"
              className="mt-2 text-xs font-medium text-red-500"
            >
              {errorMessage}
            </p>
          )}

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
