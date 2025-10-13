'use client'

import { useState } from 'react'
import { selectTypeIcon } from '../../../src/components/accordion/accordionFun'
import AccordionItemBox from '../../../src/components/accordion/accordionItemBox'

// Accordion 컴포넌트 Props 타입 정의
export interface AccordionProps {
  type:
    | 'vaccination'
    | 'anthelmintic'
    | 'medical'
    | 'other-treatments'
    | 'food-journal'
    | 'walk'
    | 'other-journals'
  title: string
}

/**
 * Accordion 컴포넌트
 * 클릭 시 열리고 닫히는 아코디언 UI
 */
export default function Accordion({
  type = 'vaccination',
  title,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false) // 아코디언 열림 여부 상태

  // 아코디언 버튼 클릭 시 열림/닫힘 토글
  const handleClick = () => {
    setIsOpen(prop => !prop)
  }

  return (
    <section className="accordion-box m-5 flex max-w-[630px] min-w-70 flex-col rounded-2xl border-2 border-gray-300 active:border-amber-300">
      {/* 아코디언 헤더 버튼 */}
      <button
        onClick={handleClick}
        aria-label={isOpen ? '열림 전환' : '닫힘 전환'}
        className="m-0 flex grow cursor-pointer items-center gap-5 p-5 text-left"
      >
        {/* 아이콘 */}
        <img
          src={`/components/accordion/${selectTypeIcon(type)}.svg`}
          alt={selectTypeIcon(type)}
        />
        {/* 제목 */}
        <p className="grow text-lg font-bold">{title}</p>

        {/* 플러스/마이너스 토글 아이콘 */}
        <span className="relative flex h-[24px] w-[24px] items-center justify-center">
          <img
            src="/components/accordion/plus-button-icon.svg"
            alt="plus"
            className={`absolute transition-all duration-300 ${
              isOpen
                ? 'scale-0 rotate-90 opacity-0'
                : 'scale-100 rotate-0 opacity-100'
            }`}
          />
          <img
            src="/components/accordion/subtraction-buttons-icon.svg"
            alt="minus"
            className={`absolute transition-all duration-300 ${
              isOpen
                ? 'scale-100 rotate-0 opacity-100'
                : 'scale-0 -rotate-90 opacity-0'
            }`}
          />
        </span>
      </button>

      {/* 아코디언 내용 */}
      <div className="accordion-item">
        <AccordionItemBox isOpen={isOpen} type={type}></AccordionItemBox>
      </div>
    </section>
  )
}
