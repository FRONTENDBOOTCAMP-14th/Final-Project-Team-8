export default function CalendarSkeleton() {
  return (
    <section className="animate-pulse">
      {/* SeletDate 스켈레톤 */}
      <div className="mb-7 flex flex-row items-center justify-between">
        <div className="flex gap-3">
          <div className="h-8 w-20 rounded bg-[#F7F7FC]" />
          <div className="h-8 w-16 rounded bg-[#F7F7FC]" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-10 rounded-xl bg-[#F7F7FC]" />
          <div className="h-10 w-10 rounded-xl bg-[#F7F7FC]" />
        </div>
      </div>

      <hr className="mt-7.5 mb-3.5 border-[#DAD9E6]" />

      {/* 요일 헤더 스켈레톤 */}
      <div className="mb-4 grid grid-cols-7 gap-4 text-center">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-4 w-full rounded bg-[#F7F7FC]" />
        ))}
      </div>

      {/* 날짜 그리드 스켈레톤 */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div
                key={dayIndex}
                className="aspect-square h-22.5 w-full rounded-xl bg-[#F7F7FC]"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
