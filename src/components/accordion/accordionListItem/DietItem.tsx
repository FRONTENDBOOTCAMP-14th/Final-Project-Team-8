import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { Diet } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import { ModalTypeDiet } from '../../modal/ModalType/ModalTypeDiet'
import ItemEditButtonCompo from './ItemEditButtonCompo'

/**
 * AccordionListItem 아이템 컴포넌트
 * 년도별 기록(제목, 시간, 일) 한 줄 렌더링
 * 식단 일지 ...
 */
export default function DietItem({
  date,
  id,
  pet_id,
  time,
  title,
  snack_type,
  notes,
}: Diet) {
  const [mouseState, setMouseState] = useState<boolean>(false)
  const headingId = useId()
  const handleMouseIn = () => {
    setMouseState(true)
  }

  const handleMouseOut = () => {
    setMouseState(false)
  }

  const [isOpen, { on, off }] = useToggleState(false)
  const [isModify, setModify] = useState<boolean>(false)
  return (
    <li
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      onFocus={handleMouseIn}
      onBlur={handleMouseOut}
      aria-labelledby={headingId}
      className="m-5 flex max-h-[70px] items-center rounded-xl border border-gray-300 pt-[23px] pr-4 pb-[23px] pl-4"
    >
      <h3 id={headingId} className="grow text-base font-bold text-gray-800">
        <button
          onClick={on}
          type="button"
          className="grow origin-left cursor-pointer transition hover:translate-y-[-3px] hover:text-orange-400 active:scale-[0.95]"
        >
          {title}
        </button>
      </h3>

      {/* 시간 */}
      <span className="font-bold text-gray-400">{time}</span>
      {/* 구분선 */}
      <div className="relative mr-3 ml-3 flex items-center before:absolute before:left-0 before:h-4 before:w-px before:bg-gray-300"></div>

      {/* 날짜 아이콘 및 표시 */}
      <time
        dateTime={toISODate(date)}
        className="ml-2 flex gap-1 font-bold text-gray-500"
      >
        <CalendarIcon
          focusable="false"
          aria-hidden="true"
          width={20}
          height={20}
          className="text-gray-400"
        />
        {date}
      </time>
      <Modal
        open={isOpen}
        onClose={off}
        isModify={isModify}
        setModify={setModify}
      >
        <ModalTypeDiet
          isModify={isModify}
          restProps={{ date, id, pet_id, time, title, snack_type, notes }}
        />
      </Modal>
      {/* 수정 및 삭제 버튼 */}
      {mouseState && <ItemEditButtonCompo title={title} />}
    </li>
  )
}
