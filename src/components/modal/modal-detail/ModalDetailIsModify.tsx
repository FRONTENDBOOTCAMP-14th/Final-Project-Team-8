import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateActivity } from '../../../libs/api/activity.api'
import { usePetStore } from '../../../store/petStore'
import { tw } from '../../../utils/shared'
import ListLoading from '../../accordion/ListLoading'
import Button from '../../ui/button/Button'
import type { ModalInputDataType } from '../ModalType/ModalType'
import type { ModalDetailIsModifyProps } from './ModalDetailType'

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
}: ModalDetailIsModifyProps) {
  const { register, handleSubmit, formState, getFieldState, reset } =
    useForm<ModalInputDataType>()

  const { errors, isSubmitting } = formState

  const pet_id = usePetStore(s => s.selectedPetId) as string

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload: ModalInputDataType) =>
      updateActivity(type, id, pet_id, payload),
    onSuccess: async () => {
      toast.success('업데이트 완료!')
      await queryClient.invalidateQueries({
        refetchType: 'active',
        queryKey: ['petTable', type, pet_id],
      })
      reset()
      onClose()
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : '업데이트 중 오류가 발생했습니다.'
      toast.error(message)
    },
  })

  if (!pet_id) {
    toast.error('업데이트 할 펫이 지정되지 않았습니다.')
  }

  if (isSubmitting || mutation.isPending) {
    return <ListLoading />
  }

  return (
    <form
      onSubmit={handleSubmit(data => {
        mutation.mutate(data)
      })}
    >
      {/* 섹션 타이틀 */}
      <label htmlFor="title" className="sr-only">
        {title}
      </label>
      <input
        id="title"
        type="text"
        defaultValue={title}
        placeholder="제목을 입력해주세요"
        className={tw(
          'mt-3 w-full grow rounded-md border-2 border-gray-300 p-2 focus:border-amber-400 focus:outline-none',
          'h-15 pl-3 text-2xl',
          errors.title
            ? 'border-red-400 ring-red-300'
            : 'border-gray-300 ring-blue-300'
        )}
        {...register('title', { required: '제목을 완성해주세요.' })}
      />
      {errors.title && (
        <div
          role="alert"
          id="Modal-title-error"
          className="mt-2 ml-3 text-sm text-red-500"
        >
          {errors.title.message}
        </div>
      )}

      {/* 섹션 타이틀 */}
      <h2 className="mt-8 text-[18px] font-bold text-gray-800">
        {sectionTitle}
      </h2>

      {/* 필드 리스트 */}
      <ul className="flex flex-wrap items-start gap-4">
        {fields.map(f => {
          const { error } = getFieldState(f.key, formState)
          return (
            <li key={f.key} className="mt-3 flex min-w-[220px] flex-1 basis-0">
              {/* 각 컬럼 좌측 세로 구분선 */}
              <div className="mr-3 h-[70px] w-[1px] flex-shrink-0 bg-gray-300" />
              <div className="mt-1 flex w-full flex-col">
                <div className="text-base text-gray-700">{f.label}</div>

                {/* 모드별 렌더링 */}

                <div className="mt-1">
                  {/* 입력 컨트롤 */}
                  <label htmlFor={`field-${f.key}`} className="sr-only">
                    {f.label} 입력
                  </label>
                  <input
                    id={`field-${f.key}`}
                    type={f.type}
                    defaultValue={f.defaultValue ?? ''}
                    className={tw(
                      'w-full rounded-md border-2 border-gray-300 p-1 focus:border-amber-400 focus:outline-none',
                      error
                        ? 'border-red-400 ring-red-300'
                        : 'border-gray-300 ring-blue-300'
                    )}
                    {...f.inputProps}
                    {...register(f.key, {
                      required: `${f.key}를 완성해주세요.`,
                    })}
                  />
                  {error && (
                    <div
                      role="alert"
                      id="Modal-title-error"
                      className="mt-2 ml-3 text-sm text-red-500"
                    >
                      {error.message}
                    </div>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {/* 특이 사항 섹션 */}
      <h2 className="mt-4 text-[18px] font-bold text-gray-800">{noteLabel}</h2>

      <div className="relative mt-3 mb-5 flex w-full">
        {/* 왼쪽 세로 구분선 */}
        <span className="absolute left-0 inline-block h-full w-[1px] bg-gray-300" />

        <div className="ml-4 flex min-h-10 w-full items-center">
          <label htmlFor="detail-note" className="sr-only">
            {noteLabel} 입력
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
      <div className="flex gap-5">
        <Button type="button" onClick={() => setModify(false)}>
          취소
        </Button>
        <Button type="submit">저장</Button>
      </div>
    </form>
  )
}
