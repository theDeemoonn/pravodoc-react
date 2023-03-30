import React from 'react'
import { Outlet } from 'react-router-dom'

import FooterComponent from '@/components/footer/Footer'
import HeaderComponent from '@/components/header/Header'

const Layout = () => {
	return (
		<>
			<HeaderComponent />
			<main className='flex flex-col items-center p-24 min-h-screen max-sm:p-5'>
				<Outlet />
			</main>
			<FooterComponent />
		</>
	)
}

export default Layout
