import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { getPetMealTime } from '@/libs/api/activity.api'
import type { ScheduledMeals } from '@/libs/supabase'
import { usePetStore } from '@/store/petStore'
import ListLoading from '../../accordion/ListLoading'
import MealTimeReminder from './MealTimeReminder'
import type { NotificationManager } from './Notification'
import { initializeNotifications } from './Notification'
// 경로는 실제에 맞게 수정

export default function ScheduledMeal() {
  const pet_id = usePetStore(s => s.selectedPetId)
  const managerRef = useRef<NotificationManager | null>(null)

  const { data = [] } = useSuspenseQuery<ScheduledMeals[]>({
    queryKey: ['ScheduledMeals', pet_id],
    queryFn: () => getPetMealTime(pet_id ?? null),
    retry: 1,
  })

  const [firstScheduled, secondScheduled] = data

  useEffect(() => {
    const handleAlert = async () => {
      // manager 초기화 (한 번만)
      managerRef.current = await initializeNotifications()

      const manager = managerRef.current

      // 기존 알림 모두 취소
      manager.cancelAll()

      // 첫 번째 알림 추가
      if (firstScheduled) {
        const { id, title, time, toggle, weekday } = firstScheduled
        manager.add({
          id,
          time,
          title,
          message: `${title} 밥 시간이에요!`,
          enabled: toggle,
          weekday,
        })
      }

      // 두 번째 알림 추가
      if (secondScheduled) {
        const { id, title, time, toggle, weekday } = secondScheduled
        manager.add({
          id,
          time,
          title,
          message: `${title} 밥 시간이에요!`,
          enabled: toggle,
          weekday,
        })
      }
    }

    handleAlert()

    // 컴포넌트 언마운트 시 알림 취소
    return () => {
      managerRef.current?.cancelAll()
    }
  }, [firstScheduled, secondScheduled]) // data 변경 시마다 알림 재설정

  if (!pet_id) {
    toast.error('지정된 펫이 없습니다. 펫을 다시 지정해주세요.')
    return <div>펫 없음!</div>
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        <Suspense fallback={<ListLoading />}>
          <MealTimeReminder data={firstScheduled ?? null} petId={pet_id} />
          <MealTimeReminder data={secondScheduled ?? null} petId={pet_id} />
        </Suspense>
      </div>
    </div>
  )
}
