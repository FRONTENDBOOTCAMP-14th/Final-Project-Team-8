import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/button/Button'

interface Props {
  currentYear: number
  currentMonth: number
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>
}

const currentYearValue = new Date().getFullYear()
const START_YEAR = currentYearValue - 100
const END_YEAR = currentYearValue + 10

export default function SelectDate({
  currentYear,
  currentMonth,
  setCurrentYear,
  setCurrentMonth,
}: Props) {
  const handleMonthChange = (delta: number) => {
    let newMonth = currentMonth + delta
    let newYear = currentYear

    if (newMonth < 1) {
      // 1월에서 '이전' 버튼 클릭하면 이전 연도 12월로 이동
      newMonth = 12
      newYear--
    } else if (newMonth > 12) {
      // 12월에서 '다음' 버튼 클릭하면 다음 연도 1월로 이동
      newMonth = 1
      newYear++
    }

    setCurrentYear(newYear)
    setCurrentMonth(newMonth)
  }

  const handleYearSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentYear(Number(event.target.value))
  }

  const handleMonthSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentMonth(Number(event.target.value))
  }

  return (
    <section className="flex flex-row items-center justify-between">
      <label htmlFor="year-select" className="sr-only">
        연도 선택
      </label>
      <select
        id="year-select"
        value={currentYear}
        onChange={handleYearSelectChange}
        className="text-center text-[26px] text-[#3A394F]"
      >
        {Array.from(
          { length: END_YEAR - START_YEAR + 1 },
          (_, i) => START_YEAR + i
        ).map(year => (
          <option key={year} value={year}>
            {year}년
          </option>
        ))}
      </select>
      <label htmlFor="month-select" className="sr-only">
        월 선택
      </label>
      <select
        id="month-select"
        value={currentMonth}
        onChange={handleMonthSelectChange}
        className="text-center text-[26px] font-bold text-[#3A394F]"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
          <option key={month} value={month}>
            {month}월
          </option>
        ))}
      </select>
      <Button
        variant="white"
        aria-label="이전 월 선택"
        onClick={() => handleMonthChange(-1)}
        className="order-first !m-0 h-fit min-w-fit p-[13px] !outline-[#A3A0C0]"
      >
        <ChevronLeft className="h-5 w-5 text-[#B5B3CD]" />
      </Button>
      <Button
        variant="white"
        aria-label="다음 월 선택"
        onClick={() => handleMonthChange(1)}
        className="!m-0 h-fit min-w-fit p-[13px] !outline-[#A3A0C0]"
      >
        <ChevronRight className="h-5 w-5 text-[#B5B3CD]" />
      </Button>
    </section>
  )
}
