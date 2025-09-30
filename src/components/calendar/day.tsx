interface Props {
  day: string | number
  restProps?: boolean
}

export default function Day({ day, ...restProps }: Props) {
  return (
    <td {...restProps}>
      <button
        type="button"
        className="aspect-square w-13.5 cursor-pointer rounded-xl border-1 border-gray-200 bg-white hover:border-orange-300 hover:text-orange-500 focus:border-2 focus:border-orange-300 focus:font-semibold focus:text-orange-500 focus:outline-0"
      >
        {day}
      </button>
    </td>
  )
}
