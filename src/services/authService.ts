import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IUser } from '@/types/IUser'

import { RootState } from '@/store/store'

export const auth = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/',
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = (getState() as RootState).auth
			if (token) {
				headers.set('authentication', `Bearer ${token}`)
			}
			return headers
		}
	}),
	endpoints: builder => ({
		login: builder.mutation({
			query: credentials => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials
			})
		}),
		protected: builder.mutation({
			query: () => 'protected'
		})
	})
})

export const { useLoginMutation, useProtectedMutation } = auth
