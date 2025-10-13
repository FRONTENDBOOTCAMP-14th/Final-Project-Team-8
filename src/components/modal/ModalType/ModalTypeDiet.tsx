import ModalDetail from '../ModalDetail'

type Props = { isModify: boolean }

export function ModalTypeDite({ isModify }: Props) {
  return (
    <ModalDetail
      isModify={isModify}
      fields={[
        {
          key: 'snack',
          label: '간식 종류',
          type: 'text',
          tableValue: '강아지 사료',
          defaultValue: '강아지 껌',
          inputProps: { placeholder: '간식 이름을 작성해주세요' },
        },
        {
          key: 'date',
          label: '배급 날짜',
          type: 'date',
          tableValue: '2023-05-18',
          defaultValue: '2023-05-18',
        },
        {
          key: 'time',
          label: '배급 시간',
          type: 'time',
          tableValue: '14:23',
          defaultValue: '14:23',
          inputProps: { step: 60 },
        },
      ]}
      noteLabel="특이 사항"
      defaultNote="특이 사항 없음으으으으음"
      noteTextareaProps={{ placeholder: '특이 사항을 입력해주세요' }}
    />
  )
}
