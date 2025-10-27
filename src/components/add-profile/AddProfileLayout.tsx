import { useRouter } from 'next/navigation'
import { useCallback, useEffect, type ReactNode } from 'react'
import { useProfileCreationStore } from '../../store/profileCreationStore'
import ProgressBar from './ProgressBar'

interface AddProfileLayoutProps {
  children: ReactNode
  stepTitle: string
  onSkip?: () => void
  onComplete?: () => void
  nextDisabled?: boolean
  skipDisabled?: boolean
}

/**
 * AddProfileLayout 컴포넌트
 *
 * 반려동물 프로필 생성 단계 페이지의 공통 레이아웃을 제공합니다.
 * Header에는 뒤로가기 버튼, 단계 정보, ProgressBar가 포함되며,
 * Footer에는 '건너뛰기'와 '입력 완료' 버튼이 포함됩니다.
 *
 * @param {ReactNode} children - 각 단계 페이지의 컨텐츠
 * @param {string} stepTitle - 현재 단계 제목
 * @param {() => void} [onSkip] - 건너뛰기 버튼 클릭 시 호출되는 콜백
 * @param {() => void} [onComplete] - 입력 완료 버튼 클릭 시 호출되는 콜백
 * @param {boolean} [nextDisabled=false] - 입력 완료 버튼 비활성화 여부
 */
export function AddProfileLayout({
  children,
  stepTitle,
  onSkip,
  onComplete,
  nextDisabled = false,
  skipDisabled = false,
}: AddProfileLayoutProps) {
  const router = useRouter()
  const { currentStep, previousStep } = useProfileCreationStore()

  // 뒤로가기 버튼 핸들러
  const handleBack = useCallback(() => {
    previousStep()

    // currentStep이 업데이트 되기 전 값을 사용하므로 -1
    const prevStep = currentStep - 1

    if (prevStep >= 1) {
      router.push(`/add-profile/step${prevStep}`)
    } else {
      // Step 1 이전이면 홈으로
      router.push('/dashboard')
    }
  }, [currentStep, previousStep, router])

  // ESC 키로 뒤로가기 (키보드 접근성 강화)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleBack()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [handleBack])

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <header className="mb-6 flex-shrink-0">
        {/* Back button, Title, and Step counter */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            aria-label="이전 단계로 돌아가기"
            title="이전 단계로 돌아가기 (ESC)"
            className="cursor-pointer rounded text-gray-600 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.16699 10H15.8337M4.16699 10L9.16699 15M4.16699 10L9.16699 5"
                stroke="#80809A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-gray-900">
              반려동물 프로필 만들기
            </h1>
            <h2 className="text-base text-gray-600">{stepTitle}</h2>
          </div>
          <div
            className="text-right text-sm text-gray-500"
            role="status"
            aria-label={`6단계 중 ${currentStep}단계`}
          >
            <div className="text-xs" aria-hidden="true">
              단계
            </div>
            <div className="font-semibold" aria-hidden="true">
              <span className="text-[#484280]">{currentStep}</span>
              <span className="text-gray-400"> / 6</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={6} />
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto" role="main">
        <div className="h-full w-full">{children}</div>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky mt-8 flex-shrink-0">
        <div className="flex justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-md">
          <div
            id="footer-description"
            className="flex items-center text-gray-500"
          >
            다음 단계로 넘어갈까요?
          </div>

          <div
            className="flex items-center gap-3"
            role="group"
            aria-labelledby="footer-description"
          >
            {onSkip && (
              <button
                onClick={onSkip}
                disabled={skipDisabled}
                aria-disabled={skipDisabled}
                className={`rounded-xl px-6 py-3 font-medium transition-colors focus:outline-none ${
                  skipDisabled
                    ? 'cursor-not-allowed bg-gray-300 text-white'
                    : 'border-1 border-orange-400 text-[#FF6000] hover:bg-[#FF6000] hover:text-white focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2'
                }`}
                {...(skipDisabled && {
                  'aria-label': '이 단계는 필수 입력 사항입니다',
                })}
              >
                지금은 건너뛰기
              </button>
            )}

            {onComplete && (
              <button
                onClick={onComplete}
                disabled={nextDisabled}
                aria-disabled={nextDisabled}
                className="rounded-xl bg-[#FF6000] px-24 py-3 font-semibold text-white transition-colors hover:bg-orange-600 focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
                {...(nextDisabled && {
                  'aria-label':
                    '필수 정보를 입력한 후 다음 단계로 진행할 수 있습니다',
                })}
              >
                입력 완료
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
