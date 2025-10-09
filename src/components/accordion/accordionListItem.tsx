import { CalendarIcon, SquarePen, X } from 'lucide-react'
import { useId, useState } from 'react'
import {
  Diet,
  MedicalTreatment,
  OtherActivities,
  Walks,
} from '../../libs/supabase'
import { toISODate } from './accordionFun'

/**
 * AccordionListItemTreatment 컴포넌트
 * 년도별 백신 기록 한 줄 렌더링
 * 예방접종, 구충치료, 의료처치, 기타치료 itme 컴포넌트
 */
export function AccordionListItemTreatment({
  title,
  id,
  next_date,
  notes,
  category,
  visit_date,
}: MedicalTreatment) {
  const [mouseState, setMouseState] = useState<boolean>(false)
  const headingId = useId()
  const handleMouseIn = () => {
    setMouseState(true)
  }

  const handleMouseOut = () => {
    setMouseState(false)
  }
  return (
    <li
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      onFocus={handleMouseIn}
      onBlur={handleMouseOut}
      aria-labelledby={headingId}
      className="m-5 flex max-h-[70px] items-center rounded-xl border border-gray-300 pt-[23px] pr-4 pb-[23px] pl-4"
      id={id}
    >
      <h3
        id={headingId}
        className="line-clamp-1 grow text-start text-base font-bold text-gray-800"
      >
        <button
          type="button"
          className="grow origin-left cursor-pointer transition hover:translate-y-[-3px] active:scale-[0.95]"
        >
          {/* 백신 이름 */}
          {title}
        </button>
      </h3>
      {/* 구분선 */}
      <div className="relative mr-3 ml-3 flex items-center before:absolute before:left-0 before:h-4 before:w-px before:bg-gray-300"></div>

      <time
        dateTime={toISODate(visit_date)}
        className="ml-2 flex items-center gap-1 font-bold text-gray-500"
      >
        {/* 날짜 아이콘 및 표시 */}
        <CalendarIcon
          aria-hidden="true"
          focusable="false"
          width={20}
          height={20}
          className="text-gray-400"
        />
        {visit_date}
      </time>
      <time
        aria-label="next date"
        dateTime={toISODate(next_date ?? null)}
        className="sr-only"
      >
        {next_date ?? '다음 예정일이 없습니다.'}
      </time>
      {/* 수정 및 삭제 버튼 */}
      {mouseState && (
        <>
          <button
            type="button"
            aria-label={`${title} edit`}
            className="mr-3 ml-3 flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
          >
            <SquarePen
              focusable="false"
              aria-hidden="true"
              width={20}
              height={20}
            />
            <span className="sr-only">편집</span>
          </button>
          <button
            type="button"
            aria-label={`${title} delete`}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
          >
            <X width={20} height={20} />
            <span className="sr-only">삭제</span>
          </button>
        </>
      )}
    </li>
  )
}

// ----------------------------------------------------------------------------------------------------------------------
/**
 * AccordionListItem 아이템 컴포넌트
 * 년도별 기록(제목, 시간, 일) 한 줄 렌더링
 * 식단 일지 ...
 */
export function AccordionListItemDiet({ title, date, time, id, pet_id }: Diet) {
  const [mouseState, setMouseState] = useState<boolean>(false)
  const headingId = useId()
  const handleMouseIn = () => {
    setMouseState(true)
  }

  const handleMouseOut = () => {
    setMouseState(false)
  }
  return (
    <li
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      onFocus={handleMouseIn}
      onBlur={handleMouseOut}
      aria-labelledby={headingId}
      className="m-5 flex max-h-[70px] items-center rounded-xl border border-gray-300 pt-[23px] pr-4 pb-[23px] pl-4"
    >
      <h3 id={headingId} className="grow text-base font-bold text-gray-800">
        <button
          type="button"
          className="grow origin-left cursor-pointer transition hover:translate-y-[-3px] active:scale-[0.95]"
        >
          {title}
        </button>
      </h3>

      {/* 시간 */}
      <span className="font-bold text-gray-400">{time}</span>
      {/* 구분선 */}
      <div className="relative mr-3 ml-3 flex items-center before:absolute before:left-0 before:h-4 before:w-px before:bg-gray-300"></div>

      {/* 날짜 아이콘 및 표시 */}
      <time
        dateTime={toISODate(date)}
        className="ml-2 flex gap-1 font-bold text-gray-500"
      >
        <CalendarIcon
          focusable="false"
          aria-hidden="true"
          width={20}
          height={20}
          className="text-gray-400"
        />
        {date}
      </time>
      {/* 수정 및 삭제 버튼 */}
      {mouseState && (
        <>
          <button
            type="button"
            aria-label={`${title} edit`}
            className="mr-3 ml-3 flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
          >
            <SquarePen
              focusable="false"
              aria-hidden="true"
              width={20}
              height={20}
            />
            <span className="sr-only">편집</span>
          </button>
          <button
            type="button"
            aria-label={`${title} delete`}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
          >
            <X width={20} height={20} />
            <span className="sr-only">삭제</span>
          </button>
        </>
      )}
    </li>
  )
}

// Walk 리스트 아이템 (거리/시간 표시)
export function AccordionListItemWalk({
  title,
  date,
  start_time,
  distance,
  total_time,
}: Walks) {
  const [mouseState, setMouseState] = useState<boolean>(false)
  const headingId = useId()
  const handleMouseIn = () => {
    setMouseState(true)
  }

  const handleMouseOut = () => {
    setMouseState(false)
  }

  return (
    <li
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      aria-labelledby={headingId}
      className="m-5 flex h-[84px] items-center gap-4 rounded-xl border border-gray-300 px-4 py-[23px]"
    >
      <div className="flex grow flex-col gap-1">
        <h3
          id={headingId}
          title={title}
          className="order-1 grow text-base font-bold text-gray-800"
        >
          <button
            type="button"
            className="line-clamp-1 flex grow origin-left cursor-pointer gap-2 transition hover:translate-y-[-3px] active:scale-[0.95]"
          >
            <img
              aria-hidden="true"
              src="/components/accordion/walk-title-icon.svg"
              alt=""
            />
            {title}
          </button>
        </h3>
        <div className="flex items-center justify-start gap-2">
          <time dateTime={toISODate(date)} className="text-base text-gray-500">
            {date}
          </time>
          <div className="h-4 w-px bg-gray-300" />
          <span className="text-base text-gray-500">{start_time}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="text-gray-500">
          <span className="font-bold text-gray-800">{distance}</span> km
        </span>
        <div className="h-4 w-px bg-gray-300" />
        <span className="text-gray-500">
          <span className="font-bold text-gray-800">{total_time}</span> min
        </span>
      </div>
      {mouseState && (
        <>
          <button
            type="button"
            aria-label={`${title} edit`}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
          >
            <SquarePen
              focusable="false"
              aria-hidden="true"
              width={20}
              height={20}
            />
            <span className="sr-only">편집</span>
          </button>
          <button
            type="button"
            aria-label={`${title} delete`}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
          >
            <X focusable="false" aria-hidden="true" width={20} height={20} />
            <span className="sr-only">삭제</span>
          </button>
        </>
      )}
    </li>
  )
}

// 기타 활동 일지 아이템 (내용 미리보기)
export function AccordionListItemOther({
  title,
  date,
  notes,
  pet_id,
  time,
  id,
}: OtherActivities) {
  const [mouseState, setMouseState] = useState<boolean>(false)
  const headingId = useId()

  const handleMouseIn = () => {
    setMouseState(true)
  }

  const handleMouseOut = () => {
    setMouseState(false)
  }
  return (
    <li
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      onFocus={handleMouseIn}
      onBlur={handleMouseOut}
      aria-labelledby={headingId}
      className="m-5 max-h-34 min-h-25 w-[calc(100%-40px)] list-none rounded-xl border border-gray-300 px-4 py-[16px]"
    >
      <div className="mb-1 flex">
        <button
          type="button"
          className="grow-1 origin-left cursor-pointer transition hover:translate-y-[-3px] active:scale-[0.95]"
        >
          {/* 제목은 너무 길면 줄 넘어감 */}
          <h3
            id={headingId}
            className="line-clamp-1 rounded-2xl text-start text-base font-bold text-gray-800"
          >
            {title}
          </h3>
        </button>
        <time
          dateTime={toISODate(date)}
          className="flex min-w-26 items-center justify-center gap-1 text-sm font-bold text-gray-500"
        >
          <CalendarIcon
            focusable="false"
            aria-hidden="true"
            width={20}
            height={20}
            className="text-gray-400"
          />
          {date}
        </time>
      </div>
      <div className="flex">
        <p className="line-clamp-4 grow text-start text-sm whitespace-pre-line text-gray-500">
          {notes}
        </p>
        {mouseState && (
          <div className="flex items-center justify-end">
            <button
              type="button"
              aria-label={`${title} edit`}
              className="mr-3 ml-3 flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
            >
              <SquarePen
                focusable="false"
                aria-hidden="true"
                width={20}
                height={20}
              />
              <span className="sr-only">편집</span>
            </button>
            <button
              type="button"
              aria-label={`${title} delete`}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
            >
              <X width={20} height={20} />
              <span className="sr-only">삭제</span>
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
