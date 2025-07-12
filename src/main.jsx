import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-calendar/dist/Calendar.css';
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position='top-right' reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)