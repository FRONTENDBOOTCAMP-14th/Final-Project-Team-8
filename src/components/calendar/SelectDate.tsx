import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/button/Button'

interface Props {
  currentYear: number
  currentMonth: number
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>
}

export default function SelectDate({
  currentYear,
  currentMonth,
  setCurrentYear,
  setCurrentMonth,
}: Props) {
  const handleYearChange = (delta: number) => {
    setCurrentYear(prevYear => prevYear + delta)
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(Number(event.target.value))
  }

  return (
    <section className="flex flex-row items-center justify-between">
      <Button
        variant="white"
        aria-label="이전 년 선택"
        onClick={() => handleYearChange(-1)}
        className="!m-0 h-fit min-w-fit p-[13px] !outline-[#A3A0C0]"
      >
        <ChevronLeft className="h-5 w-5 text-[#B5B3CD]" />
      </Button>
      <Button
        variant="white"
        aria-label="다음 년 선택"
        onClick={() => handleYearChange(1)}
        className="order-1 !m-0 h-fit min-w-fit p-[13px] !outline-[#A3A0C0]"
      >
        <ChevronRight className="h-5 w-5 text-[#B5B3CD]" />
      </Button>
      <p className="text-center text-[26px] text-[#3A394F]">{currentYear}년</p>
      <label htmlFor="month-select" className="sr-only">
        월 선택
      </label>
      <select
        id="month-select"
        value={currentMonth}
        onChange={handleMonthChange}
        className="text-center text-[26px] font-bold text-[#3A394F]"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
          <option key={month} value={month}>
            {month}월
          </option>
        ))}
      </select>
    </section>
  )
}
