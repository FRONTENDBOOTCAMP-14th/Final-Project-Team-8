import { useId, type ComponentProps } from 'react'

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
        autoComplete="current-password"
        className={
          'rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
        }
        {...inputProps}
      />
    </div>
  )
}
