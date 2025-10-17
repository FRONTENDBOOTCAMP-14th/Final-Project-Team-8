import { Eye, EyeOff } from 'lucide-react'
import { useId, useState, type ComponentProps } from 'react'

interface PasswordConfirmInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  isPasswordMatch: boolean
  showError?: boolean
  inputProps?: ComponentProps<'input'>
}

export default function PasswordConfirmInput({
  value,
  onChange,
  onBlur,
  isPasswordMatch,
  showError,
  inputProps,
}: PasswordConfirmInputProps) {
  const id = useId()
  const [showPassword, setShowPassword] = useState(false)

  const hasError =
    (!value && showError) ?? (value && !isPasswordMatch && showError)

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
