import ModalDetail from '../ModalDetail'

type Props = { isModify: boolean }

export default function ModalTypeMedicalTreatment({ isModify }: Props) {
  return (
    <ModalDetail
      isModify={isModify}
      fields={[
        {
          key: 'item',
          label: '항목',
          type: 'text',
          tableValue: '피 검사',
          defaultValue: '피 검사',
          inputProps: { placeholder: '항목을 입력해주세요' },
        },
        {
          key: 'visitedAt',
          label: '방문 날짜',
          type: 'date',
          tableValue: '2018-05-23',
          defaultValue: '2018-05-23',
        },
        {
          key: 'nextVisitAt',
          label: '다음 진료',
          type: 'date',
          tableValue: '2018-05-23',
          defaultValue: '2018-05-23',
        },
      ]}
      noteLabel="특이 사항"
      defaultNote="특이 사항 없음"
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
