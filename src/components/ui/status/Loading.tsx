import Image from 'next/image'

export function LoadingPet() {
  return (
    <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-10">
      <div className="flex h-full flex-col items-center justify-center gap-[50px]">
        <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
          <h1 className="text-[34px] font-bold text-[#3A394F]">
            잠시만 기다려 주세요
          </h1>
          <p>반려동물 정보를 불러오고 있어요</p>
        </div>
        <div className="imgBox">
          <img src="/assets/img/noPets.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export function LoadingUser() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[50px]">
      <div className="flex flex-col items-center justify-center text-[18px] text-[#80809A]">
        <h1 className="text-[34px] font-bold text-[#3A394F]">
          잠시만 기다려 주세요
        </h1>
        <p>사용자 정보를 불러오고 있어요</p>

        <div className="gradient-bg mt-8 rounded-xl px-6 py-3 font-bold text-white shadow-2xl">
          Loading...
        </div>

        <div className="mt-8">
          <Image
            src="/assets/img/noPets2.svg"
            alt="로딩 중"
            width={350}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}

export function Loading() {
  return (
    <div className="relative mx-auto flex h-full min-h-150 w-full flex-col items-center justify-center gap-10">
      <div className="flex h-full flex-col items-center justify-center gap-[50px]">
        <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
          <h1 className="text-[34px] font-bold text-[#3A394F]">
            잠시만 기다려 주세요
          </h1>
          <p>로딩 중이에요</p>
        </div>
        <div className="imgBox">
          <img src="/assets/img/noPets.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
