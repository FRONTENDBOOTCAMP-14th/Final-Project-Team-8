// 📦 각 데이터 타입 import (Supabase 모델)
import type {
  Antiparasitic,
  Diet,
  MedicalTreatment,
  OtherActivities,
  OtherTreatment,
  Vaccines,
  Walks,
} from '@/libs/supabase'
import {
  AntiparasiticTreatmentItem,
  DietItem,
  MedicalTreatmentItem,
  OtherActivitiesItem,
  OtherTreatmentItem,
  VaccinesTreatmentItem,
  WalksItem,
} from './accordionListItem'

// 📦 관련 리스트 아이템 컴포넌트 import

/* -------------------------------------------------------------------------- */
/*                                   타입 정의                                 */
/* -------------------------------------------------------------------------- */

// 각 카테고리별 리스트 데이터 타입 정의
interface MedicalTreatmentProps {
  dataList: MedicalTreatment[] | null
}

interface AntiparasiticProps {
  dataList: Antiparasitic[] | null
}

interface DietProps {
  dataList: Diet[] | null
}

interface OtherActivitiesProps {
  dataList: OtherActivities[] | null
}

interface OtherTreatMentsProps {
  dataList: OtherTreatment[] | null
}

interface VaccinesProps {
  dataList: Vaccines[] | null
}

interface WalksProps {
  dataList: Walks[] | null
}

/* -------------------------------------------------------------------------- */
/*                            🏥 의료 처치 리스트 컴포넌트                     */
/* -------------------------------------------------------------------------- */
/**
 * @description
 * 의료 처치(MedicalTreatment) 데이터를 렌더링하는 컴포넌트입니다.
 * 각 항목은 <MedicalTreatmentItem>으로 표시됩니다.
 */
export function MedicalTreatmentCompo({ dataList }: MedicalTreatmentProps) {
  if (!dataList) return null

  return (
    <ul>
      {dataList.map(
        ({ category, id, next_date, notes, pet_id, title, visit_date }) => (
          <MedicalTreatmentItem
            category={category}
            id={id}
            next_date={next_date}
            notes={notes}
            title={title}
            pet_id={pet_id}
            visit_date={visit_date}
            key={id}
          />
        )
      )}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/*                          💊 구충제 치료 리스트 컴포넌트                    */
/* -------------------------------------------------------------------------- */
/**
 * @description
 * 구충제(Antiparasitic) 관련 데이터를 렌더링합니다.
 * <AntiparasiticTreatmentItem>을 사용합니다.
 */
export function AntiparasiticCompo({ dataList }: AntiparasiticProps) {
  if (!dataList) return null

  return (
    <ul>
      {dataList.map(({ id, intake_date, next_date, notes, pet_id, title }) => (
        <AntiparasiticTreatmentItem
          id={id}
          intake_date={intake_date}
          next_date={next_date}
          notes={notes}
          pet_id={pet_id}
          title={title}
          key={id}
        />
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/*                           🥣 식단 기록 리스트 컴포넌트                     */
/* -------------------------------------------------------------------------- */
/**
 * @description
 * 반려동물 식단(Diet) 기록을 표시합니다.
 * <DietItem>을 통해 일자별로 렌더링됩니다.
 */
export function DietCompo({ dataList }: DietProps) {
  if (!dataList) return null

  return (
    <ul>
      {dataList.map(({ date, id, pet_id, time, title, snack_type, notes }) => (
        <DietItem
          date={date}
          id={id}
          pet_id={pet_id}
          time={time}
          title={title}
          key={id}
          snack_type={snack_type}
          notes={notes}
        />
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/*                           🎯 기타 활동 리스트 컴포넌트                     */
/* -------------------------------------------------------------------------- */
/**
 * @description
 * 산책, 놀이 등 기타 활동(OtherActivities) 데이터를 렌더링합니다.
 * <AccordionListItemOther>를 사용합니다.
 */
export function OtherActivitiesCompo({ dataList }: OtherActivitiesProps) {
  if (!dataList) return null

  return (
    <ul>
      {dataList.map(
        ({ date, id, notes, pet_id, start_time, duration_time, title }) => (
          <OtherActivitiesItem
            date={date}
            id={id}
            notes={notes}
            pet_id={pet_id}
            start_time={start_time}
            duration_time={duration_time}
            title={title}
            key={id}
          />
        )
      )}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/*                           💉 기타 치료 리스트 컴포넌트                     */
/* -------------------------------------------------------------------------- */
/**
 * @description
 * 기타 치료(OtherTreatment) 데이터를 렌더링합니다.
 * <OtherTreatmentItem> 컴포넌트를 사용합니다.
 */
export function OtherTreatmentsCompo({ dataList }: OtherTreatMentsProps) {
  if (!dataList) return null

  return (
    <ul>
      {dataList.map(({ date, detail, id, notes, pet_id, title }) => (
        <OtherTreatmentItem
          date={date}
          detail={detail}
          id={id}
          notes={notes}
          pet_id={pet_id}
          title={title}
          key={id}
        />
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/*                           💉 예방 접종 리스트 컴포넌트                     */
/* -------------------------------------------------------------------------- */
/**
 * @description
 * 백신(Vaccines) 데이터 리스트를 렌더링합니다.
 * <VaccinesTreatmentItem>을 통해 표시됩니다.
 */
export function VaccinesCompo({ dataList }: VaccinesProps) {
  if (!dataList) return null

  return (
    <ul>
      {dataList.map(
        ({ expiry_date, id, lot, notes, pet_id, title, vaccinated_date }) => (
          <VaccinesTreatmentItem
            expiry_date={expiry_date}
            id={id}
            lot={lot}
            notes={notes}
            pet_id={pet_id}
            title={title}
            vaccinated_date={vaccinated_date}
            key={id}
          />
        )
      )}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/*                           🐾 산책 기록 리스트 컴포넌트                     */
/* -------------------------------------------------------------------------- */
/**
 * @description
 * 반려동물의 산책(Walks) 기록을 렌더링합니다.
 * <AccordionListItemWalk>으로 표시됩니다.
 */
export function WalksCompo({ dataList }: WalksProps) {
  if (!dataList) return null

  return (
    <ul>
      {dataList.map(
        ({ date, distance, id, pet_id, start_time, title, total_time }) => (
          <WalksItem
            date={date}
            distance={distance}
            id={id}
            pet_id={pet_id}
            start_time={start_time}
            title={title}
            total_time={total_time}
            key={id}
          />
        )
      )}
    </ul>
  )
}
