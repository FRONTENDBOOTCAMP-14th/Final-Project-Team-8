import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import PetProfileLayout from '@/components/pet-profile/PetProfileLayout'

export const metadata: Metadata = {
  title: '반려동물 프로필 - PAW BUDDY',
}

export default function Layout({ children }: PropsWithChildren) {
  return <PetProfileLayout>{children}</PetProfileLayout>
}
