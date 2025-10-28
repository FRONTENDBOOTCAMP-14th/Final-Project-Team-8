'use client'

import { MoveLeft, MoveRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react' // useMemo 추가
import Button from '@/components/ui/button/Button'
import { usePetStore } from '@/store/petStore'
import PetProfileCard from './PetProfileCard'

export default function PetProfileCardCarousel() {
  const { petList, setSelectedPetId } = usePetStore()
  const [currentIndex, setCurrentIndex] = useState(0)

  // 1. currentIndex 업데이트 시 setSelectedPetId 호출 로직 통합
  const updateIndex = (newIndex: number) => {
    setCurrentIndex(newIndex)
    // petList[newIndex]가 존재할 때만 setSelectedPetId 호출
    if (petList[newIndex]) {
      setSelectedPetId(petList[newIndex].id)
    }
  }

  const goToPrev = () => {
    // 순환 로직
    const nowIndex = currentIndex === 0 ? petList.length - 1 : currentIndex - 1
    updateIndex(nowIndex)
  }

  const goToNext = () => {
    // 순환 로직
    const nowIndex = currentIndex === petList.length - 1 ? 0 : currentIndex + 1
    updateIndex(nowIndex)
  }

  // 2. 렌더링할 카드 목록을 계산하는 로직
  // 현재 카드, 이전 카드, 다음 카드의 인덱스를 계산합니다.
  const indicesToRender = useMemo(() => {
    if (petList.length === 0) return []

    // 순환 구조를 고려하여 인덱스 계산
    const prevIndex = (currentIndex - 1 + petList.length) % petList.length // -1일 때, 리스트 마지막 인덱스
    const nextIndex = (currentIndex + 1) % petList.length

    // 펫 리스트가 1개 또는 2개일 때 중복을 피하고 모든 카드를 포함하도록 처리
    if (petList.length === 1) return [currentIndex] // 1개일 때
    if (petList.length === 2) return [prevIndex, currentIndex] // 2개일 때 (prev와 current)

    // 3개 이상일 때: 이전, 현재, 다음 카드 인덱스 반환
    return [prevIndex, currentIndex, nextIndex]
  }, [currentIndex, petList.length])

  // 렌더링할 카드 객체 배열
  const cardsToRender = useMemo(() => {
    // 렌더링할 인덱스를 기반으로 petList에서 카드 데이터를 가져옵니다.
    // Set을 사용하여 중복을 제거하고, 순서는 [이전, 현재, 다음]이 되도록 합니다.
    return indicesToRender.map(idx => petList[idx]).filter(Boolean)
  }, [indicesToRender, petList])

  return (
    <div className="flex h-full w-full flex-col gap-10">
      <div className="flex h-full w-full flex-row items-center justify-between gap-10">
        <Button
          className="max-w-fit min-w-fit shadow-md"
          variant="transparent"
          onClick={goToPrev}
          disabled={petList.length <= 1} // 리스트가 비어있을 때 버튼 비활성화
          aria-disabled={petList.length <= 1}
          aria-label="이전 카드"
        >
          <MoveLeft />
        </Button>
        {/* 캐러셀 트랙 */}
        <div className="flex h-full w-full max-w-[720px] items-center justify-center overflow-visible">
          <ul className="relative flex h-full w-full items-center justify-center">
            {/* 3. cardsToRender를 순회하며 렌더링 (핵심 수정) */}
            {cardsToRender.map(pet => {
              if (!pet) return null
              // pet.id를 사용하여 해당 카드의 실제 인덱스를 찾습니다.
              const index = petList.findIndex(p => p.id === pet.id)
              // 가운데(활성화) 카드와 주변 카드 구분
              const isActive = index === currentIndex
              // 4. offset 계산 로직 수정 (핵심 수정)
              // 활성화 카드가 중앙(offset=0)이 되도록 합니다.
              // 이전 카드는 -1, 다음 카드는 +1이 됩니다.
              let offset = 0
              if (index === currentIndex) {
                offset = 0 // 현재 카드
              } else if (
                index ===
                (currentIndex - 1 + petList.length) % petList.length
              ) {
                offset = -1 // 이전 카드
              } else if (index === (currentIndex + 1) % petList.length) {
                offset = 1 // 다음 카드
              }
              // petList의 길이가 2일 경우 offset이 꼬일 수 있으므로, length가 2일 때는 offset을 강제로 조정
              if (petList.length === 2 && !isActive) {
                // 현재 인덱스가 0일 때: index 1(다음)이 1, 현재 인덱스가 1일 때: index 0(이전)이 -1
                offset = index === 0 ? -1 : 1
              }
              // petList의 길이가 1일 경우 offset을 0으로 유지
              if (petList.length === 1) {
                offset = 0
              }
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
                  <Link
                    href={'/pet-profile'}
                    onClick={() => setSelectedPetId(pet.id)}
                  >
                    <PetProfileCard pet={pet} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <Button
          className="max-w-fit min-w-fit shadow-md"
          variant="transparent"
          onClick={goToNext}
          disabled={petList.length <= 1} // 리스트가 비어있거나 하나일 때 버튼 비활성화
          aria-disabled={petList.length <= 1}
          aria-label="다음 카드"
        >
          <MoveRight />
        </Button>
      </div>
      {/* 인디케이터 버튼 섹션 */}
      {petList.length > 0 && (
        <ul className="mt-4 flex justify-center space-x-2">
          {petList.map((_, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => updateIndex(index)} // 클릭 시 해당 인덱스로 이동
                aria-label={`${index + 1}번 카드로 이동`}
                className={`size-3 cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                  index === currentIndex
                    ? 'scale-125 bg-[#FF6000]' // 활성화된 버튼 색상 및 크기
                    : 'bg-gray-300 hover:bg-gray-400' // 비활성화된 버튼 색상
                } `}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
