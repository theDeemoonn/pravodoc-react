import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from '@/components/layout/Layout'
import RequireUser from '@/components/layout/RequireUser'
import Page404 from '@/components/pages/404/404'
import Auth from '@/components/pages/auth/Login'
import RegisterPage from '@/components/pages/auth/Register'
import CreateOrder from '@/components/pages/createOrder/CreateOrder'
import HomePage from '@/components/pages/home/HomePage'
import { Profile } from '@/components/pages/profile/Profile'

export const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path='/' element={<Layout />} errorElement={<Page404 />}>
			<Route index element={<HomePage />} />
			<Route errorElement={<Page404 />}></Route>
			<Route element={<RequireUser allowedRoles={['USER', 'ADMIN']} />}>
				<Route path='/profile' element={<Profile />} />
			</Route>
			<Route path={'create'} element={<CreateOrder />} />

			<Route path='login' element={<Auth />} />
			<Route path='register' element={<RegisterPage />} />
		</Route>
	])
)
