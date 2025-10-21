'use client'

import { SquarePen } from 'lucide-react'
import Button from '@/components/ui/button/Button'
import ToggleButton from '@/components/ui/button/toggleButton'
import useUserData from '@/hooks/useUserData'
import { useUserStore } from '@/store/userStore'

export default function UserAccountPage() {
  const { user } = useUserStore()
  const { userData } = useUserData(user)

  // 나이 계산 함수
  const getAge = () => {
    if (!userData?.birthday)
      return <div className="text-gray-400">등록 안함</div>
    const age =
      new Date().getFullYear() - new Date(userData.birthday).getFullYear()
    return age
  }

  if (!user) {
    return (
      <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="flex h-full flex-col items-center justify-center gap-[50px]">
          <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
            <p className="text-[34px] font-bold text-[#3A394F]">
              유저 정보를 불러오고 있어요
            </p>
            <p>소중한 우리 아이들을 소개해주세요</p>
          </div>
          <div className="imgBox">
            <img src="/assets/img/noPets.svg" alt="반려동물을 등록하세요" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="w-full text-[28px] font-bold">계정</h1>
      {/* 프로필 사진 부분 */}
      <section className="flex w-full items-center gap-8">
        <img
          src={userData?.profile_img ?? '/assets/img/default-profile.png'}
          alt={userData?.nickname ?? '사용자'}
          className="aspect-square w-30 rounded-full outline-10 outline-gray-100"
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">{userData?.nickname}</div>
            <Button
              variant="white"
              className="max-w-fit min-w-fit rounded-[19px] p-0.5"
            >
              <SquarePen className="w-[20px]" />
            </Button>
          </div>
        </div>
      </section>
      <div className="flex h-full w-full gap-10">
        {/* 왼쪽 */}
        <main className="flex w-3/7 flex-col gap-5">
          {/* 상세정보 */}
          <section className="flex flex-col">
            <h2 className="sr-only">상세 정보</h2>
            <div className="flex flex-col gap-4 text-gray-500">
              <h3 className="text-[18px] font-bold text-neutral-600">
                사용자 정보
              </h3>
              <dl className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <dt>성별</dt>
                  <dd className="font-bold text-neutral-600">
                    {userData?.gender}
                  </dd>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex justify-between">
                  <dt>나이</dt>
                  <dd className="font-bold text-neutral-600">{getAge()}</dd>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex justify-between">
                  <dt>별명</dt>
                  <dd className="font-bold text-neutral-600">
                    {userData?.nickname}
                  </dd>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex flex-col gap-1">
                  <dt>전화번호</dt>
                  <dd className="font-bold text-neutral-600">
                    {userData?.phone}
                  </dd>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex-col justify-between">
                  <dt>가입 이메일</dt>
                  <dd className="font-bold text-neutral-600">
                    {userData?.email}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </main>
        <div className="mx-2 w-px bg-neutral-200"></div>
        {/* 오른쪽 */}
        <main className="flex w-4/7 flex-col gap-5">
          <h2 className="text-xl text-[18px] font-bold">환경 설정</h2>
          <section>
            <ToggleButton title="라이트모드" />
          </section>
          <h3 className="text-xl text-[18px] font-bold">알림 설정</h3>
          <section className="flex flex-col gap-4">
            <ToggleButton title="푸시 알림" />
            <ToggleButton title="이메일 알림" />
          </section>
        </main>
      </div>
    </div>
  )
}
