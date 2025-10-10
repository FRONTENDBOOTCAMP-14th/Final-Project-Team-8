interface ModalDetailProps {
  isModify: boolean
}

// 기본 타입(백신, 예방접종, )
export default function ModalDetail({ isModify }: ModalDetailProps) {
  return (
    <div>
      {/* ✅ 주요 정보 섹션 */}
      <h2 className="text-[18px] font-bold text-gray-800">상세</h2>

      <dl className="gap flex items-center">
        {/* 구분선 */}
        <div className="inline-block h-[50px] w-[1px] bg-gray-300"></div>

        {/* Lot 정보 */}
        <div className="mt-3 mr-4 mb-3 ml-4 flex min-w-[50px] flex-col">
          <dt className="text-base text-gray-700">Lot</dt>
          {!isModify ? (
            <dd className="text-base font-bold text-gray-800">A583D01</dd>
          ) : (
            <input
              type="text"
              defaultValue="A583D01"
              className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
            />
          )}
        </div>

        {/* 구분선 */}
        <div className="ml-4 inline-block h-[50px] w-[1px] bg-gray-300"></div>

        {/* 접종 날짜 */}
        <div className="mt-3 mr-4 mb-3 ml-4 flex max-w-[210px] flex-col">
          <dt className="text-base text-gray-700">접종 날짜</dt>
          {!isModify ? (
            <dd className="text-base font-bold text-gray-800">
              <time dateTime="18.05.23">18.05.23</time>
            </dd>
          ) : (
            <input
              type="text"
              defaultValue="18.05.23"
              className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
            />
          )}
        </div>

        {/* 구분선 */}
        <div className="inline-block h-[50px] w-[1px] bg-gray-300"></div>

        {/* 유효기간 */}
        <div className="mt-3 mr-4 mb-3 ml-4 flex flex-col">
          <dt className="text-base text-gray-700">유효기간</dt>
          {!isModify ? (
            <dd className="text-base font-bold text-gray-800">18.09.2025</dd>
          ) : (
            <input
              type="text"
              defaultValue="18.09.2025"
              className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
            />
          )}
        </div>
      </dl>

      {/* ✅ 특이사항 섹션 */}
      <h2 className="text-[18px] font-bold">특이 사항</h2>
      <div className="relative mt-3 mb-3 flex h-max w-full font-bold">
        {/* 세로 구분선 */}
        <span className="absolute inline-block h-full w-[1px] bg-gray-300"></span>

        {!isModify ? (
          <span className="ml-4">특이 사항 없음</span>
        ) : (
          <textarea
            defaultValue="특이 사항 없음"
            className="mr-4 ml-3 h-full grow rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
          ></textarea>
        )}
      </div>
    </div>
  )
}

export function ModalDetailInput({ isModify }: ModalDetailProps) {
  return (
    <div>
      {/* ✅ 주요 정보 섹션 */}
      <h2 className="text-[18px] font-bold text-gray-800">상세</h2>

      <dl className="gap flex items-center">
        {/* 구분선 */}
        <div className="inline-block h-[50px] w-[1px] bg-gray-300"></div>

        {/* Lot 정보 */}
        <div className="mt-3 mr-4 mb-3 ml-4 flex min-w-[50px] flex-col">
          <dt className="text-base text-gray-700">Lot</dt>
          <input
            type="text"
            defaultValue="A583D01"
            className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* 구분선 */}
        <div className="ml-4 inline-block h-[50px] w-[1px] bg-gray-300"></div>

        {/* 접종 날짜 */}
        <div className="mt-3 mr-4 mb-3 ml-4 flex max-w-[210px] flex-col">
          <dt className="text-base text-gray-700">접종 날짜</dt>
          <input
            type="text"
            defaultValue="18.05.23"
            className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* 구분선 */}
        <div className="inline-block h-[50px] w-[1px] bg-gray-300"></div>

        {/* 유효기간 */}
        <div className="mt-3 mr-4 mb-3 ml-4 flex flex-col">
          <dt className="text-base text-gray-700">유효기간</dt>
          <input
            type="text"
            defaultValue="18.09.2025"
            className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
          />
        </div>
      </dl>

      {/* ✅ 특이사항 섹션 */}
      <h2 className="text-[18px] font-bold">특이 사항</h2>
      <div className="relative mt-3 mb-3 flex h-max w-full font-bold">
        {/* 세로 구분선 */}
        <span className="absolute inline-block h-full w-[1px] bg-gray-300"></span>

        <textarea
          defaultValue="특이 사항 없음"
          className="mr-4 ml-3 h-full grow rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
        ></textarea>
      </div>
    </div>
  )
}
