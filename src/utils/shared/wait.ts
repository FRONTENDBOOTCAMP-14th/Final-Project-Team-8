// src/utils/shared/wait.ts
interface WaitOptions {
  forceResolved?: boolean
  resolveMessage?: string
  rejectMessage?: string
}

/**
 * 일정 시간(delay) 후에 성공 또는 실패 결과를 반환하는 Promise
 */
export function wait(
  delay = 1,
  {
    forceResolved,
    resolveMessage = '요청 결과 성공입니다.',
    rejectMessage = '요청 결과 실패했습니다.',
  }: WaitOptions = {}
) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (forceResolved) reject(rejectMessage)
      else resolve(resolveMessage)
    }, delay * 1000)
  )
}
