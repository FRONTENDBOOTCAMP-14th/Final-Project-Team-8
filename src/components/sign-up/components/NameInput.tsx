import type { ComponentProps } from 'react'
import { useId } from 'react'

interface NameInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  inputProps?: ComponentProps<'input'>
}

export default function NameInput({
  value,
  onChange,
  onBlur,
  error,
  inputProps,
}: NameInputProps) {
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
        className={`rounded-lg border px-4 py-3 outline-none focus:border-[#FF6000] focus:ring-1 focus:ring-[#FF6000] ${hasError ? 'border-red-500' : 'border-gray-300'}`}
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
