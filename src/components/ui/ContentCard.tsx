import Button from '@/components/ui/button/Button'
import React from 'react'

/**
 * ContentCard 컴포넌트 Props
 *
 * title - 카드 상단에 표시될 제목
 * children - 카드 본문에 들어가는 콘텐츠
 */
interface ContentCardProps {
  title: string
  children?: React.ReactNode
}

/**
 *
 * title - 카드 상단 제목
 * 설명이나 콘텐츠 요소는 children으로 받음
 *
 * 사용예시
 * <ContentCard title="우리아이 맞춤 프로필">
 *   <p>사랑하는 반려동물의</p>
 *   <p>특별한 프로필을 만들어보세요.</p>
 * </ContentCard>
 */
export default function ContentCard({ title, children }: ContentCardProps) {
  return (
    <div className="flex h-auto w-full max-w-[620px] min-w-fit flex-col items-center justify-center gap-10 rounded-[20px] bg-white px-12 py-6">
      <div className="flex flex-col items-center gap-5 text-[18px] text-gray-600">
        <p className="text-[34px] font-bold whitespace-nowrap">{title}</p>
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
      <div className="buttons flex w-full flex-col gap-4">
        <Button variant="orange" className="m-0">
          지금 시작하기
        </Button>
        <Button variant="transparent" className="m-0 text-gray-400">
          나중에 할게요
        </Button>
      </div>
    </div>
  )
}
