import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IUser } from '@/types/IUser'

import { setUser } from '@/store/reducer/userSlice'

const BASE_URL = 'http://localhost:4000'

export const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['User'],
	endpoints: builder => ({
		fetchUserById: builder.query<IUser, null>({
			query() {
				return {
					url: `users/me`,
					method: 'GET',
					credentials: 'include',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`
					}
				}
			},
			// transformResponse: (result: { data: { user: IUser } }) => result.data.user,
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setUser(data))
				} catch (error) {}
			}
		})
	})
})
