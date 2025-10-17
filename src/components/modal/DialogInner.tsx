import { X } from 'lucide-react'
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { Toaster } from 'sonner'
import Button from '@/components/ui/button/Button'

type DialogInnerProps = PropsWithChildren<{
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  close: () => void
  describe?: string | undefined
  describeId: string
  buttonNone: boolean
}>

export function DialogInner({
  isModify,
  setModify,
  close,
  describe,
  describeId,
  children,
  buttonNone,
}: DialogInnerProps) {
  return (
    <>
      {/* 🔸 토스트 (핑크톤 스타일) */}
      <Toaster
        theme="light"
        position="top-center"
        toastOptions={{
          style: {
            backgroundColor: '#ffe6eb', // 은은한 핑크 배경
            color: '#c81e4b', // 부드러운 라즈베리 텍스트
            border: '1px solid #f9b6c2', // 연한 경계선
            fontWeight: 600,
            borderRadius: '10px',
            padding: '12px 18px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            fontSize: '16px',
          },
        }}
      />

      {/* 🔸 모달 콘텐츠 영역 */}
      <div className="flex min-h-55 w-170 flex-col p-[30px]">
        {/* 🔹 헤더 영역 (제목 + 닫기 버튼) */}
        <div className="flex justify-end gap-6">
          {/* 🔹 닫기 버튼 (수정 중엔 비활성화) */}
          <button
            type="button"
            aria-label="다이얼로그 닫기"
            title="다이얼로그 닫기"
            disabled={isModify}
            onClick={close}
            className="cursor-pointer rounded-full text-gray-600 transition focus:outline-orange-400 active:scale-[0.95] disabled:cursor-not-allowed disabled:text-gray-300"
          >
            <X width={20} height={20} />
          </button>
        </div>

        {/* 🔹 설명문 (선택적) */}
        {describe && <div id={describeId}>{describe}</div>}

        {/* 🔹 모달 본문 (children 삽입) */}
        {children}

        {/* 🔹 수정/완료 버튼 */}
        {!buttonNone && (
          <Button onClick={() => setModify(prev => !prev)}>
            {!isModify ? '수정' : '완료'}
          </Button>
        )}
      </div>
    </>
  )
}
