'use client'

import Image from 'next/image'
import { useState } from 'react'
import AccordionItemBox from './AccordionItemBox'
import { selectTypeIcon } from './util/accordionFun'
// Accordion 컴포넌트 Props 타입 정의
export interface AccordionProps {
  type:
    | 'antiparasitic'
    | 'diet'
    | 'medical treatment'
    | 'other activities'
    | 'other treatments'
    | 'vaccines'
    | 'walks'
  title: string
}
/**
 * Accordion 컴포넌트
 * 클릭 시 열리고 닫히는 아코디언 UI
 */
export default function Accordion({
  type = 'antiparasitic',
  title,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  // 한 번에 아이콘 크기 조정
  const iconSize = 60 // px 단위로 숫자 한 번만 바꾸면 됨
  const toggleSize = 20 // 플러스/마이너스 아이콘

  // 아코디언 버튼 클릭 시 열림/닫힘 토글
  const handleClick = () => setIsOpen(prev => !prev)

  return (
    <section className="accordion-box flex w-full min-w-70 flex-col rounded-2xl border-2 border-gray-200 active:border-amber-300">
      <h3 className="sr-only">{title}</h3>
      <button
        type="button"
        onClick={handleClick}
        className="m-0 flex grow cursor-pointer items-center gap-5 p-5 text-left"
      >
        {/* 타입 아이콘 */}
        <Image
          src={`/components/accordion/${selectTypeIcon(type)}.svg`}
          alt=""
          width={iconSize}
          height={iconSize}
          className="rounded-xl shadow-sm"
          priority
        />

        {/* 제목 */}
        <span className="grow text-2xl font-bold text-gray-800">{title}</span>

        {/* 플러스/마이너스 토글 아이콘 */}
        <span
          className={'relative flex items-center justify-center'}
          style={{ width: toggleSize, height: toggleSize }}
        >
          <Image
            src="/components/accordion/plus-button-icon.svg"
            alt="펼치기"
            width={toggleSize}
            height={toggleSize}
            className={`absolute transition-all duration-300 ${
              isOpen
                ? 'scale-0 rotate-90 opacity-0'
                : 'scale-100 rotate-0 opacity-100'
            }`}
          />
          <Image
            src="/components/accordion/subtraction-buttons-icon.svg"
            alt="접기"
            width={toggleSize}
            height={toggleSize}
            className={`absolute transition-all duration-300 ${
              isOpen
                ? 'scale-100 rotate-0 opacity-100'
                : 'scale-0 -rotate-90 opacity-0'
            }`}
          />
        </span>
      </button>

      <div className="accordion-item">
        <AccordionItemBox isOpen={isOpen} type={type} />
      </div>
    </section>
  )
}
