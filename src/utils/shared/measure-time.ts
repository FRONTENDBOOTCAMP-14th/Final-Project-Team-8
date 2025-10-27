import { toast } from 'sonner'

// src/utils/shared/measure-time.ts
export async function measureTime(label: string, fn: () => Promise<void>) {
  const start = Date.now()
  await fn()
  const end = Date.now()
  toast.info(`${label} : ${end - start}ms`)
}
