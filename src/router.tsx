import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from '@/components/layout/Layout'
import Page404 from '@/components/pages/404/404'
import Auth from '@/components/pages/auth/Login'
import HomePage from '@/components/pages/home/HomePage'
import { Profile } from '@/components/pages/profile/Profile'

export const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path='/' element={<Layout />} errorElement={<Page404 />}>
			<Route index element={<HomePage />} />
			<Route errorElement={<Page404 />}></Route>
			<Route path='profile/:id' element={<Profile />} />
			<Route path='login' element={<Auth />} />
		</Route>
	])
)
