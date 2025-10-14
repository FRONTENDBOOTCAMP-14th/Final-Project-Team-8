import { forwardRef, useId, type ComponentProps } from 'react'

interface EmailInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  inputProps?: ComponentProps<'input'>
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  function EmailInput({ value, onChange, onBlur, error, inputProps }, ref) {
    const id = useId()
    const hasError = !!error

    return (
      <div role="group" className="flex flex-col">
        <label htmlFor={id} className="sr-only">
          이메일 주소
        </label>
        <input
          ref={ref}
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
)

export default EmailInput
