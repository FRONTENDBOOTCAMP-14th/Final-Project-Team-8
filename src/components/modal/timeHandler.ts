export const removeSecond = (time: string | null) => {
  if (time === null) return '-'
  let hour = Number(time.slice(0, 2))
  let min = time.slice(3, 5)
  console.log(hour, min)
  return `${hour / 12 < 1 ? '오전' : '오후'}  ${hour % 12}시 ${min}분`
}

export const minTohour = (time: string | number | null) => {
  if (time === null) return '-'
  const hour = Math.floor(Number(time) / 60)
  const min = Number(time) % 60
  return `${hour}시간 ${min}분`
}
