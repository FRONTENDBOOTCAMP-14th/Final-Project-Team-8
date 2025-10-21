'use client'

import { Footprints, Pill, Stethoscope, Syringe, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { AccordionProps } from '../accordion/accordion'
import ModalHost from '../modal/ModalHost'
import type { ScheduleCategory } from './types'

interface Props {
  isOpen: boolean
  onClose: () => void
  petId: string
}

interface CategoryOption {
  value: ScheduleCategory
  label: string
  Icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  apiType: AccordionProps['type']
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    value: 'vaccine',
    label: '예방접종',
    Icon: Syringe,
    color: 'text-[#31AA7A]',
    bgColor: 'bg-[#31AA7A]',
    apiType: 'vaccines',
  },
  {
    value: 'antiparasitic',
    label: '구충 치료',
    Icon: Pill,
    color: 'text-[#FF9AD5]',
    bgColor: 'bg-[#FF9AD5]',
    apiType: 'antiparasitic',
  },
  {
    value: 'medical',
    label: '의료 처치',
    Icon: Stethoscope,
    color: 'text-[#FFC44A]',
    bgColor: 'bg-[#FFC44A]',
    apiType: 'medical treatment',
  },
  {
    value: 'other treatments',
    label: '기타 치료',
    Icon: Stethoscope,
    color: 'text-[#FD8C8C]',
    bgColor: 'bg-[#FD8C8C]',
    apiType: 'other treatments',
  },
  {
    value: 'walk',
    label: '산책',
    Icon: Footprints,
    color: 'text-[#82C43C]',
    bgColor: 'bg-[#82C43C]',
    apiType: 'walks',
  },
  {
    value: 'other activities',
    label: '기타 활동',
    Icon: Stethoscope,
    color: 'text-[#FF6000]',
    bgColor: 'bg-[#FF6000]',
    apiType: 'other activities',
  },
]

const GRID_COLUMNS = 4

export default function AddScheduleModal({ isOpen, onClose, petId }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)
  const firstCategoryButtonRef = useRef<HTMLButtonElement>(null)
  const categoryButtonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [selectedApiType, setSelectedApiType] =
    useState<AccordionProps['type']>('vaccines')
  const [modalHostOpen, { on, off }] = useToggleState(false)

  const handleClose = useCallback(() => {
    off()
    onClose()
  }, [off, onClose])

  // 모달 열릴 때 포커스
  useEffect(() => {
    if (isOpen && !selectedApiType) {
      setTimeout(() => {
        firstCategoryButtonRef.current?.focus()
      }, 0)
    }
  }, [isOpen, selectedApiType])

  // ESC 키 처리
  useEffect(() => {
    if (!isOpen || selectedApiType) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, selectedApiType, handleClose])

  // 포커스 트랩
  useEffect(() => {
    if (!isOpen || selectedApiType) return

    const modal = modalRef.current
    if (!modal) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const tabbableElements = modal.querySelectorAll(
        'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]'
      )

      if (tabbableElements.length === 0) return

      const firstElement = tabbableElements[0] as HTMLElement
      const lastElement = tabbableElements[
        tabbableElements.length - 1
      ] as HTMLElement

      if (e.shiftKey) {
        // Shift + Tab(역방향)
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab(정방향)
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modal.addEventListener('keydown', handleKeyDown)
    return () => modal.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedApiType])

  // 카테고리 선택 핸들러(Enter/Space 처리)
  const handleCategorySelect = (apiType: AccordionProps['type']) => {
    setSelectedApiType(apiType)
    on()
  }

  const handleFormModalClose = () => {
    off()
    handleClose()
  }

  // backdrop 클릭 처리
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  // 키보드 방향키로 카테고리 포커스 이동
  const handleArrowKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      return
    }

    e.preventDefault()

    let nextIndex = currentIndex

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % CATEGORY_OPTIONS.length
        break
      case 'ArrowLeft':
        nextIndex =
          (currentIndex - 1 + CATEGORY_OPTIONS.length) % CATEGORY_OPTIONS.length
        break
      case 'ArrowUp':
        nextIndex = currentIndex - GRID_COLUMNS
        if (nextIndex < 0) {
          const column = currentIndex % GRID_COLUMNS
          const lastRowStartIndex =
            Math.floor((CATEGORY_OPTIONS.length - 1) / GRID_COLUMNS) *
            GRID_COLUMNS
          nextIndex = lastRowStartIndex + column
          if (nextIndex >= CATEGORY_OPTIONS.length) {
            nextIndex = nextIndex - GRID_COLUMNS
          }
        }
        break
      case 'ArrowDown':
        nextIndex = currentIndex + GRID_COLUMNS
        if (nextIndex >= CATEGORY_OPTIONS.length) {
          nextIndex = currentIndex % GRID_COLUMNS
        }
        break
    }

    categoryButtonRefs.current[nextIndex]?.focus()
  }

  if (!isOpen) return null

  return (
    <>
      {/* backdrop + 카테고리 선택 모달 */}
      <div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#32324D]/30 backdrop-blur-[3px]"
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-schedule-modal-title"
          className="relative w-full max-w-xl rounded-2xl bg-white p-7.5 shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          {/* 헤더 */}
          <h2
            id="add-schedule-modal-title"
            className="mb-2 w-full text-[26px] font-semibold text-[#3A394F]"
          >
            일정 추가
          </h2>

          {/* 콘텐츠 */}
          <div>
            <p className="mb-5 text-sm text-[#80809A]">
              어떤 일정을 추가할까요?
            </p>
            <ul className={'grid grid-cols-4 gap-3'}>
              {CATEGORY_OPTIONS.map((option, index) => {
                const { Icon } = option
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      ref={el => {
                        categoryButtonRefs.current[index] = el
                        if (index === 0) {
                          firstCategoryButtonRef.current = el
                        }
                      }}
                      onClick={() => handleCategorySelect(option.apiType)}
                      onKeyDown={e => handleArrowKeyDown(e, index)}
                      className="flex h-28 w-full flex-col items-center justify-center gap-3 rounded-xl border border-[#DAD9E6] bg-white hover:border-[#FF6000] hover:bg-[#FFF5F0] focus:border-[#FF6000] focus:outline-2 focus:outline-[#FF6000]"
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${option.bgColor}`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </span>
                      <span className="font-medium text-[#3A394F]">
                        {option.label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="닫기"
            className="absolute top-7.5 right-7.5 h-8 w-8 rounded-full border-0 bg-transparent p-1 text-[#80809A] hover:text-[#3A394F] focus:outline-[#FF6000]"
          >
            <X className="h-full w-full" />
          </button>
        </div>
      </div>

      {/* 일정 추가 폼 모달(ModalHost 사용) */}
      <ModalHost
        open={modalHostOpen}
        onClose={handleFormModalClose}
        type={selectedApiType}
        petId={petId}
      />
    </>
  )
}
