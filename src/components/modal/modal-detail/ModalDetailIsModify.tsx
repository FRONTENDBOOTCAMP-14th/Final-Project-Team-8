import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { TextareaHTMLAttributes } from 'react'
import type {
  FieldErrors,
  FormState,
  UseFormGetFieldState,
  UseFormRegister,
} from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateActivity } from '@/libs/api/activity.api'
import { usePetStore } from '@/store/petStore'
import { tw } from '@/utils/shared'
import type { AccordionProps } from '../../accordion/accordion'
import ListLoading from '../../accordion/ListLoading'
import Button from '../../ui/button/Button'
import type { ModalInputDataType } from '../ModalType/ModalType'
import type { BaseField, ModalDetailIsModifyProps } from './ModalDetailType'

// ============================================================================
// Types
// ============================================================================

interface ModalDetailIsModifyExtendedProps extends ModalDetailIsModifyProps {
  type: AccordionProps['type']
  id: string
}

// ============================================================================
// Component
// ============================================================================

/**
 * 활동 기록 수정 모달 컴포넌트
 * - 기존 데이터를 폼에 표시
 * - 사용자 입력 검증
 * - Supabase 업데이트 처리
 * - React Query 캐시 무효화
 */
export function ModalDetailIsModify({
  setModify,
  onClose,
  type,
  id,
  title,
  sectionTitle = '상세',
  fields,
  noteLabel = '특이 사항',
  defaultNote = '특이 사항 없음',
  noteTextareaProps,
}: ModalDetailIsModifyExtendedProps) {
  // ========================================================================
  // Hooks
  // ========================================================================

  const { register, handleSubmit, formState, getFieldState, reset } =
    useForm<ModalInputDataType>()

  const { errors, isSubmitting } = formState
  const pet_id = usePetStore(s => s.selectedPetId) as string
  const queryClient = useQueryClient()

  // ========================================================================
  // Mutation
  // ========================================================================

  const mutation = useMutation({
    mutationFn: (payload: ModalInputDataType) =>
      updateActivity(type, id, pet_id, { ...payload }),
    onSuccess: async () => {
      toast.success('업데이트 완료!')
      // React Query 캐시 무효화 (즉시 새 데이터 요청)
      await queryClient.invalidateQueries({
        refetchType: 'active',
        queryKey: ['petTable', type, pet_id],
      })
      reset()
      onClose()
      setModify(false)
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : '업데이트 중 오류가 발생했습니다.'
      toast.error(message)
    },
  })

  // ========================================================================
  // Validations
  // ========================================================================

  if (!pet_id) {
    toast.error('업데이트 할 펫이 지정되지 않았습니다.')
    return null
  }

  if (isSubmitting || mutation.isPending) {
    return <ListLoading />
  }

  // ========================================================================
  // Handlers
  // ========================================================================

  const handleSubmitForm = (data: ModalInputDataType) => {
    mutation.mutate(data)
  }

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/* 제목 입력 */}
      <TitleInput title={title} errors={errors} register={register} />

      {/* 상세 정보 섹션 */}
      <section>
        <h2 className="mt-8 text-[18px] font-bold text-gray-800">
          {sectionTitle}
        </h2>
        <FieldList
          fields={fields}
          formState={formState}
          getFieldState={getFieldState}
          register={register}
        />
      </section>

      {/* 특이 사항 섹션 */}
      <section>
        <h2 className="mt-4 text-[18px] font-bold text-gray-800">
          {noteLabel}
        </h2>
        <NoteTextarea
          noteLabel={noteLabel}
          defaultNote={defaultNote}
          noteTextareaProps={noteTextareaProps}
          register={register}
        />
      </section>

      {/* 액션 버튼 */}
      <ActionButtons
        isLoading={mutation.isPending}
        onCancel={() => setModify(false)}
      />
    </form>
  )
}

// ============================================================================
// Sub Components
// ============================================================================

/**
 * 제목 입력 필드
 */
interface TitleInputProps {
  title: string
  errors: FieldErrors<ModalInputDataType>
  register: UseFormRegister<ModalInputDataType>
}

function TitleInput({ title, errors, register }: TitleInputProps) {
  return (
    <>
      <label htmlFor="title" className="sr-only">
        제목
      </label>
      <input
        id="title"
        type="text"
        defaultValue={title}
        placeholder="제목을 입력해주세요"
        className={tw(
          'mt-3 w-full grow rounded-md border-2 p-2 focus:border-amber-400 focus:outline-none',
          'h-15 pl-3 text-2xl',
          errors.title
            ? 'border-red-400 ring-red-300'
            : 'border-gray-300 ring-blue-300'
        )}
        {...register('title', { required: '제목을 완성해주세요.' })}
      />
      {errors.title && <ErrorMessage message={errors.title.message} />}
    </>
  )
}

/**
 * 필드 리스트 (동적 입력 필드들)
 */
interface FieldListProps {
  fields: BaseField[]
  formState: FormState<ModalInputDataType>
  getFieldState: UseFormGetFieldState<ModalInputDataType>
  register: UseFormRegister<ModalInputDataType>
}

function FieldList({
  fields,
  formState,
  getFieldState,
  register,
}: FieldListProps) {
  return (
    <ul className="flex flex-wrap items-start gap-4">
      {fields.map(f => {
        const { error } = getFieldState(f.key, formState)
        return (
          <li key={f.key} className="mt-3 flex min-w-[220px] flex-1 basis-0">
            {/* 좌측 구분선 */}
            <div className="mr-3 h-[70px] w-[1px] flex-shrink-0 bg-gray-300" />

            <div className="mt-1 flex w-full flex-col">
              <label className="text-base text-gray-700">{f.label}</label>

              <div className="mt-1">
                <input
                  id={`field-${f.key}`}
                  type={f.type}
                  defaultValue={f.defaultValue ?? ''}
                  className={tw(
                    'w-full rounded-md border-2 p-1 focus:border-amber-400 focus:outline-none',
                    error
                      ? 'border-red-400 ring-red-300'
                      : 'border-gray-300 ring-blue-300'
                  )}
                  {...f.inputProps}
                  {...register(f.key, {
                    required: `${f.label}를 완성해주세요.`,
                  })}
                />
                {error && <ErrorMessage message={error.message} />}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * 특이 사항 텍스트에어리어
 */
interface NoteTextareaProps {
  noteLabel: string
  defaultNote: string
  noteTextareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement> | undefined
  register: UseFormRegister<ModalInputDataType>
}

function NoteTextarea({
  noteLabel,
  defaultNote,
  noteTextareaProps,
  register,
}: NoteTextareaProps) {
  return (
    <div className="relative mt-3 mb-5 flex w-full">
      {/* 좌측 구분선 */}
      <span className="absolute left-0 inline-block h-full w-[1px] bg-gray-300" />

      <div className="ml-4 flex min-h-10 w-full items-center">
        <label htmlFor="notes" className="sr-only">
          {noteLabel}
        </label>
        <textarea
          id="notes"
          defaultValue={defaultNote === '-' ? '' : defaultNote}
          className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-amber-400 focus:outline-none"
          rows={2}
          {...noteTextareaProps}
          {...register('notes')}
        />
      </div>
    </div>
  )
}

/**
 * 액션 버튼 (취소/저장)
 */
interface ActionButtonsProps {
  isLoading: boolean
  onCancel: () => void
}

function ActionButtons({ isLoading, onCancel }: ActionButtonsProps) {
  return (
    <div className="flex gap-5">
      <Button type="button" onClick={onCancel} disabled={isLoading}>
        취소
      </Button>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? '저장 중...' : '저장'}
      </Button>
    </div>
  )
}

/**
 * 에러 메시지 표시 컴포넌트
 */
interface ErrorMessageProps {
  message?: string | undefined
}

function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null
  return (
    <div role="alert" className="mt-2 ml-3 text-sm text-red-500">
      {message}
    </div>
  )
}
