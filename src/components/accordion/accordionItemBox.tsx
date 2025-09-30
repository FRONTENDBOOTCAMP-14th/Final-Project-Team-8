import Button from '../ui/button/button'
import { AccordionListItem } from './accordionListItem'
import dummyData from './vaccination.json'

// Accordion 내용 영역 Props 타입
interface AccordionItemProps {
  isOpen: boolean
}

/**
 * AccordionItemBox 컴포넌트
 * 실제 아코디언 안의 리스트 내용을 렌더링
 */
export default function AccordionItemBox({ isOpen }: AccordionItemProps) {
  const vaccin = dummyData.vaccinations // 더미 백신 데이터 가져오기

  const typeName = '새 이름'

  return (
    <div
      className={`mb-3 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.79,0.14,0.15,0.86)] ${
        isOpen ? 'max-h-[400px] overflow-y-auto' : 'max-h-0'
      }`}
    >
      <div className="relative ml-5 before:absolute before:left-0 before:h-px before:w-[590px] before:rounded-2xl before:bg-gray-300"></div>
      <Button
        variant="white"
        className="!m-5 !w-[calc(100%-40px)] gap-1 !p-[13px] font-bold !text-orange-500"
      >
        <img src="/components/accordion/plus-button-icon.svg" alt="플러스" />
        <p aria-label={typeName}>{typeName}</p>
      </Button>
      {/* 년도별 백신 데이터 렌더링 */}
      {vaccin.map(({ year, records }, index) => {
        return (
          <div key={'year' + index}>
            <h2 className="m-5 font-bold text-gray-800">{year}</h2>

            {/* 각 백신 기록 렌더링 */}
            {records.map(({ vaccine, date }, index) => {
              return (
                <AccordionListItem
                  key={'item' + index}
                  title={vaccine}
                  date={date}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
