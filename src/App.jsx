import React from 'react'
import Router from './router'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='bottom-right' richColors closeButton />
      <Router />
    </QueryClientProvider>
  )
}

export default App