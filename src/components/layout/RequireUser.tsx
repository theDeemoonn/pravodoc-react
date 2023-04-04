import { Skeleton } from 'antd'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { userAPI } from '@/services/userService'

//TODO: setup roles
const RequireUser = ({ allowedRoles }: { allowedRoles: string }) => {
	const [cookies] = useCookies(['logged_in'])
	const logged_in = cookies.logged_in

	const { data: user } = userAPI.endpoints.fetchUserById.useQuery(null, {
		skip: !logged_in
	})

	const location = useLocation()

	const userRole = () => {
		const role = user?.roles
			.map(role => role.value)
			.reduce((acc, cur) => acc + cur, '')
			.toLowerCase()
		return role?.indexOf('admin') !== -1 ? 'admin' : role?.indexOf('user') !== -1 ? 'user' : 'guest'
	}

	console.log('role', userRole())

	if (logged_in && !user) {
		return <Skeleton active />
	}

	return logged_in || user ? (
		<Outlet />
	) : logged_in && user ? (
		<Navigate to='/login' state={{ from: location }} replace />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	)
}

export default RequireUser
