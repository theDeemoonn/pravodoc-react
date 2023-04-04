import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IAuthUser, IGenericResponse } from '@/types/authUser'

import { LoginInput } from '@/components/pages/auth/Auth'
import { RegisterInput } from '@/components/pages/auth/Register'
import { userAPI } from '@/services/userService'

const BASE_URL = 'http://localhost:4000'

export const authAPI = createApi({
	reducerPath: 'authAPI',

	baseQuery: fetchBaseQuery({
		baseUrl: `${BASE_URL}/auth/`
	}),

	endpoints: builder => ({
		registerUser: builder.mutation<IAuthUser, RegisterInput>({
			query(data) {
				return {
					url: 'registration',
					method: 'POST',
					body: data
				}
			}
		}),
		loginUser: builder.mutation<{ user: IAuthUser; accessToken: string; status: string }, LoginInput>({
			query(data) {
				return {
					url: 'login',
					method: 'POST',
					body: data,
					credentials: 'include'
				}
			},

			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					await dispatch(userAPI.endpoints.fetchUserById.initiate(null))
				} catch (error) {}
			}
		}),
		verifyEmail: builder.mutation<IGenericResponse, { verificationCode: string }>({
			query({ verificationCode }) {
				return {
					url: `verifyemail/${verificationCode}`,
					method: 'GET'
				}
			}
		}),
		logoutUser: builder.mutation<void, void>({
			query() {
				return {
					url: 'logout',
					credentials: 'include'
				}
			}
		})
	})
})

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation, useVerifyEmailMutation } = authAPI
