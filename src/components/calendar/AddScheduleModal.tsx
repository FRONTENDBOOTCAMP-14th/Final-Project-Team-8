'use client'

import {
  ArrowLeft,
  Footprints,
  Pill,
  Stethoscope,
  Syringe,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { tabbableSelector } from '@/utils/client'
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
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    value: 'vaccine',
    label: '예방접종',
    Icon: Syringe,
    color: 'text-[#31AA7A]',
    bgColor: 'bg-[#31AA7A]',
  },
  {
    value: 'antiparasitic',
    label: '구충 치료',
    Icon: Pill,
    color: 'text-[#FF9AD5]',
    bgColor: 'bg-[#FF9AD5]',
  },
  {
    value: 'medical',
    label: '의료 처치',
    Icon: Stethoscope,
    color: 'text-[#FFC44A]',
    bgColor: 'bg-[#FFC44A]',
  },
  {
    value: 'other treatments',
    label: '기타 치료',
    Icon: Stethoscope,
    color: 'text-[#FD8C8C]',
    bgColor: 'bg-[#FD8C8C]',
  },
  {
    value: 'walk',
    label: '산책',
    Icon: Footprints,
    color: 'text-[#82C43C]',
    bgColor: 'bg-[#82C43C]',
  },
  {
    value: 'other activities',
    label: '기타 활동',
    Icon: Stethoscope,
    color: 'text-[#FF6000]',
    bgColor: 'bg-[#FF6000]',
  },
]

export default function AddScheduleModal({ isOpen, onClose, petId }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const firstCategoryButtonRef = useRef<HTMLButtonElement>(null)
  const [selectedCategory, setSelectedCategory] =
    useState<ScheduleCategory | null>(null)

  // 모달 열기/닫기 제어
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
        // 모달이 열리면 첫 번째 카테고리 버튼에 포커싱
        setTimeout(() => {
          if (!selectedCategory) {
            firstCategoryButtonRef.current?.focus()
          }
        }, 0)
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
      // 모달이 닫히면 선택된 카테고리 초기화
      setSelectedCategory(null)
    }
  }, [isOpen, selectedCategory])

  // 캍고리가 변경되면 첫 번째 카테고리 버튼에 포커스(뒤로가기 눌렀을 때)
  useEffect(() => {
    if (isOpen && !selectedCategory) {
      setTimeout(() => {
        firstCategoryButtonRef.current?.focus()
      }, 0)
    }
  }, [selectedCategory, isOpen])

  // ESC 키와 backdrop 클릭 처리
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event) => {
      e.preventDefault()
      handleClose()
    }

    const handleClick = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect()
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width

      if (!isInDialog) {
        handleClose()
      }
    }

    dialog.addEventListener('cancel', handleCancel)
    dialog.addEventListener('click', handleClick)

    return () => {
      dialog.removeEventListener('cancel', handleCancel)
      dialog.removeEventListener('click', handleClick)
    }
  })

  // 포커스 트랩
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const tabbableElements = dialog.querySelectorAll(tabbableSelector)

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

    dialog.addEventListener('keydown', handleKeyDown)

    return () => {
      dialog.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, selectedCategory])

  const handleClose = () => {
    setSelectedCategory(null)
    onClose()
  }

  const handleBack = () => {
    setSelectedCategory(null)
  }

  const handleSuccess = () => {
    handleClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-modal
      aria-labelledby="add-schedule-modal-title"
      className="fixed top-1/2 left-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border-0 bg-white p-7.5 shadow-xl backdrop:bg-[#32324D]/30 backdrop:blur-xl"
    >
      {/* 헤더 */}
      <div className="mb-2 flex items-center">
        {selectedCategory && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로 가기"
            className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border-0 bg-transparent p-1 text-[#80809A] hover:text-[#3A394F]"
          >
            <ArrowLeft className="h-full w-full" />
          </button>
        )}

        <h2
          id="add-schedule-modal-title"
          className="flex-1 text-[26px] font-semibold text-[#3A394F]"
        >
          {selectedCategory
            ? `${
                CATEGORY_OPTIONS.find(opt => opt.value === selectedCategory)
                  ?.label
              } 추가`
            : '일정 추가'}
        </h2>

        <button
          type="button"
          onClick={handleClose}
          aria-label="닫기"
          className="flex h-8 w-8 items-center justify-center rounded-full border-0 bg-transparent p-1 text-[#80809A] hover:text-[#3A394F]"
        >
          <X className="h-full w-full" />
        </button>
      </div>

      {/* 컨텐츠 */}
      {!selectedCategory ? (
        // 카테고리 선택 화면
        <div>
          <p className="mb-5 text-sm text-[#80809A]">어떤 일정을 추가할까요?</p>
          <ul className="grid grid-cols-4 gap-3">
            {CATEGORY_OPTIONS.map(option => {
              const { Icon } = option
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(option.value)}
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
      ) : (
        // 선택된 카테고리의 폼 표시
        <div className="h-30"></div>
      )}
    </dialog>
  )
}
