'use client'

import { useRouter } from 'next/navigation'
import { AddProfileLayout } from '../../../components/add-profile/AddProfileLayout'
import { useProfileCreationStore } from '../../../store/profileCreationStore'

export default function Step4Page() {
  const router = useRouter()
  const { nextStep } = useProfileCreationStore()

  const handleComplete = () => {
    nextStep()
    router.push('/add-profile/step5') // 또는 다음 페이지
  }

  return (
    <AddProfileLayout stepTitle="Step 4" onComplete={handleComplete}>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Step 4 페이지</h2>
        <p className="mt-4 text-gray-600">아직 구현 중입니다</p>
      </div>
    </AddProfileLayout>
  )
}
