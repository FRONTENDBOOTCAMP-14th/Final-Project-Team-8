import ModalDetail from '../ModalDetail'

type Props = { isModify: boolean }

export default function ModalTypeVaccination({ isModify }: Props) {
  return (
    <ModalDetail
      isModify={isModify}
      fields={[
        {
          key: 'lot',
          label: 'Lot(제조번호)',
          type: 'text',
          tableValue: 'A583D01',
          defaultValue: 'A583D01',
          inputProps: { placeholder: 'Lot(제조 번호)를 입력해주세요' },
        },
        {
          key: 'injectedAt',
          label: '접종 날짜',
          type: 'date',
          tableValue: '2023-05-18',
          defaultValue: '2023-05-18',
        },
        {
          key: 'expiredAt',
          label: '유효 기간',
          type: 'date',
          tableValue: '2023-05-18',
          defaultValue: '2023-05-18',
        },
      ]}
      noteLabel="특이 사항"
      defaultNote="특이 사항 없음"
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
