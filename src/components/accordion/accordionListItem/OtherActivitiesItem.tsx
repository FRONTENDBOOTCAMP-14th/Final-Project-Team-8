import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { OtherActivities } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import ModalTypeOtherActivites from '../../modal/ModalType/ModalTypeOtherActivites'
import ItemEditButtonCompo from './ItemEditButtonCompo'

// 기타 활동 일지 아이템 (내용 미리보기)
export default function OtherActivitiesItem({
  date,
  id,
  notes,
  pet_id,
  start_time,
  duration_time,
  title,
}: OtherActivities) {
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
      className="m-5 max-h-34 min-h-25 w-[calc(100%-40px)] list-none rounded-xl border border-gray-300 px-4 py-[16px]"
    >
      <div className="mb-1 flex">
        <button
          onClick={on}
          type="button"
          className="grow-1 origin-left cursor-pointer transition hover:text-orange-400 active:scale-[0.95]"
        >
          {/* 제목은 너무 길면 줄 넘어감 */}
          <h3
            id={headingId}
            className="line-clamp-1 rounded-2xl text-start text-base font-bold text-gray-800"
          >
            {title}
          </h3>
        </button>
        <time
          dateTime={toISODate(date)}
          className="flex min-w-26 items-center justify-center gap-1 text-sm font-bold text-gray-500"
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
      </div>
      <div className="flex">
        <p className="line-clamp-4 grow text-start text-sm whitespace-pre-line text-gray-500">
          {notes}
        </p>
        {mouseState && <ItemEditButtonCompo title={title} key={id} />}
      </div>

      <Modal
        open={isOpen}
        onClose={off}
        isModify={isModify}
        setModify={setModify}
      >
        <ModalTypeOtherActivites
          isModify={isModify}
          restProps={{
            date,
            id,
            notes,
            pet_id,
            start_time,
            duration_time,
            title,
          }}
        />
      </Modal>
    </li>
  )
}
