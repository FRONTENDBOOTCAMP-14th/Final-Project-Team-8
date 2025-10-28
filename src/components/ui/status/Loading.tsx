import Image from 'next/image'

export function LoadingPet() {
  return (
    <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-10">
      <div className="flex h-full flex-col items-center justify-center gap-[50px]">
        <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
          <p className="text-[34px] font-bold text-[#3A394F]">
            반려동물 정보를 불러오고 있어요
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

export function LoadingUser() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[50px]">
      <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
        <p className="text-[34px] font-bold text-[#3A394F]">
          사용자 정보를 불러오고 있어요
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
        </p>

        <div className="imgBox">
          <Image
            src="/assets/img/noPets2.svg"
            alt="반려동물을 등록하세요"
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
          <p className="text-[34px] font-bold text-[#3A394F]">로딩중이에요</p>
        </div>
        <div className="imgBox">
          <img src="/assets/img/noPets.svg" alt="로딩중" />
        </div>
      </div>
    </div>
  )
}
