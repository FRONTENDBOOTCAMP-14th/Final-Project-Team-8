import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { Walks } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import ModalTypeWalks from '../../modal/ModalType/ModalTypeWalks'
import ItemEditButtonCompo from './ItemEditButtonCompo'

// Walk 리스트 아이템 (거리/시간 표시)
export default function WalksItem({
  date,
  distance,
  id,
  pet_id,
  start_time,
  title,
  total_time,
}: Walks) {
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
      aria-labelledby={headingId}
      className="m-5 flex h-[84px] items-center gap-4 rounded-xl border border-gray-300 px-4 py-[23px]"
    >
      <div className="flex grow flex-col gap-1">
        <h3
          id={headingId}
          title={title}
          className="order-1 grow text-base font-bold text-gray-800"
        >
          <button
            onClick={on}
            type="button"
            className="line-clamp-1 flex w-full grow origin-left cursor-pointer gap-2 transition active:scale-[0.95]"
          >
            <img
              aria-hidden="true"
              src="/components/accordion/walk-title-icon.svg"
              alt=""
            />
            {title}
          </button>
        </h3>
        <div className="flex items-center justify-start gap-2">
          <time dateTime={toISODate(date)} className="text-base text-gray-500">
            {date}
          </time>
          <div className="h-4 w-px bg-gray-300" />
          <span className="text-base text-gray-500">{start_time}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="text-gray-500">
          <span className="font-bold text-gray-800">{distance}</span> km
        </span>
        <div className="h-4 w-px bg-gray-300" />
        <span className="text-gray-500">
          <span className="font-bold text-gray-800">{total_time}</span> min
        </span>
      </div>

      <Modal
        open={isOpen}
        onClose={off}
        isModify={isModify}
        setModify={setModify}
      >
        <ModalTypeWalks
          isModify={isModify}
          setModify={setModify}
          onClose={off}
          restProps={{
            date,
            distance,
            id,
            pet_id,
            start_time,
            title,
            total_time,
          }}
        />
      </Modal>

      {mouseState && <ItemEditButtonCompo title={title} />}
    </li>
  )
}
