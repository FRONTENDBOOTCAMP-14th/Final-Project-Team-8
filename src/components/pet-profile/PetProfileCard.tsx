import { Mars, Venus } from 'lucide-react'

interface PetProfileCardProps {
  pet: {
    id: string
    name: string
    species: string
    breed?: string
    profile_img?: string
    gender?: string
    bio?: string
  }
}

export default function PetProfileCard({ pet }: PetProfileCardProps) {
  const genderIcon = () => {
    if (pet.gender === '암컷') {
      return <Venus className="text-[#FF6000]"></Venus>
    } else if (pet.gender === '수컷') {
      return <Mars className="text-[#FF6000]"></Mars>
    } else return null
  }

  return (
    <div className="flex max-h-[280px] max-w-[720px] flex-row items-center justify-between gap-15 rounded-[18px] bg-[#FF6000] p-10 text-white shadow-lg outline-1 outline-[#F7F7FC]">
      <div className="flex max-w-[370px] flex-col gap-[20px]">
        <div className="flex aspect-square w-10 items-center justify-center rounded-full bg-[#FFD8C0]">
          {genderIcon()}
        </div>
        <div>
          <p className="text-2xl font-bold">{pet.name}</p>
          <p>
            {pet.species} | {pet.breed}
          </p>
        </div>
        <p>{pet.bio}</p>
      </div>
      <div className="shrink-0">
        <img
          src={pet.profile_img}
          alt={pet.name}
          className="aspect-square w-[164px] rounded-full object-cover"
        />
      </div>
    </div>
  )
}
