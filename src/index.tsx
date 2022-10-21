import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { createEmotionCache, MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { router } from 'routes'

import 'index.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

const myCache = createEmotionCache({ key: 'mantine', prepend: false })

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            keepPreviousData: true,
            staleTime: 1000 * 60 * 10,
            retry: false,
        },
    },
})

root.render(
    <QueryClientProvider client={queryClient}>
        <MantineProvider emotionCache={myCache}>
            <RecoilRoot>
                <RouterProvider router={router} />
            </RecoilRoot>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
