// import { useModal } from '@/store/modalStore'
// import Modal from '../modal/Modal'
// import { ModalTypeAntiparasiticInput } from '../modal/ModalType/ModalTypeAntiparasitic'
// import { ModalTypeDietInput } from '../modal/ModalType/ModalTypeDiet'
// import { ModalTypeMedicalTreatmentInput } from '../modal/ModalType/ModalTypeMedical'
// import { ModalTypeOtherActivitesInput } from '../modal/ModalType/ModalTypeOtherActivites'
// import { ModalTypeOtherTreatmentInput } from '../modal/ModalType/ModalTypeOtherTreatment'
// import { ModalTypeVaccinationInput } from '../modal/ModalType/ModalTypeVaccination'
// import { ModalTypeWalksInput } from '../modal/ModalType/ModalTypeWalks'
// import { AccordionProps } from './accordion'

// interface NewListitemAddProps {
//   type: AccordionProps['type']
// }

// export default function NewListitemAdd({ type }: NewListitemAddProps) {
//   const offToState = useModal(state => state.offToState)
//   const isToggle = useModal(state => state.isToggle)

//   // 각 리스트 컴포넌트가 기대하는 정확한 타입으로 캐스팅
//   const selectInputModalType = () => {
//     switch (type) {
//       case 'antiparasitic':
//         return (
//           <ModalTypeAntiparasiticInput
//             restProps={{
//               id: '',
//               intake_date: '',
//               next_date: null,
//               notes: null,
//               pet_id: '',
//               title: '',
//             }}
//           />
//         )
//       case 'diet':
//         return (
//           <ModalTypeDietInput
//             restProps={{
//               date: '',
//               id: '',
//               notes: null,
//               pet_id: '',
//               snack_type: '',
//               time: '',
//               title: '',
//             }}
//           />
//         )
//       case 'medical treatment':
//         return (
//           <ModalTypeMedicalTreatmentInput
//             restProps={{
//               category: null,
//               id: '',
//               next_date: null,
//               notes: null,
//               pet_id: '',
//               title: '',
//               visit_date: '',
//             }}
//           />
//         )
//       case 'other activities':
//         return (
//           <ModalTypeOtherActivitesInput
//             restProps={{
//               date: '',
//               duration_time: 0,
//               id: '',
//               notes: null,
//               pet_id: '',
//               start_time: '',
//               title: '',
//             }}
//           />
//         )
//       case 'other treatments':
//         return (
//           <ModalTypeOtherTreatmentInput
//             restProps={{
//               date: '',
//               detail: null,
//               id: '',
//               notes: null,
//               pet_id: '',
//               title: '',
//             }}
//           />
//         )
//       case 'vaccines':
//         return (
//           <ModalTypeVaccinationInput
//             restProps={{
//               expiry_date: '',
//               id: '',
//               lot: '',
//               notes: null,
//               pet_id: '',
//               title: '',
//               vaccinated_date: '',
//             }}
//           />
//         )
//       case 'walks':
//         return (
//           <ModalTypeWalksInput
//             restProps={{
//               date: '',
//               distance: null,
//               id: '',
//               pet_id: '',
//               start_time: '',
//               title: '',
//               total_time: null,
//             }}
//           />
//         )
//       default:
//         return null
//     }
//   }

//   // const addModalElement = list()

//   return (
//     <Modal
//       open={isToggle}
//       onClose={() => offToState('isToggle')}
//       isModify={true}
//       setModify={() => {}}
//       buttonNone={true}
//     >
//       {selectInputModalType()}
//     </Modal>
//   )
// }
