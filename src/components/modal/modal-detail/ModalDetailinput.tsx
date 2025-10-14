import { tw } from '@/utils/shared'
import { useForm } from 'react-hook-form'
import { useModal } from '../../../store/modalStore'
import Button from '../../ui/button/Button'
import { ModalDetailInpuProps } from './ModalDetailType'

export function ModalDetailInput({
  title,
  fields,
  sectionTitle = '상세',
  noteLabel = '특이 사항',
  defaultNote = '특이 사항 없음',
  noteTextareaProps,
}: ModalDetailInpuProps) {
  /** 🔹 접근성용 고유 ID */

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const offToState = useModal(state => state.offToState)

  return (
    <form onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}>
      <input
        id="title"
        type="text"
        defaultValue={title}
        placeholder="제목을 입력해주세요"
        className="mt-3 mb-8 w-full grow rounded-md border-2 border-gray-300 p-2 focus:border-amber-400 focus:outline-none"
        {...register('title', { required: '필수 입력요소입니다.' })}
      />
      {/* 섹션 타이틀 */}
      <h2 className="text-[18px] font-bold text-gray-800">{sectionTitle}</h2>

      {/* 필드 리스트 */}
      <ul className="flex flex-wrap items-start gap-4">
        {fields.map(f => (
          <li key={f.key} className="mt-3 flex min-w-[220px] flex-1 basis-0">
            {/* 각 컬럼 좌측 세로 구분선 */}
            <div className="mr-3 h-[70px] w-[1px] flex-shrink-0 bg-gray-300" />
            <div className="mt-1 flex w-full flex-col">
              <div className="text-base text-gray-700">{f.label}</div>

              {/* 모드별 렌더링 */}

              <div className="mt-1">
                {/* 입력 컨트롤 */}
                <label htmlFor={f.key} className="sr-only">
                  {f.label} 입력
                </label>
                <input
                  id={f.key}
                  type={f.type}
                  defaultValue={f.defaultValue ?? ''}
                  className={tw(
                    'w-full rounded-md border-2 border-gray-300 p-1 focus:border-amber-400 focus:outline-none',
                    errors.name
                      ? 'border-red-400 ring-red-300'
                      : 'border-gray-300 ring-blue-300'
                  )}
                  {...f.inputProps}
                  {...register(f.key, {
                    required: '필수 입력 요소입니다.',
                  })}
                />
              </div>
            </div>
          </li>
        ))}
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
        <Button onClick={() => offToState('isToggle')}>취소</Button>
        <Button
          onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}
          type="submit"
        >
          저장
        </Button>
      </div>
    </form>
  )
}
