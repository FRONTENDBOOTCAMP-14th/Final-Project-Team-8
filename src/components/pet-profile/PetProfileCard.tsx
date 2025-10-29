import { Mars, Venus } from 'lucide-react'
import type { PetSummary } from '@/store/petStore'

interface PetProfileCardProps {
  pet: PetSummary
}

export default function PetProfileCard({ pet }: PetProfileCardProps) {
  if (!pet) return null

  const genderIcon = () => {
    if (pet.gender === '암컷') {
      return <Venus aria-label={pet.gender} className="text-[#FF6000]" />
    } else if (pet.gender === '수컷') {
      return <Mars aria-label={pet.gender} className="text-[#FF6000]" />
    } else return null
  }

  return (
    <section className="flex h-full min-w-fit flex-row items-center justify-between gap-15 rounded-[18px] bg-[#FF6000] p-10 text-white shadow-lg outline-1 outline-[#F7F7FC] sm:max-w-[720px]">
      <div className="flex w-[200px] flex-col gap-[20px] sm:w-[370px]">
        <h3 className="sr-only">{pet.name}의 프로필 카드</h3>
        <div className="whitespace-nowrap">
          <p className="text-2xl font-bold">{pet.name}</p>
          <p>
            {pet.species} | {pet.breed}
          </p>
        </div>
        <p>{pet.bio}</p>
        <div className="-order-1 flex aspect-square w-10 items-center justify-center rounded-full bg-[#FFD8C0]">
          {genderIcon()}
        </div>
      </div>
      <div className="min-w-32">
        <img
          src={pet.profileImg ?? '/assets/img/default-profile.png'}
          alt=""
          className="aspect-square w-[164px] rounded-full object-cover"
        />
      </div>
    </section>
  )
}
