'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export interface InputProps {
  id?: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
  required?: boolean
  error?: string
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

const Input = ({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
  required = false,
  error,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  const baseClassName = `
    w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6000] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed
    ${isPassword ? 'pr-12' : ''}
    ${error ? 'border-red-200' : ''}
    ${className}
    `.trim()

  return (
    <div className="relative">
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={baseClassName}
        disabled={disabled}
        required={required}
        autoComplete="off"
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600 disabled:opacity-50"
          disabled={disabled}
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  )
}

export default Input
