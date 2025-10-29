'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CardButton } from '@/components'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
import { NotLogin } from '@/components/ui/status/EmptyState'
import { Loading } from '@/components/ui/status/Loading'
import { usePageStatus } from '@/hooks/usePageStatus'
import { useProfileCreationStore } from '@/store/profileCreationStore'

export default function Step4Page() {
  const router = useRouter()

  const draftPet = useProfileCreationStore(state => state.draftPet)
  const updateDraftPet = useProfileCreationStore(state => state.updateDraftPet)
  const nextStep = useProfileCreationStore(state => state.nextStep)
  const setCurrentStep = useProfileCreationStore(state => state.setCurrentStep)

  const [selectedSize, setSelectedSize] = useState<number | null>(
    draftPet.size ?? null
  )

  const handleComplete = () => {
    if (selectedSize === null) {
      alert('사이즈를 선택해주세요')
      return
    }

    nextStep()
    router.push('/add-profile/step5')
  }

  const handleSkip = () => {
    nextStep()
    router.push('/add-profile/step5')
  }

  const handleSize = (size: number) => {
    setSelectedSize(size)
    updateDraftPet({ size })
  }

  useEffect(() => {
    setCurrentStep(4)
  }, [setCurrentStep])
  const { user, isLoading } = usePageStatus()

  if (isLoading) return <Loading />
  if (!user) return <NotLogin />
  return (
    <AddProfileLayout
      stepTitle="체형"
      onSkip={handleSkip}
      onComplete={handleComplete}
      nextDisabled={selectedSize === null}
    >
      <div className="flex flex-col gap-20">
        <div className="flex w-full justify-center">
          <p className="text-[18px]">우리 아이의 크기는 어떻게 되나요?</p>
        </div>
        <div className="flex max-h-full w-full items-center justify-center gap-5">
          <CardButton
            dogSize="sm"
            isSelected={selectedSize === 0}
            onClick={() => handleSize(0)}
          ></CardButton>
          <CardButton
            dogSize="md"
            isSelected={selectedSize === 1}
            onClick={() => handleSize(1)}
          ></CardButton>
          <CardButton
            dogSize="lg"
            isSelected={selectedSize === 2}
            onClick={() => handleSize(2)}
          ></CardButton>
        </div>
      </div>
    </AddProfileLayout>
  )
}
