'use client'

import { useScheduleStore } from '@/store/scheduleStore'
import { AlertCircle } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import Button from '../ui/button/Button'
import CalendarSkeleton from '../ui/skeleton/CalendarSkeleton'
import CalendarScheduleClient from './CalendarScheduleClient'

interface Props {
  petId?: string
}

export default function CalendarSchedule({ petId }: Props) {
  const {
    schedules,
    activeFilters,
    isLoading,
    error,
    fetchSchedules,
    clearSchedules,
    currentPetId,
  } = useScheduleStore()

  // 필터링된 스케줄
  const filteredSchedules = useMemo(() => {
    if (activeFilters.length === 0) return []
    return schedules.filter(schedule =>
      activeFilters.includes(schedule.category)
    )
  }, [schedules, activeFilters])

  useEffect(() => {
    if (!petId) {
      clearSchedules()
      return
    }

    fetchSchedules(petId)
  }, [petId, fetchSchedules, clearSchedules])

  // petId가 없을 때
  if (!petId) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg text-[#A3A0C0]">반려동물을 선택해주세요.</p>
      </div>
    )
  }

  // 로딩 중
  if (isLoading) {
    return <CalendarSkeleton />
  }

  // 에러 발생
  if (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-[#FC5A5A]" />
        <div className="text-center">
          <p className="text-lg font-semibold text-[#3A394F]">
            일정을 불러올 수 없습니다.
          </p>
          <p className="mt-2 text-sm text-[#80809A]">{error}</p>
          <Button variant="orange" onClick={() => fetchSchedules(petId)}>
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  // 필터링 후 스케줄이 없을 때
  if (filteredSchedules.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <CalendarScheduleClient schedules={[]} />
        <div className="flex items-center justify-center rounded-xl bg-[#F7F7FC] p-6">
          <p className="text-center text-sm text-[#A3A0C0]">
            필터 조건에 맞는 일정이 없습니다.
          </p>
        </div>
      </div>
    )
  }

  return <CalendarScheduleClient schedules={filteredSchedules} />
}
