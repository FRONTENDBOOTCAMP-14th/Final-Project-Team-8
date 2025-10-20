'use client'
import Accordion from '@/components/accordion/accordion'

interface AccordionBoxProps {
  activeTab: string
}

export default function AccordionBox({ activeTab }: AccordionBoxProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      {activeTab === 'health' && (
        <>
          <Accordion type="antiparasitic" title="예방접종" />
          <Accordion type="vaccines" title="구충 치료" />
          <Accordion type="medical treatment" title="의료 처치" />
          <Accordion type="other treatments" title="기타 치료" />
        </>
      )}
      {activeTab === 'nutrition' && <Accordion type="diet" title="식단일지" />}
      {activeTab === 'activity' && (
        <>
          <Accordion type="walks" title="산책" />
          <Accordion type="other activities" title="기타 활동 일지" />
        </>
      )}
    </div>
  )
}
