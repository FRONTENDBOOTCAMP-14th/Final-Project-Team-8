export default function ListLoading() {
  return (
    <div className="flex h-40 animate-pulse items-center justify-center">
      <div className="flex items-center gap-3 rounded-xl bg-orange-50/60 px-4 py-2">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span className="text-sm text-orange-600">불러오는 중이에요…</span>
      </div>
    </div>
  )
}
