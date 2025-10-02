import { type CalendarDay } from './CalendarComponent'

interface Props {
  dayData: CalendarDay
  restProps?: boolean
}

export default function Day({ dayData, ...restProps }: Props) {
  const { date, isCurrentMonth } = dayData

  return (
    <td {...restProps}>
      <button
        type="button"
        aria-disabled={!isCurrentMonth}
        className={`aspect-square w-13.5 cursor-pointer rounded-xl border-1 border-[#DAD9E6] bg-white hover:border-[#FFA873] hover:text-[#FF6000] focus:border-2 focus:border-[#FFA873] focus:font-semibold focus:text-[#FF6000] focus:outline-0 ${isCurrentMonth ? '' : 'pointer-events-none fill-[#F7F7FC] text-[#A3A0C0]'}`}
      >
        {dayData.date}
      </button>
    </td>
  )
}
