// ============================================================================
// Types
// ============================================================================

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteActivity } from '@/libs/api/activity.api'
import { useScheduleStore } from '@/store/scheduleStore'
import Button from '../../../ui/button/Button'
import type { AccordionProps } from '../../accordion'

interface DeleteConfirmModalProps {
  /** 삭제할 아이템 제목 */
  title: string | null
  /**  해당 테이블 UUID*/
  id: string
  /** pet UUID */
  pet_id: string
  /** 삭제 타입 (테이블명) */
  type: AccordionProps['type']
  /** 삭제 확인 콜백 함수 */
  // onConfirm: () => void
  /** 취소 콜백 함수 */
  onCancel: () => void
  /** 로딩 상태 */
  isLoading?: boolean
}

// ============================================================================
// Component
// ============================================================================

/**
 * 삭제 확인 모달 컴포넌트
 * - 삭제할 아이템 정보 표시
 * - 취소/확인 버튼 제공
 * - 로딩 상태 표시
 */
export default function DeleteConfirmModal({
  title,
  type,
  id,
  pet_id,
  // onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmModalProps) {
  const queryClient = useQueryClient()

  /**
   * 삭제 뮤테이션
   * - 서버에서 데이터 삭제
   * - 삭제 성공 시 React Query 캐시 무효화
   * - UI가 자동으로 갱신됨
   */
  const deleteMutation = useMutation({
    mutationFn: () => deleteActivity(type, id, pet_id),
    onSuccess: () => {
      toast.success('삭제되었습니다.')
      // React Query 캐시 무효화 (데이터 자동 재조회)
      queryClient.invalidateQueries({
        queryKey: ['petTable', type, pet_id],
      })

      // 캘린더 갱신
      const { refetchSchedules } = useScheduleStore.getState()
      refetchSchedules(pet_id)
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.'
      toast.error(message)
    },
  })

  return (
    <div className="flex flex-col gap-4 p-5">
      {/* 제목 */}
      <h2 className="text-center text-2xl font-bold text-gray-800">
        정말 삭제하시겠습니까?
      </h2>

      {/* 삭제 정보 */}
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">제목:</span> {title ?? '알 수 없음'}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">분류:</span> {type.toUpperCase()}
        </p>
      </div>

      {/* 경고 메시지 */}
      <div className="flex items-start gap-2 rounded-lg border-l-4 border-red-400 bg-red-50 p-3">
        <span className="text-lg font-bold text-red-600">⚠</span>
        <p className="text-sm text-red-700">
          이 작업은 되돌릴 수 없습니다. 삭제된 데이터는 복구되지 않습니다.
        </p>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          취소
        </Button>
        <Button
          type="button"
          onClick={() => {
            deleteMutation.mutate()
          }}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? '삭제 중...' : '삭제'}
        </Button>
      </div>
    </div>
  )
}
