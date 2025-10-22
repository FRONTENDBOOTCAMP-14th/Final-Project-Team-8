import { useId, type ComponentProps } from 'react'

interface EmailInputProps {
  value: string
  onChange: (value: string) => void
  inputProps?: ComponentProps<'input'>
}

export default function EmailInput({
  value,
  onChange,
  inputProps,
}: EmailInputProps) {
  const id = useId()

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
        autoComplete="email"
        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF6000] focus:ring-1 focus:ring-[#FF6000]"
        {...inputProps}
      />
    </div>
  )
}
