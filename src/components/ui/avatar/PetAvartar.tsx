interface PetAvatarProps {
  pet: {
    id: string
    profile_img: string
    name: string
  }
  selected?: boolean
  onClick?: (id: string) => void
}

const baseStyle = 'aspect-square w-[60px] rounded-full object-cover'

export default function PetAvartar({ pet, selected, onClick }: PetAvatarProps) {
  return (
    <div
      className="flex flex-shrink-0 flex-col items-center gap-2"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(pet.id)
        }
      }}
    >
      <img
        id={pet.id}
        src={pet.profile_img}
        alt={pet.name}
        className={`${baseStyle} ${selected ? 'outline-[3px] outline-orange-500' : 'outline-[1.5px] outline-[#636073]'}`}
        onClick={() => onClick?.(pet.id)}
      />
      <p
        className={`${selected ? 'font-bold text-[#FF6000]' : 'text-gray-200'}`}
      >
        {pet.name}
      </p>
    </div>
  )
}
