import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import PetAvatar from '@/components/ui/avatar/PetAvartar'
import IconButton from '@/components/ui/button/IconButton'
import { useUserStore } from '@/store/userStore'
import Button from '../button/Button'

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
  const router = useRouter()
  const user = useUserStore<User | null>(s => s.user)
  return (
    <>
      {user ? (
        <ul className="flex flex-row flex-nowrap gap-4 overflow-x-auto p-1">
          {pets.map(pet => (
            <li key={pet.id}>
              <PetAvatar
                pet={pet}
                selected={selectedId === pet.id}
                onClick={() => onSelect(pet.id)}
              />
            </li>
          ))}
          <li>
            <IconButton onClick={() => onSelect(null)} />
          </li>
        </ul>
      ) : (
        <div role="group" className="flex w-full flex-col gap-2">
          <Button variant="white" onClick={() => router.push('/login')}>
            로그인
          </Button>
          <Button variant="transparent" onClick={() => router.push('/sign-up')}>
            회원가입
          </Button>
        </div>
      )}
    </>
  )
}
