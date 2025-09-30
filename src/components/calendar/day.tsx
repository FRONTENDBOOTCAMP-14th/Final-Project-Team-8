import { tw } from '@/utils'

interface Props {
  day: string | number
  restProps?: boolean
}

export default function Day({ day, ...restProps }: Props) {
  return (
    <td {...restProps}>
      <button
        type="button"
        className={tw`
          cursor-pointer
          w-13.5 aspect-square
          bg-white border-gray-200 border-1 rounded-xl
          hover:border-orange-200 hover:text-orange-500
          active:border-orange-200 active:text-orange-500 active:bg-orange-100/50 active:font-semibold
        `}
      >
        {day}
      </button>
    </td>
  )
}
