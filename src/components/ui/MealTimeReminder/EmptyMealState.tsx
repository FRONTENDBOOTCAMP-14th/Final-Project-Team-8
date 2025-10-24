import { Calendar, Clock, Plus, Utensils } from 'lucide-react'

interface EmptyMealStateProps {
  ModalOpen: () => void
}

export function EmptyMealState({ ModalOpen }: EmptyMealStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-all hover:border-orange-300 hover:bg-orange-50">
      {/* 아이콘 그룹 */}
      <div className="relative mb-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
          <Utensils size={24} className="text-orange-500" />
        </div>
        <div className="absolute -top-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
          <Clock size={12} className="text-gray-400" />
        </div>
      </div>

      {/* 텍스트 */}
      <h3 className="mb-1 text-base font-bold text-gray-800">
        식사 시간을 추가해보세요
      </h3>
      <p className="mb-4 text-center text-xs text-gray-500">
        반려동물의 규칙적인 식사 관리를 위해 식사 시간을 설정해주세요
      </p>

      {/* 추가 버튼 */}
      <button
        onClick={ModalOpen}
        className="flex transform items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
      >
        <Plus size={18} />
        <span>식사 시간 추가</span>
      </button>

      {/* 장식 요소 */}
      <div className="mt-4 flex gap-6 opacity-40">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar size={12} />
          <span>요일 설정</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={12} />
          <span>시간 설정</span>
        </div>
      </div>
    </div>
  )
}
