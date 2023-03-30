import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IUser } from '@/types/IUser'

export const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
	tagTypes: ['User'],
	endpoints: builder => ({
		fetchUserById: builder.query<IUser, number | string>({
			query: id => ({ url: `users/${id}` }),
			providesTags: (result, error, id) => [{ type: 'User', id }],
			transformErrorResponse: (response: { status: string | number }, meta, arg) => response.status
		})
	})
})
