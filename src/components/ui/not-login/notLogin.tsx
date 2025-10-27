'use client'

import Image from 'next/image'

export default function NotLogin() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[50px]">
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
    </div>
  )
}
