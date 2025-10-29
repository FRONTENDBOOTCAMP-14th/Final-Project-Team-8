import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import ContentCard from '@/components/ui/ContentCard'

export default function HomePage() {
  return (
    <LandingPage>
      <ContentCard title="우리 아이 맞춤 프로필">
        <p>사랑하는 반려동물의 특별한 프로필을 만들어보세요</p>
        <p>이름, 품종, 나이를 공유하고 다른 반려인들과 소통해보세요</p>
      </ContentCard>
    </LandingPage>
  )
}

function LandingPage({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-screen w-full flex-col gap-8 bg-gradient-to-b from-[#FFF5E1] to-[#FFE0B2] p-10">
      {/* 상단 PAW BUDDY LOGO */}
      <h1 lang="en" className="sr-only">
        Paw Buddy
      </h1>
      <Link href="/dashboard" className="absolute z-50 cursor-pointer">
        <img
          src="/assets/logo/Logo-Paw-Buddy-col.svg"
          alt="Paw Buddy 대시보드"
          className="transition-opacity hover:opacity-80"
        />
      </Link>
      {/* 좌우 레이아웃 */}
      <div className="flex h-full w-full flex-col-reverse gap-5 md:flex-row">
        {/* 왼쪽 이미지 */}
        <div className="flex w-full md:w-1/2">
          <img
            className="h-auto w-full max-w-[500px] object-contain md:absolute md:bottom-0 md:max-w-[800px]"
            src="/assets/img/Frame-280235.png"
            alt=""
          />
        </div>
        {/* 오른쪽 콘텐츠 카드 */}
        <div className="flex h-full flex-col items-center justify-center md:w-1/2">
          {children}
        </div>
      </div>
    </div>
  )
}
