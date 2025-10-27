'use client'
import { use } from 'react'
import Accordion from '@/components/accordion/accordion'
import ScheduledMeal from '@/components/ui/MealTimeReminder/ScheduledMeal'

interface AccordionBoxProps {
  params: Promise<{ id: 'health' | 'nutrition' | 'activity' }>
}

export default function AccordionBox({ params }: AccordionBoxProps) {
  const { id: category } = use(params)
  return (
    <div className="flex h-full flex-col gap-4">
      {category === 'health' && (
        <>
          <Accordion type="antiparasitic" title="구충치료" />
          <Accordion type="vaccines" title="예방접종" />
          <Accordion type="medical treatment" title="의료 처치" />
          <Accordion type="other treatments" title="기타 치료" />
        </>
      )}
      {category === 'nutrition' && (
        <div>
          <Accordion type="diet" title="식단일지" />
          <div className="mt-[30px] mb-5 text-xl font-bold text-gray-700">
            식사 시간 알림
          </div>
          <ScheduledMeal></ScheduledMeal>
        </div>
      )}
      {category === 'activity' && (
        <>
          <Accordion type="walks" title="산책" />
          <Accordion type="other activities" title="기타 활동 일지" />
        </>
      )}
    </div>
  )
}
