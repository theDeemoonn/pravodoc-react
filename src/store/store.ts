import { ConfigureStoreOptions, combineReducers, configureStore } from '@reduxjs/toolkit'

import { authAPI } from '@/services/authApiService'
import { userAPI } from '@/services/userService'
import { createOrderSlice } from '@/store/reducer/createOrderSlice'
import { userSlice } from '@/store/reducer/userSlice'

const rootReducer = combineReducers({
	[userAPI.reducerPath]: userAPI.reducer,
	[authAPI.reducerPath]: authAPI.reducer,
	userState: userSlice.reducer,
	createOrder: createOrderSlice.reducer
})

export const setupStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([authAPI.middleware, userAPI.middleware]),
		...options
	})
}

export const store = setupStore()

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
