'use client'

import { createClient } from '@/libs/supabase/client'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'sonner'
import type {
  Antiparasitic,
  Diet,
  MedicalTreatment,
  OtherActivities,
  OtherTreatment,
  Vaccines,
  Walks,
} from '../../libs/supabase'
import { Database } from '../../libs/supabase/database.types'
import Button from '../ui/button/Button'
import { AccordionProps } from './accordion'
import { selectTypeButtonTitle } from './accordionFun'
import {
  AccordionListItemDiet,
  AccordionListItemOther,
  AccordionListItemTreatment,
} from './accordionListItem'

type AccordionItemProps<T extends AccordionProps['type']> = {
  type: T
  isOpen: boolean
}

type AllowedTableNames = AccordionProps['type']

type TableRow<T extends AllowedTableNames> =
  Database['public']['Tables'][T]['Row']

export default function AccordionItemBox<T extends AllowedTableNames>({
  type,
  isOpen,
}: AccordionItemProps<T>) {
  const [rows, setRows] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleSelectTypeAccordionListItem = () => {
    switch (type) {
      case 'antiparasitic':
        return <AntiparasiticCompo dataList={rows}></AntiparasiticCompo>
      case 'diet':
        return <DietCompo dataList={rows}></DietCompo>
      case 'medical treatment':
        return <MedicalTreatmentCompo dataList={rows}></MedicalTreatmentCompo>
      case 'other activities':
        return <OtherActivitiesCompo dataList={rows}></OtherActivitiesCompo>
      case 'other treatments':
        return <OtherTreatmentsCompo dataList={rows}></OtherTreatmentsCompo>
      case 'vaccines':
        return <VaccinesCompo dataList={rows}></VaccinesCompo>
      case 'walks':
        return <WalksCompo dataList={rows}></WalksCompo>
    }
  }

  useEffect(() => {
    let mounted = true
    async function fetchRows() {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from(type).select('*')

      if (!mounted) return
      if (error) setError(error.message)
      else if (data && data.length === 0) toast.info('해당 기록이 없습니다.')
      else if (data) setRows(data)
      setLoading(false)
    }

    fetchRows()
    return () => {
      mounted = false
    }
  }, [type])

  console.log(rows)

  return (
    <div
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.79,0.14,0.15,0.86)] ${isOpen ? 'mb-3 max-h-[400px] overflow-y-auto' : 'max-h-0'}`}
    >
      <div className="relative ml-5 before:absolute before:left-0 before:h-px before:w-[590px] before:rounded-2xl before:bg-gray-300"></div>

      <Button
        variant="white"
        className="!m-5 !w-[calc(100%-40px)] gap-1 !p-[13px] font-bold !text-orange-500"
      >
        <img src="/components/accordion/plus-button-icon.svg" alt="플러스" />
        <p>{selectTypeButtonTitle(type)}</p>
      </Button>
      <Suspense fallback={<ListLoading></ListLoading>}>
        {handleSelectTypeAccordionListItem()}
      </Suspense>
      {/* <JSONDataSpreed type={type} /> */}
    </div>
  )
}

type MedicalTreatmentProps = {
  dataList: MedicalTreatment[] | null
}

type AntiparasiticProps = {
  dataList: Antiparasitic[] | null
}

type DietProps = {
  dataList: Diet[] | null
}

type OtherActivitiesProps = {
  dataList: OtherActivities[] | null
}

type OtherTreatMentsProps = {
  dataList: OtherTreatment[] | null
}

type VaccinesProps = {
  dataList: Vaccines[] | null
}

type WalksProps = {
  dataList: Walks[] | null
}

// 의료 처치 리스트 렌더링 컴포넌트
export function MedicalTreatmentCompo({ dataList }: MedicalTreatmentProps) {
  if (!dataList) return
  return (
    <div>
      {dataList.map(
        ({ category, id, next_date, notes, pet_id, title, visit_date }) => {
          return (
            <AccordionListItemTreatment
              category={category}
              title={title}
              id={id}
              key={id}
              next_date={next_date}
              notes={notes}
              visit_date={visit_date}
              pet_id={pet_id}
            ></AccordionListItemTreatment>
          )
        }
      )}
    </div>
  )
}

// 구충 치료
export function AntiparasiticCompo({ dataList }: AntiparasiticProps) {
  if (!dataList) return
  return (
    <div>
      {dataList.map(({ id, intake_date, next_date, notes, pet_id, title }) => {
        return (
          <AccordionListItemTreatment
            category={null}
            title={title}
            id={id}
            key={id}
            next_date={next_date}
            notes={notes}
            visit_date={intake_date}
            pet_id={pet_id}
          ></AccordionListItemTreatment>
        )
      })}
    </div>
  )
}

// 식단 일지 컴포넌트
export function DietCompo({ dataList }: DietProps) {
  if (!dataList) return
  return (
    <div>
      {dataList.map(({ date, id, pet_id, time, title }) => {
        return (
          <AccordionListItemDiet
            title={title}
            time={time}
            date={date}
            id={id}
            pet_id={pet_id}
          ></AccordionListItemDiet>
        )
      })}
    </div>
  )
}

// 기타 활동 컴포넌트
export function OtherActivitiesCompo({ dataList }: OtherActivitiesProps) {
  if (!dataList) return
  return (
    <div>
      {dataList.map(({ date, id, notes, pet_id, time, title }) => {
        return (
          <AccordionListItemOther
            date={date}
            id={id}
            key={id}
            notes={notes}
            pet_id={pet_id}
            time={time}
            title={title}
          ></AccordionListItemOther>
        )
      })}
    </div>
  )
}

// 기타 치료 리스트 아이템
export function OtherTreatmentsCompo({ dataList }: OtherTreatMentsProps) {
  if (!dataList) return

  return (
    <div>
      {dataList.map(({ date, detail, id, notes, pet_id, title }) => {
        return (
          <AccordionListItemTreatment
            category={detail}
            id={id}
            notes={notes}
          ></AccordionListItemTreatment>
        )
      })}
    </div>
  )
}

// 서스펜스 로딩 바운더리S
function ListLoading() {
  return (
    <div>
      <h2>로딩 중..</h2>
      <p>잠시만 기다려 요세요.</p>
    </div>
  )
}
