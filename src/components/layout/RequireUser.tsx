import { Skeleton } from 'antd'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { userAPI } from '@/services/userService'

//TODO: setup roles
const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
	const [cookies] = useCookies(['logged_in'])
	const logged_in = cookies.logged_in

	const { data: user } = userAPI.endpoints.fetchUserById.useQuery(null, {
		skip: !logged_in,
		refetchOnFocus: true,
		refetchOnReconnect: true,
		refetchOnMountOrArgChange: true
	})

	const location = useLocation()
	console.log('loc', location.state?.from.pathname)
	if (logged_in && !user) {
		return (
			<>
				<h1>Профиль</h1>
				<div className='overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-screen-md'>
					<div className='flex justify-center py-4 items-center rounded-full'>
						<Skeleton active />
					</div>
				</div>
			</>
		)
	}

	return logged_in && allowedRoles.includes(user?.roles[0].value as string) ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />
}

export default RequireUser
