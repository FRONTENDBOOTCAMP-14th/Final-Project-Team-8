interface PetAvatarProps {
  pet: {
    id: string
    name: string
    profileImg: string | null
  }
  selected?: boolean
  onClick?: (id: string) => void
}

const baseStyle =
  'aspect-square min-w-[60px] w-[60px] rounded-full object-cover'

export default function PetAvartar({ pet, selected, onClick }: PetAvatarProps) {
  return (
    <button
      type="button"
      className="flex flex-shrink-0 cursor-pointer flex-col items-center gap-2"
      aria-pressed={selected}
      onClick={() => onClick?.(pet.id)}
    >
      <img
        src={pet.profileImg ?? '/assets/img/default-profile.png'}
        alt=""
        className={`${baseStyle} ${selected ? 'outline-[3px] outline-[#FF6000]' : 'outline-[1.5px] outline-[#636073]'}`}
      />
      <span
        className={`mb-3 ${selected ? 'font-bold text-[#FF6000]' : 'text-gray-200'}`}
      >
        {pet.name}
      </span>
    </button>
  )
}
