import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { isArray } from 'lodash'
import { stringify } from 'qs'

interface HttpError {
	error?: string
	message?: string | string[]
}

function parseJSON<T>(response: AxiosResponse<T>) {
	return response.data
}

async function checkStatus<T extends HttpError>(response: AxiosResponse<T>) {
	if (response && response.status && response.status >= 200 && response.status < 300) {
		return response
	}

	const error = response.data

	if (error.error === 'UNIQUE_CONSTRAINT_IN_DEAL_EXTERNAL_CODE') {
		throw error
	}

	if (error.error === 'PARTNER_DEACTIVATED') {
		throw error
	}

	if (isArray(error.message)) {
		throw error.message.join(', ')
	}

	throw error.message
}

export async function request<T>(url: string, config?: AxiosRequestConfig) {
	const baseURL = 'http://localhost:4000/auth'

	return axios(url, {
		...config,
		baseURL,
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
			'Content-Type': 'application/json',
			'x-office-id': localStorage.getItem('office_id') || '',
			...config?.headers
		},
		onUploadProgress: config?.onUploadProgress
	})
		.then(async data => {
			const response = await checkStatus(data)

			return parseJSON(response)
		})
		.catch(async data => {
			const response: any = await checkStatus(data.response)

			return parseJSON(response)
		})
}
