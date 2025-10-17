'use client'

import { AlertCircle, Funnel } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button, CalendarSchedule, FilterModal, Schedules } from '@/components'
import { FILTER_OPTIONS } from '@/components/calendar/FilterModal'
import type { ScheduleEvent } from '@/components/calendar/types'
import { usePetStore } from '@/store/petStore'
import { useScheduleStore } from '@/store/scheduleStore'

export default function CalendarPage() {
  const { selectedPetId, petList } = usePetStore()
  const { activeFilters, setActiveFilters } = useScheduleStore()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // 일정 추가 핸들러
  const handleAddSchedule = () => {
    console.log('일정 추가 클릭')
    // 일정 추가 모달 열기
  }

  // 일정 클릭 핸들러
  const handleScheduleClick = (schedule: ScheduleEvent) => {
    console.log('일정 클릭:', schedule)
    // 일정 상세 모달 열기
  }

  // 선택된 반려동물 정보
  const selectedPet = useMemo(() => {
    if (!selectedPetId || petList.length === 0) return null
    return petList.find(p => p.id === selectedPetId) ?? null
  }, [selectedPetId, petList])

  // 에러 메시지
  const errorMessage = useMemo(() => {
    if (petList.length === 0) return '등록된 반려동물이 없습니다.'
    if (selectedPetId && !selectedPet)
      return '선택된 반려동물을 찾을 수 없습니다.'
    return null
  }, [petList.length, selectedPetId, selectedPet])

  // 필터 개수 표시(모두 선택이 아닐 때만)
  const filterCount = useMemo(() => {
    const totalFilters = FILTER_OPTIONS.length
    if (activeFilters.length === totalFilters) return null
    return activeFilters.length
  }, [activeFilters.length])

  return (
    <>
      <div className="flex w-full flex-row">
        <div className="relative grow p-7.5">
          <h2 className="text-[28px] font-bold text-[#3A394F]">캘린더</h2>
          <p className="mt-2 mb-7.5 font-medium text-[#80809A]">
            {selectedPet
              ? `${selectedPet.name}의 모든 활동 기록 보기`
              : '반려동물을 선택해주세요.'}
          </p>

          {/* 오류 상태 */}
          {errorMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-[#FEDEDE] p-4 text-[#FC5A5A]">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          {/* 반려동물 미선택 상태 */}
          {!selectedPetId ? (
            <div className="flex h-96 flex-col items-center justify-center gap-2">
              <p className="text-lg font-semibold text-[#A3A0C0]">
                사이드바에서 반려동물을 선택해주세요.
              </p>
              <p className="text-sm text-[#C6C6D9]">
                캘린더를 보려면 먼저 반려동물을 선택하세요.
              </p>
            </div>
          ) : (
            // 캘린더 표시
            <>
              {/* 필터 버튼 */}
              <Button
                variant="white"
                onClick={() => setIsFilterModalOpen(true)}
                className="absolute top-7.5 right-7.5 max-w-40 font-medium !text-[#80809A] !outline-[#80809A]"
              >
                <Funnel className="mr-2.5 aspect-square w-5" />
                필터
                {filterCount !== null && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6000] text-xs font-bold text-white">
                    {filterCount}
                  </span>
                )}
              </Button>
              <CalendarSchedule petId={selectedPetId} />
            </>
          )}
        </div>

        <section className="w-90 overflow-y-auto rounded-r-xl bg-[#F7F7FC] p-7.5">
          {selectedPetId ? (
            <Schedules
              onAddSchedule={handleAddSchedule}
              onScheduleClick={handleScheduleClick}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-[#A3A0C0]">반려동물을 선택해주세요.</p>
            </div>
          )}
        </section>
      </div>

      {/* 필터 모달 */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedFilters={activeFilters}
        onFilterChange={setActiveFilters}
      />
    </>
  )
}
