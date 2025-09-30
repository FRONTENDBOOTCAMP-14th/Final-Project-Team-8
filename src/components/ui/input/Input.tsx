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
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  const baseClassName = `
    w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed
    ${isPassword ? 'pr-12' : ''}
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
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          disabled={disabled}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  )
}

export default Input
