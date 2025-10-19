import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { Vaccines } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import ModalTypeVaccination from '../../modal/ModalType/ModalTypeVaccination'
import ItemEditButtonCompo from './ItemEditButtonCompo'

/**
 * AccordionListItemTreatment 컴포넌트
 * 년도별 백신 기록 한 줄 렌더링
 * 예방접종, 구충치료, 의료처치, 기타치료 itme 컴포넌트
 */
export default function VaccinesTreatmentItem({
  expiry_date,
  id,
  lot,
  notes,
  pet_id,
  title,
  vaccinated_date,
}: Vaccines) {
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
        onClick={on}
        id={headingId}
        className="line-clamp-1 grow text-start text-base font-bold text-gray-800"
      >
        <button
          type="button"
          className="w-full origin-left cursor-pointer text-start transition active:scale-[0.95]"
        >
          {/* 백신 이름 */}
          {title}
        </button>
      </h3>
      {/* 구분선 */}
      <div className="relative mr-3 ml-3 flex items-center before:absolute before:left-0 before:h-4 before:w-px before:bg-gray-300"></div>

      <time
        dateTime={toISODate(vaccinated_date)}
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
        {vaccinated_date}
      </time>
      <time
        aria-label="만료 날짜"
        dateTime={toISODate(expiry_date ?? null)}
        className="sr-only"
      >
        {expiry_date ?? '다음 예정일이 없습니다.'}
      </time>

      <Modal
        open={isOpen}
        onClose={off}
        isModify={isModify}
        setModify={setModify}
      >
        <ModalTypeVaccination
          isModify={isModify}
          setModify={setModify}
          restProps={{
            expiry_date,
            id,
            lot,
            notes,
            pet_id,
            title,
            vaccinated_date,
          }}
        />
      </Modal>

      {/* 수정 및 삭제 버튼 */}
      {mouseState && <ItemEditButtonCompo title={title} />}
    </li>
  )
}
