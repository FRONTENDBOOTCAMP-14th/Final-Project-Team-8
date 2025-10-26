import { Cake, House } from 'lucide-react'
import type { Pet } from '@/store/petStore'

interface PetDetailProps {
  selectedPet: Partial<Pet>
}

export default function PetDetailSection({ selectedPet }: PetDetailProps) {
  // 나이 계산 함수
  const getAge = () => {
    if (!selectedPet.birthdate) return null
    const age =
      new Date().getFullYear() - new Date(selectedPet.birthdate).getFullYear()
    return age
  }
  return (
    <section className="flex flex-col">
      <h2 className="sr-only">상세 정보</h2>
      <div className="flex flex-col gap-4 text-gray-500">
        <h3 className="text-[18px] font-bold text-neutral-600">외모 및 특징</h3>
        <p>{selectedPet.bio}</p>
        <dl className="flex flex-col gap-4">
          <div className="flex justify-between">
            <dt>성별</dt>
            <dd className="font-bold text-neutral-600">{selectedPet.gender}</dd>
          </div>
          <hr className="border-neutral-200" />
          <div className="flex justify-between">
            <dt>크기</dt>
            <dd className="font-bold text-neutral-600">
              {selectedPet.size === 0 && '소형견'}
              {selectedPet.size === 1 && '중형견'}
              {selectedPet.size === 2 && '대형견'}
            </dd>
          </div>
          <hr className="border-neutral-200" />
          <div className="flex justify-between">
            <dt>체중</dt>
            <dd className="font-bold text-neutral-600">
              {selectedPet.weight} kg
            </dd>
          </div>
        </dl>
        {/* 기념일 */}
        <h3 className="text-[18px] font-bold text-neutral-600">기념일</h3>
        <dl className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Cake className="h-[50px] w-[50px] rounded-[18px] bg-[#FFD8C0]/50 p-3 text-[#FF6000]" />
            <div className="flex flex-col">
              <dt>생일</dt>
              <dd className="font-bold text-neutral-600">
                {selectedPet.birthdate}
              </dd>
            </div>
            <p className="ml-auto font-bold text-neutral-600">{getAge()} 살</p>
          </div>
          <hr className="border-neutral-200" />
          <div className="flex gap-4">
            <House className="h-[50px] w-[50px] rounded-[18px] bg-[#FFD8C0]/50 p-3 text-[#FF6000]" />
            <div className="flex flex-col">
              <dt>입양일</dt>
              <dd className="font-bold text-neutral-600">
                {selectedPet.adoption_date}
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  )
}
