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
    <section className="mt-5 flex grow flex-col gap-4 text-gray-500">
      <p>{selectedPet.bio}</p>
      <h3 className="text-[18px] font-bold text-neutral-600">외모 및 특징</h3>
      <dl className="flex flex-col">
        <div className="flex justify-between border-b border-b-neutral-200 pb-4">
          <dt>성별</dt>
          <dd className="font-bold text-neutral-600">{selectedPet.gender}</dd>
        </div>
        <div className="flex justify-between border-b border-b-neutral-200 py-4">
          <dt>크기</dt>
          <dd className="font-bold text-neutral-600">
            {selectedPet.size === 0 && '소형견'}
            {selectedPet.size === 1 && '중형견'}
            {selectedPet.size === 2 && '대형견'}
          </dd>
        </div>
        <div className="flex justify-between pt-4">
          <dt>체중</dt>
          <dd className="font-bold text-neutral-600">
            {selectedPet.weight} kg
          </dd>
        </div>
      </dl>
      {/* 기념일 */}
      <h3 className="mt-5 text-[18px] font-bold text-neutral-600">기념일</h3>
      <div className="flex flex-col">
        <div className="flex items-start gap-4 border-b border-b-neutral-200 pb-4">
          <div className="flex-shrink-0" aria-hidden="true">
            <Cake
              size={50}
              className="rounded-[18px] bg-[#FFD8C0]/50 p-3 text-[#FF6000]"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <h4 className="text-base font-normal text-gray-500">생일</h4>
            <p className="mt-1 font-bold text-neutral-600">
              {selectedPet.birthdate}
            </p>
          </div>

          <p className="font-bold text-neutral-600">{getAge()} 살</p>
        </div>
        <div className="flex items-start gap-4 pt-4">
          <div className="flex-shrink-0" aria-hidden="true">
            <House
              size={50}
              className="rounded-[18px] bg-[#FFD8C0]/50 p-3 text-[#FF6000]"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <h4 className="text-base font-normal text-gray-500">입양일</h4>
            <p className="mt-1 font-bold text-neutral-600">
              {selectedPet.adoption_date}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
