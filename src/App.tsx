import { Layout, theme } from 'antd'
import React, { useEffect } from 'react'

import './App.scss'
import FooterComponent from '@/components/footer/Footer'
import HeaderComponent from '@/components/header/Header'

const { Content } = Layout

const App: React.FC = (props, context) => {
	const {
		token: { colorBgContainer }
	} = theme.useToken()
	return (
		<Layout className='layout'>
			<HeaderComponent />

			<Content style={{ padding: '0 50px' }}></Content>
			<FooterComponent />
		</Layout>
	)
}

export default App
