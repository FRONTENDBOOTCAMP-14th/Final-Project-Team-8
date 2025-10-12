type ModalTypeDietProps = {
  isModify: boolean
}

export default function ModalTypeDiet({ isModify }: ModalTypeDietProps) {
  return <>{!isModify ? <ModalTypeDietTable /> : <ModalTypeDietInput />}</>
}

export function ModalTypeDietTable() {
  return (
    <div>
      {/* ✅ 주요 정보 섹션 */}
      <h2 className="text-[18px] font-bold text-gray-800">상세</h2>

      <ul className="flex items-start gap-4">
        {/* 왼쪽/오른쪽 컬럼을 동일 너비로 만들기 위해 flex-1 basis-0 사용 */}
        <li className="mt-3 flex flex-1 basis-0">
          {/* 구분선 — flex 아이템이지만 shrink 방지 */}
          <div className="mr-3 h-[50px] w-[1px] flex-shrink-0 bg-gray-300"></div>
          <div className="flex flex-col justify-center">
            <h3 className="text-base text-gray-700">간식 이름</h3>
            <div className="text-base font-bold text-gray-800">강아지 사료</div>
          </div>
        </li>

        <li className="mt-3 flex flex-1 grow basis-0">
          {/* 구분선 — flex 아이템이지만 shrink 방지 */}
          <div className="mr-3 h-[50px] w-[1px] flex-shrink-0 bg-gray-300"></div>

          <div className="flex flex-col justify-center">
            <div className="text-base text-gray-700">배급 날짜</div>

            <div className="mt-1 text-base font-bold text-gray-800">
              <time dateTime="2023-05-18">2023-05-18</time>
            </div>
          </div>
        </li>

        <li className="mt-3 flex flex-1 grow basis-0">
          {/* 구분선 — flex 아이템이지만 shrink 방지 */}
          <div className="mr-3 h-[50px] w-[1px] flex-shrink-0 bg-gray-300"></div>

          <div className="flex flex-col justify-center">
            <div className="text-base text-gray-700">배급 시간</div>

            <div className="mt-1 text-base font-bold text-gray-800">
              <time dateTime="14:23">오후 2시 23분</time>
            </div>
          </div>
        </li>
      </ul>

      {/* ✅ 특이사항 섹션 */}
      <h2 className="mt-4 text-[18px] font-bold">특이 사항</h2>

      <div className="relative mt-3 mb-3 flex w-full">
        {/* 시각적 세로 구분선 — absolute로 빼서 레이아웃 간섭 최소화 */}
        <span className="absolute left-0 inline-block h-full w-[1px] bg-gray-300"></span>

        <div className="ml-4 w-full">
          <p className="font-bold">특이 사항 없음</p>
        </div>
      </div>
    </div>
  )
}

// Input 컴포넌트
// ✅ 기타 치료 입력 모달
// - 시멘틱하게 유효한 마크업 구조 사용 (HTML5 기준)
// - dl 내부에는 반드시 <div><dt/><dd/></div> 형태의 그룹만 존재
// - 불필요한 중단선(div)은 dl 바깥으로 이동
// - flex 및 Tailwind를 활용해 동일한 시각적 레이아웃 유지

export function ModalTypeDietInput() {
  return (
    <div>
      {/* ✅ 주요 정보 섹션 */}
      <h2 className="text-[18px] font-bold text-gray-800">상세</h2>

      {/* 한 줄에 두 개의 정보(처치 내용 / 처치 날짜)를 균등 분할 */}
      <ul className="flex items-start gap-4">
        {/* ▒ 왼쪽 컬럼 ▒ */}
        <li className="flex grow">
          {/* 세로 구분선 (dl 외부에 존재해야 문법적으로 유효) */}
          <div className="mt-3 mr-3 h-[70px] w-[1px] flex-shrink-0 bg-gray-300" />
          {/* HTML5 명세상 dl > div > (dt + dd) 구조는 유효함 */}
          <div className="mt-3 flex w-full flex-col">
            <div className="text-base text-gray-700">간식 종류</div>
            <div className="mt-1">
              <label htmlFor="other-treatment-content" className="sr-only">
                강아지 껌
              </label>
              <input
                id="other-treatment-content"
                type="text"
                defaultValue="강아지 껌"
                placeholder="간식 이름을 작성해주세요"
                className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </li>

        {/* ▒ 오른쪽 컬럼 ▒ */}
        <li className="flex grow">
          {/* 세로 구분선 (dl 외부에 존재해야 문법적으로 유효) */}
          <div className="mt-3 mr-3 h-[70px] w-[1px] flex-shrink-0 bg-gray-300" />
          <div className="mt-3 flex w-full flex-col">
            <div className="text-base text-gray-700">배급 날짜</div>
            <div className="mt-1">
              <label htmlFor="other-treatment-date" className="sr-only">
                간식 배급 날짜 입력
              </label>
              <input
                id="other-treatment-date"
                type="date"
                defaultValue="2023-05-18"
                className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </li>

        {/* ▒ 오른쪽 컬럼 ▒ */}
        <li className="flex grow">
          {/* 세로 구분선 (dl 외부에 존재해야 문법적으로 유효) */}
          <div className="mt-3 mr-3 h-[70px] w-[1px] flex-shrink-0 bg-gray-300" />
          <div className="mt-3 flex w-full flex-col">
            <div className="text-base text-gray-700">배급 시간</div>
            <div className="mt-1">
              <label htmlFor="other-treatment-date" className="sr-only">
                간식 배급 시간 입력
              </label>
              <input
                id="other-treatment-date"
                type="time"
                defaultValue="14:23"
                step="60"
                className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </li>
      </ul>

      {/* ✅ 특이사항 섹션 */}
      <h2 className="mt-4 text-[18px] font-bold text-gray-800">특이 사항</h2>

      {/* 특이사항 입력란 */}
      <div className="relative mt-3 mb-3 flex w-full">
        {/* 시각적 구분선 (absolute로 배치하여 레이아웃 간섭 제거) */}
        <span className="absolute left-0 inline-block h-full w-[1px] bg-gray-300" />

        <div className="ml-4 w-full">
          <label htmlFor="other-treatment-note" className="sr-only">
            특이 사항 입력
          </label>
          <textarea
            id="other-treatment-note"
            defaultValue="특이 사항 없음"
            placeholder="특이 사항을 입력해주세요"
            className="w-full rounded-md border-2 border-amber-400 p-2 focus:border-orange-500 focus:outline-none"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
