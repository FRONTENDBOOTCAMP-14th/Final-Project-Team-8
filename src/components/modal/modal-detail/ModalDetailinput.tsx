'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, useFormState } from 'react-hook-form'
import { toast } from 'sonner'
import createActivity from '@/libs/api/activity.api'
import { usePetStore } from '@/store/petStore'
import { tw } from '@/utils/shared'
import ListLoading from '../../accordion/ListLoading'
import Button from '../../ui/button/Button'
import type { ModalInputDataType } from '../ModalType/ModalType'
import type { ModalDetailInpuProps } from './ModalDetailType'

export function ModalDetailInput({
  type,
  title,
  fields,
  sectionTitle = '상세',
  noteLabel = '특이 사항',
  defaultNote = '특이 사항 없음',
  noteTextareaProps,
  onClose,
}: ModalDetailInpuProps) {
  const { register, handleSubmit, formState, getFieldState, reset } =
    useForm<ModalInputDataType>({
      mode: 'onSubmit',
      defaultValues: {
        title: title ?? '',
        notes: defaultNote === '-' ? '' : defaultNote,
      },
    })

  const { errors, isSubmitting } = formState

  const pet_id = usePetStore(s => s.selectedPetId) as string
  const queryClient = useQueryClient()

  // createActivity는 실패 시 throw하도록 구현해두면 깔끔해요.
  const mutation = useMutation({
    mutationFn: (payload: ModalInputDataType) =>
      createActivity({ setData: payload, type, pet_id }),
    onSuccess: () => {
      toast.success('저장 완료!')
      reset()
      onClose?.()
      queryClient.invalidateQueries({ queryKey: ['activities', pet_id] })
    },
    onError: (err: unknown) => {
      // 서버에서 필드 에러 내주면 여기 매핑
      const message =
        err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.'
      toast.error(message)
    },
  })

  if (!pet_id) {
    toast.error('해당 펫은 유효하지 않습니다. 펫을 다시 선택해주세요.')
  }

  if (isSubmitting || mutation.isPending) {
    return <ListLoading />
  }

  return (
    <form
      onSubmit={handleSubmit(setData => {
        mutation.mutate(setData)
      })}
    >
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
        {...register('title', { required: '필수 입력요소입니다.' })}
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
        {fields.map(
          ({
            requiredSet,
            key,
            label,
            type,
            defaultValue,
            inputProps,
            min,
            max,
          }) => {
            const { error } = getFieldState(key, formState)
            // const error = get(errors, key)
            return (
              <li key={key} className="mt-3 flex min-w-[220px] flex-1 basis-0">
                {/* 각 컬럼 좌측 세로 구분선 */}
                <div className="mr-3 h-[80px] w-[1px] flex-shrink-0 bg-gray-300" />
                <div className="mt-1 flex w-full flex-col">
                  <div className="text-base text-gray-700">{label}</div>

                  {/* 모드별 렌더링 */}

                  <div className="mt-1">
                    {/* 입력 컨트롤 */}
                    <label htmlFor={key} className="sr-only">
                      {label} 입력
                    </label>
                    <input
                      id={key}
                      type={type}
                      defaultValue={defaultValue ?? ''}
                      className={tw(
                        'w-full rounded-md border-2 border-gray-300 p-1 focus:border-amber-400 focus:outline-none',
                        'h-10 pl-3 text-lg',
                        error
                          ? 'border-red-400 ring-red-300'
                          : 'border-gray-300 ring-blue-300'
                      )}
                      {...register(key, {
                        required: requiredSet ?? false,
                        ...(type === 'number'
                          ? { valueAsNumber: true, min, max }
                          : {}),
                      })}
                      {...(type === 'number' ? { min, max } : {})}
                      {...inputProps}
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
          }
        )}
      </ul>

      {/* 특이 사항 섹션 */}
      <h2 className="mt-4 text-[18px] font-bold text-gray-800">{noteLabel}</h2>

      <div className="relative mt-3 mb-3 flex w-full">
        {/* 왼쪽 세로 구분선 */}
        <span className="absolute left-0 inline-block h-full w-[1px] bg-gray-300" />

        <div className="ml-4 w-full">
          <label htmlFor="detail-note" className="sr-only">
            {noteLabel} 입력
          </label>
          <textarea
            id="notes"
            defaultValue={defaultNote === '-' ? '' : defaultNote}
            className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-amber-400 focus:outline-none"
            rows={3}
            {...noteTextareaProps}
            {...register('notes')}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <Button onClick={onClose}>취소</Button>
        <Button type="submit">저장</Button>
      </div>
    </form>
  )
}
