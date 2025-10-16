import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
// (선택) Devtools: import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
