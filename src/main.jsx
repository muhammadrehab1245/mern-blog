import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@mantine/core/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import queryClient from './queryCilent';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)
