'use client'

import Image from 'next/image'
import Link from 'next/link'

export function NotLogin() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[50px]">
      <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
        <p className="text-[34px] font-bold text-[#3A394F]">
          앗, 아직 로그인되지 않았어요!
        </p>
        <p className="mt-4">
          <style>{`
            @keyframes gradient-flow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .gradient-flow {
              background: linear-gradient(90deg, #fb923c, #f97316, #ec4899, #f97316, #fb923c);
              background-size: 300% 100%;
              animation: gradient-flow 3s ease infinite;
            }
          `}</style>
          <strong className="gradient-flow rounded-lg px-4 py-2 font-bold text-white shadow-2xl">
            PAW BUDDY
          </strong>{' '}
          를 이용하기 위해서는{' '}
        </p>

        <p className="mt-3">
          <b>로그인</b>을 먼저 해주세요!
        </p>
      </div>
      <div className="imgBox">
        <Image
          src="/assets/img/noPets2.svg"
          alt="반려동물을 등록하세요"
          width={350}
          height={200}
        />
      </div>
      <Link
        href="/login"
        className="flex h-[54px] w-full max-w-105 min-w-40 flex-row items-center justify-center rounded-[14px] bg-[#FF6000] p-[17px] text-lg text-[14px] font-bold text-white"
      >
        로그인 하기
      </Link>
    </div>
  )
}

export function EmptyPet() {
  return (
    <div className="relative mx-auto flex h-full min-h-150 w-full flex-col items-center justify-center gap-10">
      <div className="flex h-full flex-col items-center justify-center gap-[50px]">
        <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
          <p className="text-[34px] font-bold text-[#3A394F]">
            앗, 아직 비어있어요!
          </p>
          <p>소중한 우리 아이들을 소개해주세요</p>

          <p>첫 번째 반려동믈을 등록해보세요</p>
        </div>
        <div className="imgBox">
          <img src="/assets/img/noPets.svg" alt="반려동물을 등록하세요" />
        </div>
      </div>
      <Link
        href="/add-profile/step1"
        className="flex h-[54px] w-full max-w-105 min-w-40 flex-row items-center justify-center rounded-[14px] bg-[#FF6000] p-[17px] text-lg text-[14px] font-bold text-white"
      >
        반려동물 등록하기
      </Link>
    </div>
  )
}

export function NotSelectedPet() {
  return (
    <div className="relative mx-auto flex h-full min-h-150 w-full flex-col items-center justify-center gap-10">
      <div className="flex h-full flex-col items-center justify-center gap-[50px]">
        <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
          <p className="text-[34px] font-bold text-[#3A394F]">
            사이드바에서 반려동물을 선택해주세요
          </p>
        </div>
        <div className="imgBox">
          <img src="/assets/img/noPets.svg" alt="반려동물을 등록하세요" />
        </div>
      </div>
    </div>
  )
}

export function DeletedPet() {
  return (
    <div className="relative mx-auto flex h-full min-h-150 w-full flex-col items-center justify-center gap-10">
      <div className="flex h-full flex-col items-center justify-center gap-[50px]">
        <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
          <p className="text-[34px] font-bold text-[#3A394F]">
            삭제된 페이지를 보고있어요!
          </p>
          <p>성공적으로 삭제되었습니다</p>
        </div>
        <div className="imgBox">
          <img src="/assets/img/noPets.svg" alt="삭제되었습니다." />
        </div>
      </div>
      <Link
        href="/dashboard"
        className="flex h-[54px] w-full max-w-105 min-w-40 flex-row items-center justify-center rounded-[14px] bg-[#FF6000] p-[17px] text-lg text-[14px] font-bold text-white"
      >
        대시보드로 이동하기
      </Link>
    </div>
  )
}
