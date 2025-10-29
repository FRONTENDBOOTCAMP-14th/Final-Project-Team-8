import { Eye, EyeOff } from 'lucide-react'
import { useId, useState, type ComponentProps } from 'react'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  inputProps?: ComponentProps<'input'>
}

export default function PasswordInput({
  value,
  onChange,
  inputProps,
}: PasswordInputProps) {
  const id = useId()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div role="group" className="flex flex-col">
      <label htmlFor={id} className="sr-only">
        비밀번호
      </label>
      <div className="relative w-full">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호"
          value={value}
          onChange={e => onChange(e.target.value)}
          autoComplete="current-password"
          className={
            'w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF6000] focus:ring-1 focus:ring-[#FF6000]'
          }
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
    </div>
  )
}
