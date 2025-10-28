'use client'
import { use } from 'react'
import Accordion from '@/components/accordion/accordion'
import ScheduledMeal from '@/components/ui/MealTimeReminder/ScheduledMeal'

interface AccordionBoxProps {
  params: Promise<{ id: 'health' | 'nutrition' | 'activity' }>
}

export default function AccordionBox({ params }: AccordionBoxProps) {
  const { id: category } = use(params)

  // 디버깅: category 값 확인
  console.log('🔍 Current category:', category)
  console.log('🔍 Type of category:', typeof category)

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

      {/* 디버깅: 어떤 카테고리도 매칭되지 않을 때 */}
      {category !== 'health' && category !== 'nutrition' && category !== 'activity' && (
        <div className="p-4 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700">
            ⚠️ 알 수 없는 카테고리: {String(category)}
          </p>
          <p className="text-sm text-red-600">
            예상 카테고리: health, nutrition, activity
          </p>
        </div>
      )}
    </div>
  )
}
