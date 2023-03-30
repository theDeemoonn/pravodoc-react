import { ConfigureStoreOptions, combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import authReducer from './reducer/authSlice'
import { auth } from '@/services/authService'
import { userAPI } from '@/services/userService'

const rootReducer = combineReducers({
	authReducer,
	[userAPI.reducerPath]: userAPI.reducer,
	[auth.reducerPath]: auth.reducer
})

export const setupStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => [...getDefaultMiddleware(), userAPI.middleware, auth.middleware],
		...options
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = AppStore['dispatch']
