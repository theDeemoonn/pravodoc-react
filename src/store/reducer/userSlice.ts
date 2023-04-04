import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/types/IUser'
import { IAuthUser } from '@/types/authUser'

interface IUserState {
	user: IUser | null
}

const initialState: IUserState = {
	user: null
}

export const userSlice = createSlice({
	initialState,
	name: 'userSlice',
	reducers: {
		logout: () => {
			localStorage.removeItem('access_token')
			return initialState
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
		}
	}
})

export default userSlice.reducer

export const { logout, setUser } = userSlice.actions
