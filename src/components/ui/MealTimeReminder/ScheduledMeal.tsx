import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { toast } from 'sonner'
import { getPetMealTime } from '@/libs/api/activity.api'
import type { ScheduledMeals } from '@/libs/supabase'
import { usePetStore } from '@/store/petStore'
import ListLoading from '../../accordion/ListLoading'
import MealTimeReminder from './MealTimeReminder'

export default function ScheduledMeal() {
  const pet_id = usePetStore(s => s.selectedPetId)

  const { data = [] } = useSuspenseQuery<ScheduledMeals[]>({
    queryKey: ['ScheduledMeals', pet_id],
    queryFn: () => getPetMealTime(pet_id ?? null),
    retry: 1,
  })

  const [firstScheduled, SecondScheduled] = data

  if (!pet_id) {
    toast.error('지정된 펫이 없습니다. 펫을 다시 지정해주세요.')

    return <div>펫 없음!</div>
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        <Suspense fallback={<ListLoading></ListLoading>}>
          <MealTimeReminder
            data={firstScheduled ?? null}
            petId={pet_id}
          ></MealTimeReminder>
          <MealTimeReminder
            data={SecondScheduled ?? null}
            petId={pet_id}
          ></MealTimeReminder>
        </Suspense>
      </div>
    </div>
  )
}
