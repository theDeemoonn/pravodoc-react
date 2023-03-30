import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IUser } from '@/types/IUser'

export const testAPI = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/'
	}),
	tagTypes: ['IUser'],
	endpoints: build => ({
		getPostById: build.query<IUser, number>({
			// note: an optional `queryFn` may be used in place of `query`
			query: id => ({ url: `users/${id}` }),
			// Pick out data and prevent nested properties in a hook or selector
			transformResponse: (response: { data: IUser }, meta, arg) => response.data,
			// Pick out errors and prevent nested properties in a hook or selector
			transformErrorResponse: (response: { status: string | number }, meta, arg) => response.status,
			providesTags: (result, error, id) => [{ type: 'IUser', id }],
			// The 2nd parameter is the destructured `QueryLifecycleApi`
			async onQueryStarted(arg, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData }) {},
			// The 2nd parameter is the destructured `QueryCacheLifecycleApi`
			async onCacheEntryAdded(arg, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry, updateCachedData }) {}
		})
	})
})
