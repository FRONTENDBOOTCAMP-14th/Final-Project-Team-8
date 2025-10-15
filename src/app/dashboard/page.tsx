'use client'

import { Button } from '@/components'
import { usePetStore } from '@/store/petStore'

export default function DashboardPage() {
  const { petList } = usePetStore()

  const hasPets = petList.length > 0

  return (
    <>
      {hasPets ? (
        <div className="flex flex-col">
          <div className="p-[30px]">
            <div>등록된 반려동물 프로필 [몇마리 등록햇나 보여야댐]</div>
            <p>우리 아이들의 모든 정보를 확인해 보세요</p>
          </div>
          <div className="flex p-[30px]">
            <p>main card carousel</p>
            <p>건강카드</p>
            <p>영양관리 </p>
            <p>활동기록</p>
          </div>
        </div>
      ) : (
        <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-10">
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
          <Button variant="orange" className="max-w-105">
            반려동물 추가하기
          </Button>
        </div>
      )}
    </>
  )
}
