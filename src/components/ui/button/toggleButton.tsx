import useToggleState from '@/hooks/useToggleState'

interface ToggleButtonProps {
  title: string
}

export default function ToggleButton({ title }: ToggleButtonProps) {
  const [isOn, { toggle }] = useToggleState(false)
  return (
    <div className="flex justify-between rounded-2xl border-1 border-gray-200 p-4">
      <p className="font-bold">{title}</p>

      <button
        onClick={toggle}
        className={`relative flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-amber-500 ${isOn ? 'bg-amber-500' : 'bg-gray-400'} `}
      >
        <span
          className={`absolute left-1 aspect-square h-5 transform rounded-full bg-white transition-transform duration-300 ${isOn ? 'translate-x-7' : 'translate-x-0'}`}
        ></span>
      </button>
    </div>
  )
}
