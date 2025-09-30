import { CalendarIcon, SquarePen, X } from 'lucide-react'
import { useState } from 'react'

// 리스트 아이템 Props 타입
interface AccordionListItemProps {
  title: string
  date: string | number
}

/**
 * AccordionListItem 컴포넌트
 * 년도별 백신 기록 한 줄 렌더링
 */
export function AccordionListItem({ title, date }: AccordionListItemProps) {
  const [mouseState, setMouseState] = useState<boolean>(false)

  const handleMouseIn = () => {
    console.log('마우스 인')
    setMouseState(true)
  }

  const handleMouseOut = () => {
    console.log('마우스 아웃')
    setMouseState(false)
  }
  return (
    <section
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      className="m-5 flex max-h-[70px] items-center rounded-xl border border-gray-300 pt-[23px] pr-4 pb-[23px] pl-4"
    >
      {/* 백신 이름 */}
      <span
        aria-label={title}
        className="grow text-base font-bold text-gray-800"
      >
        {title}
      </span>

      {/* 구분선 */}
      <div className="relative mr-3 ml-3 flex items-center before:absolute before:left-0 before:h-4 before:w-px before:bg-gray-300"></div>

      {/* 날짜 아이콘 및 표시 */}
      <CalendarIcon width={22} height={22} className="text-gray-400" />
      <span className="ml-2 font-bold text-gray-500">{date}</span>
      {mouseState && (
        <>
          <button
            type="button"
            aria-label="edit"
            className="mr-3 ml-3 flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
          >
            <SquarePen width={20} height={20} />
          </button>
          <button
            type="button"
            aria-label="delete"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
          >
            <X width={20} height={20} />
          </button>
        </>
      )}
    </section>
  )
}
