export function UserProfileCardSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center justify-between rounded-2xl bg-gray-500 p-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-600"></div>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 rounded bg-gray-600"></div>
          <div className="h-3 w-14 rounded bg-gray-700"></div>
        </div>
      </div>
      <div className="ml-6 h-6 w-6 rounded bg-gray-600"></div>
    </div>
  )
}

export function PetProfileListSkeleton() {
  return (
    <div
      className="flex flex-shrink-0 animate-pulse flex-col items-center gap-2"
      aria-hidden="true"
    >
      {/* 프로필 이미지 자리 */}
      <div className="aspect-square w-[60px] rounded-full bg-gray-600" />
      {/* 이름 자리 */}
      <div className="h-3 w-14 rounded bg-gray-700" />
    </div>
  )
}
