export default function CalendarSkeleton() {
  return (
    <section className="animate-pulse">
      {/* SeletDate 스켈레톤 */}
      <div className="mb-7 flex flex-row items-center justify-between">
        <div className="h-13.5 w-13.5 rounded-xl bg-[#F7F7FC]" />
        <div className="flex gap-3">
          <div className="h-8 w-25 rounded bg-[#F7F7FC]" />
          <div className="h-8 w-20 rounded bg-[#F7F7FC]" />
        </div>
        <div className="h-13.5 w-13.5 rounded-xl bg-[#F7F7FC]" />
      </div>

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
                className="h-22.5 w-full rounded-xl bg-[#F7F7FC]"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
