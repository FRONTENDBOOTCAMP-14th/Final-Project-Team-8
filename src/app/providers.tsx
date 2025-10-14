'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
// (선택) Devtools: import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({ children }: { children: ReactNode }) {
  // 매 렌더마다 새 인스턴스가 생기지 않도록 useState로 보관
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
