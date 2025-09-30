import Week from './week'

export default function CalendarComponent() {
  const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']
  const calendar = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, 1, 2, 3, 4],
  ]

  return (
    <section>
      <h1 className="sr-only">캘린더 컴포넌트</h1>
      <table className="border-separate border-spacing-4 text-center">
        <thead className="text-sm font-bold text-gray-600">
          <tr>
            {DAYS_OF_WEEK.map((day, index) => (
              <td key={index} aria-label={`${day}요일`}>
                {day}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {calendar.map((week, index) => (
            <Week key={index} week={week} />
          ))}
        </tbody>
      </table>
    </section>
  )
}
