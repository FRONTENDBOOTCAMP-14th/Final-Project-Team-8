import PetAvatar from '@/components/ui/avatar/PetAvartar'
import IconButton from '@/components/ui/button/IconButton'

interface PetProfileListProps {
  pets: any[]
  selected?: boolean
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export default function PetProfileList({
  pets,
  selectedId,
  onSelect,
}: PetProfileListProps) {
  return (
    <section className="flex flex-row flex-nowrap gap-4 overflow-x-auto p-1">
      {pets.map(pet => (
        <PetAvatar
          key={pet.id}
          pet={pet}
          selected={selectedId === pet.id}
          onClick={() => onSelect(pet.id)}
        ></PetAvatar>
      ))}
      <IconButton onClick={() => onSelect(null)}></IconButton>
    </section>
  )
}

// export default React.memo(PetProfileList)
