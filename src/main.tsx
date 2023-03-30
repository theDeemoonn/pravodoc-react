import { ChakraProvider } from '@chakra-ui/react'
import { ConfigProvider } from 'antd'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import './index.scss'
import Page404 from '@/components/pages/404/404'
import { router } from '@/router'
import { setupStore } from '@/store/store'

// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <App />,
// 		errorElement: <Page404 />
// 	}
// ])
const store = setupStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#00b96b',
					colorLinkHover: '#00b96b'
				}
			}}
		>
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={router} />
			</Suspense>
		</ConfigProvider>
	</Provider>
)
