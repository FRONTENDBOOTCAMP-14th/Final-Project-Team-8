import { ComponentType } from 'react'
import {
  AccordionListItem,
  AccordionListItemOther,
  AccordionListItemTreatment,
  AccordionListItemWalk,
} from './accordionListItem'

// 1) 타입 키 (AccordionProps['type']와 동일하게 유지)
export type AccordionType =
  | 'vaccination'
  | 'anthelmintic'
  | 'medical'
  | 'other-treatments'
  | 'food-journal'
  | 'walk'
  | 'other-journals'

// 2) 공통 섹션(year) 래퍼
type Section<TRecord> = {
  year: number
  records: TRecord[]
}

// 3) 원본 레코드들 (루트 JSON 구조 기준)
type VaccinationRec = { vaccine: string; date: string }
type FoodRec = { title: string; time: string; date: string }
type WalkRec = {
  title: string
  date: string
  startTime: string
  distanceKm: number
  duration: string
}
type OtherJournalRec = { title: string; date: string; content: string }

// 4) 루트 더미 데이터 타입
export type DummyRoot = {
  vaccinations: Section<VaccinationRec>[]
  ['foodJournal']: Section<FoodRec>[]
  ['walk']: Section<WalkRec>[]
  ['otherJournals']: Section<OtherJournalRec>[]
}

// 화면에 뿌릴 각 아이템 컴포넌트의 props 형태
export type ItemPropsByType = {
  vaccination: { title: string; date: string }
  anthelmintic: { title: string; date: string }
  medical: { title: string; date: string }
  'other-treatments': { title: string; date: string }
  'food-journal': { title: string; time: string; date: string }
  walk: {
    title: string
    date: string
    startTime: string
    distanceKm: number
    duration: string
  }
  'other-journals': { title: string; date: string; content: string }
}

export type ItemComponentByType = {
  [K in AccordionType]: (
    props: ItemPropsByType[K]
  ) => ComponentType<ItemPropsByType[K]>
}

export const ACCORDION_CONFIG: {
  [K in AccordionType]: {
    select: (root: DummyRoot) => Section<any>[]
    toProps: (rec: any) => ItemPropsByType[K]
    Item: ComponentType<ItemPropsByType[K]>
  }
} = {
  vaccination: {
    select: root => root.vaccinations,
    toProps: (r: VaccinationRec) => ({ title: r.vaccine, date: r.date }),
    Item: AccordionListItemTreatment,
  },
  anthelmintic: {
    select: root => root.vaccinations,
    toProps: (r: VaccinationRec) => ({ title: r.vaccine, date: r.date }),
    Item: AccordionListItemTreatment,
  },
  medical: {
    select: root => root.vaccinations,
    toProps: (r: VaccinationRec) => ({ title: r.vaccine, date: r.date }),
    Item: AccordionListItemTreatment,
  },
  'other-treatments': {
    select: root => root.vaccinations,
    toProps: (r: VaccinationRec) => ({ title: r.vaccine, date: r.date }),
    Item: AccordionListItemTreatment,
  },
  'food-journal': {
    select: root => root.foodJournal,
    toProps: (r: FoodRec) => ({ title: r.title, time: r.time, date: r.date }),
    Item: AccordionListItem,
  },
  walk: {
    select: root => root.walk,
    toProps: (r: WalkRec) => ({
      title: r.title,
      date: r.date,
      startTime: r.startTime,
      distanceKm: r.distanceKm,
      duration: r.duration,
    }),
    Item: AccordionListItemWalk,
  },
  'other-journals': {
    select: root => root.otherJournals,
    toProps: (r: OtherJournalRec) => ({
      title: r.title,
      date: r.date,
      content: r.content,
    }),
    Item: AccordionListItemOther,
  },
} satisfies {
  [K in AccordionType]: {
    select: (root: DummyRoot) => Section<any>[]
    toProps: (rec: any) => ItemPropsByType[K]
    Item: ComponentType<ItemPropsByType[K]>
  }
}
