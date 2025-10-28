import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import PetAvatar from '@/components/ui/avatar/PetAvartar'
import IconButton from '@/components/ui/button/IconButton'
import { useUserStore } from '@/store/userStore'
import type { PetSummary } from '../../../store/petStore'
import Button from '../button/Button'

interface PetProfileListProps {
  pets: PetSummary[]
  selected?: boolean
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export default function PetProfileList({
  pets,
  selectedId,
  onSelect,
}: PetProfileListProps) {
  const router = useRouter()
  const user = useUserStore<User | null>(s => s.user)
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
      {user ? (
        <IconButton onClick={() => onSelect(null)}></IconButton>
      ) : (
        <div className="flex w-full flex-col gap-2">
          <Button variant="gray" onClick={() => router.push('/login')}>
            로그인
          </Button>
          <Button variant="transparent" onClick={() => router.push('/sign-up')}>
            회원가입
          </Button>
        </div>
      )}
    </section>
  )
}
