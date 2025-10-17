import type { PropsWithChildren } from 'react'

export default function LandingPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-8 bg-gradient-to-b from-[#FFF5E1] to-[#FFE0B2] px-[80px] pt-[50px]">
      {/* 상단 PAW BUDDY LOGO */}
      <div className="">
        <img src="/assets/logo/Logo-Paw-Buddy-col.svg" alt="logo" />
      </div>
      {/* 좌우 레이아웃 */}
      <div className="flex h-full w-full flex-col-reverse gap-5 md:flex-row">
        {/* 왼쪽 이미지 */}
        <div className="flex w-full justify-center md:w-1/2 md:justify-end">
          <img
            className="h-auto w-full max-w-[500px] md:absolute md:bottom-0 md:max-w-[800px]"
            src="/assets/img/Frame 280235.png"
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
