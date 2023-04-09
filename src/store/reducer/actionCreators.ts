import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IUser } from '@/types/IUser'

import { useAppDispatch } from '@/hook/redux'
import { setUser } from '@/store/reducer/userSlice'

// export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
// 	const cookie = document.cookie
// 	const accessToken = cookie.split('=')[1]
// 	const dispatch = useAppDispatch()
// 	const response = await axios.get<IUser>('http://localhost:4000/users/me', {
// 		headers: {
// 			Authorization: `Bearer ${accessToken}`
// 		}
// 	})
// 	console.log('response', response.data)
// 	dispatch(setUser(response.data))
// 	return response.data
// })
