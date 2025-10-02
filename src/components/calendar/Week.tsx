import { type CalendarDay } from './CalendarComponent'
import Day from './Day'

interface Props {
  week: CalendarDay[]
}

export default function Week({ week }: Props) {
  return (
    <tr>
      {week.map((dayData, index) => (
        <Day key={index} dayData={dayData} aria-label={`${dayData.date}일`} />
      ))}
    </tr>
  )
}
