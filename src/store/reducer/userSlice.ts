import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/types/IUser'

// import { fetchUser } from '@/store/reducer/actionCreators'

interface IUserState {
	user: IUser | null
	// error: string | null
	// isLoading: boolean
}

const initialState: IUserState = {
	user: null
	// error: null,
	// isLoading: false
}

export const userSlice = createSlice({
	initialState,
	name: 'userSlice',
	reducers: {
		logout: () => {
			localStorage.removeItem('accessToken')
			return initialState
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
		}
	}
	// extraReducers: {
	// 	[fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
	// 		state.user = action.payload
	// 		state.isLoading = false
	// 		state.error = ''
	// 	},
	// 	[fetchUser.pending.type]: state => {
	// 		state.isLoading = true
	// 	},
	// 	[fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
	// 		state.isLoading = false
	// 		state.error = action.payload
	// 	}
	// }
})

export default userSlice.reducer

export const { logout, setUser } = userSlice.actions
