import ModalDetail from '../ModalDetail'

type Props = { isModify: boolean }

export default function ModalTypeOtherTreatment({ isModify }: Props) {
  return (
    <ModalDetail
      isModify={isModify}
      fields={[
        {
          key: 'content',
          label: '처치 내용',
          type: 'text',
          tableValue: '발바닥에 반창코 붙임',
          defaultValue: '발바닥에 반창코 붙임',
          inputProps: { placeholder: '처치 내용을 입력해주세요' },
        },
        {
          key: 'date',
          label: '처치 날짜',
          type: 'date',
          tableValue: '2023-05-18',
          defaultValue: '2023-05-18',
        },
      ]}
      noteLabel="특이 사항"
      defaultNote="특이 사항 없음"
      noteTextareaProps={{ placeholder: '특이사항을 입력해주요' }}
    />
  )
}
