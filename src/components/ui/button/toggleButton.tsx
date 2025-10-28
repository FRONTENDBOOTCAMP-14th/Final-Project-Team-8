import { useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import { DevModal } from '../modal/DevModal'

interface ToggleButtonProps {
  title: string
}

export default function ToggleButton({ title }: ToggleButtonProps) {
  const [isOn, { toggle }] = useToggleState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    toggle()
    setIsModalOpen(true) // 클릭 시 모달만 열기
  }

  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <div className="flex justify-between rounded-2xl border-1 border-gray-200 p-4">
        <p className="font-bold">{title}</p>
        <button
          type="button"
          onClick={handleClick}
          className={`relative flex h-7 w-14 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-amber-500 ${isOn ? 'bg-amber-500' : 'bg-gray-400'} `}
        >
          <span
            className={`absolute left-1 aspect-square h-5 transform rounded-full bg-white transition-transform duration-300 ${isOn ? 'translate-x-7' : 'translate-x-0'}`}
          ></span>
        </button>
      </div>

      <DevModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="지금은 사용할 수 없어요"
        message="아직 개발 중인 기능이에요"
      />
    </>
  )
}
