'use client'

import { createClient } from '@/libs/supabase/client'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Database } from '../../libs/supabase/database.types'
import Button from '../ui/button/Button'
import { AccordionProps } from './accordion'
import { selectTypeButtonTitle } from './accordionFun'
import {
  AntiparasiticCompo,
  DietCompo,
  MedicalTreatmentCompo,
  OtherActivitiesCompo,
  OtherTreatmentsCompo,
  VaccinesCompo,
  WalksCompo,
} from './accordionList'

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

// 서스펜스 로딩 바운더리
function ListLoading() {
  return (
    <div>
      <h2>로딩 중..</h2>
      <p>잠시만 기다려 요세요.</p>
    </div>
  )
}
