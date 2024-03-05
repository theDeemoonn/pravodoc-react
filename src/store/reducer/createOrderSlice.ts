import { createSlice } from '@reduxjs/toolkit'

interface CreateOrderSliceState {
	category: string
	title: string
	description: string
	price: string
	date: string
	userID: string
}

const initialState: CreateOrderSliceState = {
	category: '',
	title: '',
	description: '',
	price: '',
	date: '',
	userID: ''
}

export const createOrderSlice = createSlice({
	name: 'createOrder',
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.category = action.payload
		},
		setTitle: (state, action) => {
			state.title = action.payload
		},
		setDescription: (state, action) => {
			state.description = action.payload
		},
		setPrice: (state, action) => {
			state.price = action.payload
		},
		setDate: (state, action) => {
			state.date = action.payload
		},
		setUserID: (state, action) => {
			state.userID = action.payload
		}
	}
})

export default createOrderSlice.reducer

export const { setCategory, setDate, setDescription, setTitle, setPrice } = createOrderSlice.actions
