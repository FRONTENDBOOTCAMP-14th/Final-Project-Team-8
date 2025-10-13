import ModalDetail from '../ModalDetail'

type Props = { isModify: boolean }

export default function ModalTypeWalks({ isModify }: Props) {
  return (
    <ModalDetail
      isModify={isModify}
      fields={[
        {
          key: 'walks',
          label: '다녀온 곳',
          type: 'text',
          tableValue: '음파 호수공원',
          defaultValue: '음파 호수공원',
        },
        {
          key: 'distance',
          label: '산책 거리',
          type: 'text',
          tableValue: '2.5',
          defaultValue: '2.5',
        },
        {
          key: 'duration',
          label: '산책 시간',
          type: 'time',
          tableValue: '00:24',
          defaultValue: '00:24',
        },
      ]}
    />
  )
}
