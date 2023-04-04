export interface AuthUser {
	id: string
	email: string
}

export interface IAuthUser {
	accessToken: string
	refreshToken: string
	id: number
}

export interface IGenericResponse {
	status: string
	message: string
}
