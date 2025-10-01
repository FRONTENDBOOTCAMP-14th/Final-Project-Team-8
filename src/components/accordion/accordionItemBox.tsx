import type { ComponentType } from 'react'
import Button from '../ui/button/button'
import { selectTypeButtonTitle } from './accordionFun'
import {
  ACCORDION_CONFIG,
  type AccordionType,
  type DummyRoot,
  type ItemPropsByType,
} from './config-type'
import dummyData from './vaccination.json'

type AccordionItemProps<T extends AccordionType> = {
  type: T
  isOpen: boolean
}

export default function AccordionItemBox<T extends AccordionType>({
  type,
  isOpen,
}: AccordionItemProps<T>) {
  const conf = ACCORDION_CONFIG[type] // 여기서부터 T로 고정
  const sections = conf.select(dummyData as unknown as DummyRoot) ?? []

  return (
    <div
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

      {sections.map((section, si) => {
        const { year, records } = section
        const Item = conf.Item as ComponentType<ItemPropsByType[T]>

        return (
          <div key={`year-${si}`}>
            <h2 tabIndex={-1} className="m-5 font-bold text-gray-800">
              {year}
            </h2>
            <ul>
              {records.map((rec: any, ri: number) => {
                const props = conf.toProps(rec) as ItemPropsByType[T]
                return <Item key={`item-${si}-${ri}`} {...props} />
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
