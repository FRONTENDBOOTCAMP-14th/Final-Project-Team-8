import { Calendar, Clock } from 'lucide-react'
import React from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { ScheduledMeals } from '@/libs/supabase'
import Modal from '../../modal/Modal'
import MealTimeModal from '../../modal/modal-detail/MealTimeDetail'
import { EmptyMealState } from './EmptyMealState'

interface MealTimeReminderProps {
  data: ScheduledMeals | null
  petId: string
}

export default function MealTimeReminder({
  data,
  petId,
}: MealTimeReminderProps) {
  const [isModalOpen, { on: ModalOpen, off: ModalClose }] =
    useToggleState(false)
  const [isOn, { toggle: toToggle }] = useToggleState(data?.toggle ?? false)

  // 빈 상태 렌더링
  if (!data) {
    return (
      <>
        <EmptyMealState ModalOpen={ModalOpen} />
        <Modal
          open={isModalOpen}
          onClose={ModalClose}
          isModify={false}
          setModify={() => {}}
          buttonNone={true}
        >
          <MealTimeModal mode="create" petId={petId} onClose={ModalClose} />
        </Modal>
      </>
    )
  }

  // 데이터가 있을 때 렌더링
  const { id, time, title, weekday } = data

  return (
    <>
      <div
        id={id}
        className="flex h-[70px] items-center justify-between gap-[10px] rounded-2xl border-1 border-gray-200 p-4"
      >
        <div className="flex w-full items-center">
          <p className="w-6/10 text-lg font-bold">{title}</p>

          <button onClick={ModalOpen} className="flex cursor-pointer gap-5">
            <span className="flex gap-1 text-gray-500 transition hover:text-orange-400">
              <Calendar />
              <span>{weekday}</span>
            </span>

            <div className="h-5 w-px bg-gray-400" />

            <span className="flex gap-1 text-gray-500 transition hover:text-orange-400">
              <Clock />
              <span>{time}</span>
            </span>
          </button>
        </div>

        {/* 토글 버튼 */}
        <button
          onClick={toToggle}
          className={`relative flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-amber-500 ${
            isOn ? 'bg-amber-500' : 'bg-gray-400'
          }`}
        >
          <span
            className={`absolute left-1 aspect-square h-5 transform rounded-full bg-white transition-transform duration-300 ${
              isOn ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <Modal
        open={isModalOpen}
        onClose={ModalClose}
        isModify={false}
        setModify={() => {}}
        buttonNone={true}
      >
        <MealTimeModal mode="edit" initialData={data} onClose={ModalClose} />
      </Modal>
    </>
  )
}
