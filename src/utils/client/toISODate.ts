// 아코디언 날짜 0000-00-00 형식 변환 함수
export function toISODate(display: string | null) {
  if (display === null) return
  const isoLike = /^\d{4}-\d{2}-\d{2}/.test(display)
  if (isoLike) return display
  const d = new Date(display)
  return isNaN(d.getTime()) ? display : d.toISOString().slice(0, 10)
}
