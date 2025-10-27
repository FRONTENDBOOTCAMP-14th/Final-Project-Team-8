import React, { useMemo, useState, useCallback } from 'react'
import type { PetSummary } from '../../../store/petStore'

/**
 * Pet 3D Carousel Component
 * ---------------------------------------
 * - Displays pet profiles in a 3D carousel
 * - Shows pet image, name, species, breed, gender, and bio
 * - Keyboard accessible (←/→)
 * - Responsive and animated
 * - Fully styled with Tailwind CSS
 */

export interface PetCarousel3DProps {
  petList: PetSummary[]
  initialIndex?: number
  maxVisibility?: number
  cardSizeRem?: number
  className?: string
  onPetClick?: (pet: PetSummary) => void
}

export function PetCarousel3D({
  petList,
  initialIndex = 0,
  maxVisibility = 3,
  cardSizeRem = 23,
  className,
  onPetClick,
}: PetCarousel3DProps) {
  const [active, setActive] = useState(() => {
    const clamped = Math.min(
      Math.max(0, initialIndex),
      Math.max(0, petList.length - 1)
    )
    return clamped
  })

  const count = petList.length

  const prev = useCallback(() => setActive(i => Math.max(0, i - 1)), [])
  const next = useCallback(
    () => setActive(i => Math.min(count - 1, i + 1)),
    [count]
  )

  const canPrev = active > 0
  const canNext = active < count - 1

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      if (canPrev) prev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      if (canNext) next()
    }
  }

  const handlePetClick = (pet: PetSummary) => {
    if (onPetClick) {
      onPetClick(pet)
    }
  }

  const sizeStyle = useMemo(
    () => ({ width: `${cardSizeRem}rem`, height: `${cardSizeRem}rem` }),
    [cardSizeRem]
  )

  const getGenderEmoji = (gender?: string | null) => {
    if (!gender) return ''
    const lower = gender.toLowerCase()
    if (lower === 'male' || lower === '남') return '♂️'
    if (lower === 'female' || lower === '여') return '♀️'
    return ''
  }

  const getDefaultImage = (species?: string | null) => {
    // 기본 이미지 URL (species에 따라 다른 이미지 사용)
    const lower = species?.toLowerCase() ?? ''
    if (
      lower.includes('dog') ||
      lower.includes('강아지') ||
      lower.includes('개')
    ) {
      return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop'
    }
    if (lower.includes('cat') || lower.includes('고양이')) {
      return 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop'
    }
    // 기본 펫 이미지
    return 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=400&fit=crop'
  }

  if (petList.length === 0) {
    return (
      <div
        className={`flex max-h-full w-full flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-8 ${className ?? ''}`}
      >
        <div className="p-16 text-center text-white">
          <p className="mb-4 text-6xl">🐾</p>
          <h2 className="text-2xl font-semibold opacity-90">
            등록된 반려동물이 없습니다
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br p-8 ${className ?? ''}`}
    >
      <div
        className="relative"
        style={{
          ...sizeStyle,
          perspective: '500px',
          transformStyle: 'preserve-3d',
        }}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Pet profiles carousel"
        onKeyDown={handleKeyDown}
      >
        {canPrev && (
          <button
            className="absolute top-1/2 -left-5 z-10 flex cursor-pointer items-center justify-center border-0 bg-transparent p-1 text-white transition-all duration-200 select-none hover:opacity-80 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white/80"
            style={{ transform: 'translateX(-100%) translateY(-50%)' }}
            aria-label="Previous pet"
            onClick={prev}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        )}

        {petList.map((pet, i) => {
          const abs = Math.abs(active - i)
          const hidden = abs > maxVisibility
          const isActive = i === active
          const style = {
            ['--active' as any]: isActive ? 1 : 0,
            ['--offset' as any]: (active - i) / 3,
            ['--direction' as any]: Math.sign(active - i) || 0,
            ['--abs-offset' as any]: abs / 3,
            transform: `
              rotateY(calc(var(--offset) * 50deg))
              scaleY(calc(1 + var(--abs-offset) * -0.4))
              translateZ(calc(var(--abs-offset) * -30rem))
              translateX(calc(var(--direction) * -5rem))
            `,
            filter: 'blur(calc(var(--abs-offset) * 1rem))',
            pointerEvents: isActive ? ('auto' as const) : ('none' as const),
            opacity: abs >= maxVisibility ? 0 : 1,
            display: hidden ? ('none' as const) : ('block' as const),
          }

          return (
            <div
              key={pet.id}
              className="absolute h-full w-150 transition-all duration-300 ease-out"
              style={style}
              aria-hidden={hidden}
            >
              <article
                className={`flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ease-out ${
                  isActive
                    ? 'cursor-pointer hover:scale-105 hover:shadow-2xl'
                    : ''
                }`}
                style={{
                  backgroundColor: `hsl(280deg, 40%, ${100 - (abs / 3) * 50}%)`,
                }}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => isActive && handlePetClick(pet)}
              >
                <div className="h-[50%] w-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
                  <img
                    src={pet.profileImg ?? '/assets/img/noPets2.svg'}
                    alt={`${pet.name}의 프로필 사진`}
                    className={`h-full w-full object-cover transition-transform duration-300 ${
                      isActive ? 'hover:scale-110' : ''
                    }`}
                    onError={e => {
                      const target = e.target as HTMLImageElement
                      target.src = getDefaultImage(pet.species)
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h2
                    className="text-center text-3xl font-extrabold text-gray-800 transition-opacity duration-300"
                    style={{ opacity: 'var(--active)' }}
                  >
                    {pet.name} {getGenderEmoji(pet.gender)}
                  </h2>
                  <div
                    className="flex flex-wrap justify-center gap-2 transition-opacity duration-300"
                    style={{ opacity: 'var(--active)' }}
                  >
                    {pet.species && (
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold whitespace-nowrap text-purple-700">
                        {pet.species}
                      </span>
                    )}
                    {pet.breed && (
                      <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold whitespace-nowrap text-pink-700">
                        {pet.breed}
                      </span>
                    )}
                  </div>
                  {pet.bio && (
                    <p
                      className="line-clamp-3 text-center text-sm leading-relaxed text-gray-600 transition-opacity duration-300"
                      style={{ opacity: 'var(--active)' }}
                    >
                      {pet.bio}
                    </p>
                  )}
                </div>
              </article>
            </div>
          )
        })}

        {canNext && (
          <button
            className="absolute top-1/2 right-0 z-10 flex cursor-pointer items-center justify-center border-0 bg-transparent p-1 text-white transition-all duration-200 select-none hover:opacity-80 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white/80"
            style={{ transform: 'translateX(100%) translateY(-50%)' }}
            aria-label="Next pet"
            onClick={next}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 p-2">
        {petList.map((pet, i) => (
          <button
            key={pet.id}
            className={`h-3 cursor-pointer rounded-full border-0 p-0 transition-all duration-300 ${
              i === active
                ? 'w-8 bg-white'
                : 'w-3 bg-white/40 hover:scale-110 hover:bg-white/60'
            }`}
            onClick={() => setActive(i)}
            aria-label={`${pet.name} 보기`}
          />
        ))}
      </div>
    </div>
  )
}

export default PetCarousel3D
