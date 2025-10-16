'use client'

import Button from '@/components/ui/button/Button'
import { usePetStore } from '@/store/petStore'
import { MoveLeft, MoveRight } from 'lucide-react'
import { useState } from 'react'
import PetProfileCard from './PetProfileCard'

export default function PetProfileCardCarousel() {
  const { petList, setSelectedPetId } = usePetStore()
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrev = () => {
    const nowIndex = currentIndex === 0 ? petList.length - 1 : currentIndex - 1
    setCurrentIndex(nowIndex)
    if (petList[nowIndex]) setSelectedPetId(petList[nowIndex].id)
  }

  const goToNext = () => {
    const nowIndex = currentIndex === petList.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(nowIndex)
    if (petList[nowIndex]) setSelectedPetId(petList[nowIndex].id)
  }

  console.log(petList)
  return (
    <div className="flex w-full flex-row items-center justify-between gap-10">
      <Button
        className="max-w-fit min-w-fit shadow-md"
        variant="transparent"
        onClick={goToPrev}
      >
        <MoveLeft />
      </Button>
      {/* 캐러셀 트랙 */}
      <div className="flex w-full max-w-[720px] items-center justify-center overflow-visible">
        <ul className="relative flex h-[280px] w-full items-center justify-center">
          {petList.map((pet, index) => {
            // 가운데(활성화) 카드와 주변 카드 구분
            const isActive = index === currentIndex
            const offset = index - currentIndex

            return (
              <li
                key={pet.id}
                className={`absolute transition-all duration-500 ease-in-out ${isActive ? 'z-20 scale-100 opacity-100' : 'z-10 scale-90 opacity-50'} `}
                style={{
                  transform: `translateX(${offset * 200}px) scale(${
                    isActive ? 1 : 0.9
                  })`,
                }}
              >
                <PetProfileCard pet={pet} />
              </li>
            )
          })}
        </ul>
      </div>
      <Button
        className="max-w-fit min-w-fit shadow-md"
        variant="transparent"
        onClick={goToNext}
      >
        <MoveRight />
      </Button>
    </div>
  )
}
