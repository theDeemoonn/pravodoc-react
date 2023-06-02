import { ConfigProvider } from 'antd'
import ruRU from 'antd/lib/locale/ru_RU'
import 'dayjs/locale/ru'
import React, { Suspense } from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import './index.scss'
import { router } from '@/router'
import { store } from '@/store/store'

// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <App />,
// 		errorElement: <Page404 />
// 	}
// ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#00b96b',
					colorLinkHover: '#00b96b'
				}
			}}
			locale={ruRU}
		>
			<CookiesProvider>
				<Suspense fallback={<div>Loading...</div>}>
					<RouterProvider router={router} />
				</Suspense>
			</CookiesProvider>
		</ConfigProvider>
	</Provider>
)
