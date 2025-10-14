import { MedicalTreatment } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '../../../hooks/useToggleState'
import Modal from '../../modal/Modal'
import ModalTypeMedicalTreatment from '../../modal/ModalType/ModalTypeMedical'
import ItemEditButtonCompo from './ItemEditButtonCompo'

/**
 * MedicalTreatmentItem 컴포넌트
 * 아코디언에서 필요로 하는 props : title, visit_date
 */
export default function MedicalTreatmentItem({
  category,
  id,
  next_date,
  notes,
  pet_id,
  title,
  visit_date,
}: MedicalTreatment) {
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
      id={id}
    >
      <h3
        id={headingId}
        className="line-clamp-1 grow text-start text-base font-bold text-gray-800"
      >
        <button
          onClick={on}
          type="button"
          className="w-full origin-left cursor-pointer text-start transition hover:translate-y-[-3px] hover:text-orange-400 active:scale-[0.95]"
        >
          {/* 백신 이름 */}
          {title}
        </button>
      </h3>
      {/* 구분선 */}
      <div className="relative mr-3 ml-3 flex items-center before:absolute before:left-0 before:h-4 before:w-px before:bg-gray-300"></div>
      <time
        dateTime={toISODate(visit_date)}
        className="ml-2 flex items-center gap-1 font-bold text-gray-500"
      >
        {/* 날짜 아이콘 및 표시 */}
        <CalendarIcon
          aria-hidden="true"
          focusable="false"
          width={20}
          height={20}
          className="text-gray-400"
        />
        {visit_date}
      </time>
      <time
        aria-label="next date"
        dateTime={toISODate(next_date ?? null)}
        className="sr-only"
      >
        {next_date ?? '다음 예정일이 없습니다.'}
      </time>
      <Modal
        open={isOpen}
        onClose={off}
        isModify={isModify}
        setModify={setModify}
      >
        <ModalTypeMedicalTreatment
          isModify={isModify}
          restProps={{
            category,
            id,
            next_date,
            notes,
            pet_id,
            title,
            visit_date,
          }}
        />
      </Modal>
      {/* 수정 및 삭제 버튼 */}
      {mouseState && <ItemEditButtonCompo title={title} />}
    </li>
  )
}
