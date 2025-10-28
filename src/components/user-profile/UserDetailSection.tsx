import type { UserData } from '@/hooks/useUserData'

export default function UserDetailSection(userData: Partial<UserData>) {
  // 나이 계산 함수
  const getAge = () => {
    if (!userData?.birthday)
      return <div className="text-gray-400">등록 안함</div>
    const age =
      new Date().getFullYear() - new Date(userData.birthday).getFullYear()
    return age
  }
  return (
    <section className="relative mt-5 flex flex-col">
      <div className="flex flex-col gap-4 text-gray-500">
        <h3 className="text-[18px] font-bold text-neutral-600">사용자 정보</h3>
        <dl className="flex flex-col gap-4 whitespace-nowrap">
          <div className="flex justify-between">
            <dt>성별</dt>
            <dd className="font-bold text-neutral-600">{userData?.gender}</dd>
          </div>
          <hr className="border-neutral-200" />
          <div className="flex justify-between">
            <dt>나이</dt>
            <dd className="font-bold text-neutral-600">{getAge()}</dd>
          </div>
          <hr className="border-neutral-200" />
          <div className="flex justify-between">
            <dt>별명</dt>
            <dd className="font-bold text-neutral-600">{userData?.nickname}</dd>
          </div>
          <hr className="border-neutral-200" />
          <div className="flex flex-col gap-1">
            <dt>전화번호</dt>
            <dd className="font-bold text-neutral-600">{userData?.phone}</dd>
          </div>
          <hr className="border-neutral-200" />
          <div className="flex-col justify-between">
            <dt>가입 이메일</dt>
            <dd className="font-bold text-neutral-600">{userData?.email}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
