import Day from './day'

interface Props {
  week: number[]
}

export default function Week({ week }: Props) {
  return (
    <tr>
      {week.map(day => (
        <Day key={day} day={day} aria-label={`${day}일`} />
      ))}
    </tr>
  )
}
