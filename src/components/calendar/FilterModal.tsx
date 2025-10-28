'use client'

import { X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import Button from '../ui/button/Button'
import type { ScheduleCategory } from './types'

interface FilterOption {
  value: ScheduleCategory
  label: string
  color: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedFilters: ScheduleCategory[]
  onFilterChange: (filters: ScheduleCategory[]) => void
}

export const FILTER_OPTIONS: FilterOption[] = [
  { value: 'birthday', label: '생일', color: '[#6AA9F3]' },
  { value: 'adoption', label: '입양일', color: '[#A461D8]' },
  { value: 'vaccine', label: '예방접종', color: '[#31AA7A]' },
  { value: 'antiparasitic', label: '구충 치료', color: '[#FF9AD5]' },
  { value: 'medical', label: '의료 처치', color: '[#FFC44A]' },
  { value: 'other treatments', label: '기타 치료', color: '[#FD8C8C]' },
  { value: 'walk', label: '산책', color: '[#82C43C]' },
  { value: 'other activities', label: '기타 활동', color: '[#FF6000]' },
]

export default function FilterModal({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const firstCheckboxRef = useRef<HTMLInputElement>(null)
  const checboxRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // 모달 열기/닫기 제어
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
        // 모달이 열리면 첫 번째 체크박스 포커스
        setTimeout(() => {
          firstCheckboxRef.current?.focus()
        }, 0)
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [isOpen])

  // ESC 키와 backdrop 클릭 처리
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event) => {
      e.preventDefault()
      handleClose()
    }

    const handleClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        handleClose()
      }
    }

    dialog.addEventListener('cancel', handleCancel)
    dialog.addEventListener('click', handleClick)

    return () => {
      dialog.removeEventListener('cancel', handleCancel)
      dialog.removeEventListener('click', handleClick)
    }
  }, [handleClose])

  // 포커스 트랩
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const tabbableElements = dialog.querySelectorAll(
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

    dialog.addEventListener('keydown', handleKeyDown)

    return () => {
      dialog.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // 모두 선택 여부 확인
  const isAllSelected = selectedFilters.length === FILTER_OPTIONS.length

  // 모두 선택/해제 토글
  const handleSelectAll = () => {
    if (isAllSelected) {
      onFilterChange([])
    } else {
      onFilterChange(FILTER_OPTIONS.map(option => option.value))
    }
  }

  // 개별 필터 토글
  const handleToggle = (value: ScheduleCategory) => {
    if (selectedFilters.includes(value)) {
      onFilterChange(selectedFilters.filter(f => f !== value))
    } else {
      onFilterChange([...selectedFilters, value])
    }
  }

  // 키보드 방향키로 카테고리 포커스 이동
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    if (!['ArrowUp', 'ArrowDown'].includes(e.key)) {
      return
    }

    e.preventDefault()

    let nextIndex = currentIndex

    if (e.key === 'ArrowUp') {
      nextIndex =
        (currentIndex - 1 + FILTER_OPTIONS.length + 1) %
        (FILTER_OPTIONS.length + 1)
    } else if (e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % (FILTER_OPTIONS.length + 1)
    }

    checboxRefs.current[nextIndex]?.focus()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-modal
      aria-labelledby="filter-modal-title"
      className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border-0 bg-white p-7.5 shadow-xl backdrop:bg-[#32324D]/30 backdrop:backdrop-blur-[3px]"
    >
      {/* 헤더 */}
      <h2
        id="filter-modal-title"
        className="mb-7.5 text-[26px] font-semibold text-[#3A394F]"
      >
        일정 필터
      </h2>

      {/* 모두 선택 */}
      <div
        className="mb-3 flex cursor-pointer items-center gap-3 rounded-lg p-4 hover:bg-[#F7F7FC] has-[:focus]:outline-2 has-[:focus]:outline-[#FF6000]"
        onClick={handleSelectAll}
      >
        <input
          type="checkbox"
          id="filter-all"
          ref={el => {
            checboxRefs.current[0] = el
            firstCheckboxRef.current = el
          }}
          checked={isAllSelected}
          onChange={handleSelectAll}
          onKeyDown={e => handleKeyDown(e, 0)}
          className="peer sr-only"
        />
        <span
          className="h-5 w-5 rounded-full border border-[#C6C6D9] peer-checked:border-0 peer-checked:bg-[#FC5A5A]"
          aria-hidden="true"
        ></span>
        <label
          htmlFor="filter-all"
          className="flex-1 cursor-pointer font-medium text-[#3A394F]"
          onClick={e => e.preventDefault()}
        >
          모두 선택
        </label>
      </div>

      <hr className="my-4 border-[#DaD9E6]" />

      {/* 필터 옵션 목록 */}
      <ul className="mb-7.5 space-y-3">
        {FILTER_OPTIONS.map((option, index) => {
          const isChecked = selectedFilters.includes(option.value)
          const bgColor = `bg-${option.color}`
          const arrayIndex = index + 1

          return (
            <li
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-[#F7F7FC] focus:bg-[#F7F7FC] has-[:focus]:outline-2 has-[:focus]:outline-[#FF6000]"
              onClick={() => handleToggle(option.value)}
            >
              <input
                type="checkbox"
                id={`filter-${option.value}`}
                ref={el => {
                  checboxRefs.current[arrayIndex] = el
                }}
                checked={isChecked}
                onChange={() => handleToggle(option.value)}
                onKeyDown={e => handleKeyDown(e, arrayIndex)}
                onClick={e => e.stopPropagation()}
                className="peer sr-only"
              />
              <span
                className={`h-5 w-5 rounded-full border border-[#C6C6D9] peer-checked:border-0 ${isChecked && bgColor}`}
                aria-hidden="true"
              ></span>
              <label
                htmlFor={`filter-${option.value}`}
                className="flex-1 cursor-pointer text-[#3A394F]"
                onClick={e => e.preventDefault()}
              >
                {option.label}
              </label>
            </li>
          )
        })}
      </ul>

      {/* 하단 버튼 */}
      <Button variant="orange" onClick={handleClose}>
        적용
      </Button>

      {/* 닫기 버튼 */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="닫기"
        title="닫기"
        className="absolute top-7.5 right-7.5 size-8 cursor-pointer rounded-full border-0 bg-white p-1 text-[#80809A] hover:text-[#3A394F] focus:outline-[#FF6000]"
      >
        <X size={24} />
      </button>
    </dialog>
  )
}
