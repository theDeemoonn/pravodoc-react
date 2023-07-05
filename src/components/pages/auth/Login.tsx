import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TypeOf, object, string } from 'zod'

import FaceBook from '@/assets/svg/facebook'
import { useLoginUserMutation } from '@/services/authApiService'
import { AntButton } from '@/ui'

const loginSchema = object({
	email: string().min(1, 'Укажите адрес электронной почты').email('Адрес электронной почты недействителен').trim(),
	password: string().min(1, 'Необходим пароль').min(6, 'Пароль должен быть больше 6 символов').max(32, 'Пароль должен быть меньше 32 символов')
})

export type LoginInput = TypeOf<typeof loginSchema>

function Login() {
	const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation()
	const [api, contextHolder] = notification.useNotification()

	const navigate = useNavigate()
	const location = useLocation()
	const from = ((location.state as any)?.from.pathname as string) || `/profile`
	const [passwordShown, setPasswordShown] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema)
	})

	useEffect(() => {
		if (isSuccess) {
			api.success({
				message: 'Успешно',
				description: 'Вы вошли в аккаунт',
				placement: 'topRight'
			})
			setTimeout(() => {
				navigate(from)
			}, 500)
		}
	}, [isSuccess])

	const handleClickShowPassword = () => {
		setPasswordShown(!passwordShown)
	}

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const onSubmit = async (data: LoginInput) => {
		await loginUser(data).unwrap()
		api.success({
			message: 'Успешно',
			description: 'Вы вошли в аккаунт',
			placement: 'topRight'
		})
	}

	const onErrors: SubmitErrorHandler<LoginInput> = data => {
		api.error({
			message: data.email?.message || data.password?.message,
			description: 'Ошибка',
			placement: 'topRight',
			duration: 5
		})
	}

	return (
		<div className='h-full bg-gradient-to-tl from-white-600 to-indigo-900 w-full py-16 px-4 '>
			{contextHolder}
			<div className='flex flex-col items-center justify-center max-sm:p-5'>
				<img className='h-24 w-24' src='src/assets/img/logo@2x.webp' alt={''} />

				<div className='bg-white shadow-xl rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 max-sm:p-5'>
					<p className='focus:outline-none text-2xl font-extrabold leading-6 text-gray-800'>Войти в аккаунт</p>
					<p className='focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500'>
						Нет аккаунта?{' '}
						<Link
							to='/register'
							className='hover:text-gray-5 00 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer'
						>
							{' '}
							Зарегистрироваться
						</Link>
					</p>
					<form onSubmit={handleSubmit(onSubmit, onErrors)}>
						<div className='mt-6  w-full'>
							<div className='relative flex items-center justify-center'>
								<TextField
									className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
									id='outlined-basic'
									label='Электронная почта'
									placeholder='Электронная почта'
									{...register('email')}
									error={!!errors.email}
								/>
							</div>
						</div>
						<div className='mt-6  w-full'>
							<div className='relative flex items-center justify-center'>
								<FormControl
									sx={{
										width: 500,
										maxWidth: '100%'
									}}
									variant='outlined'
								>
									<InputLabel htmlFor='outlined-adornment-password'>Пароль</InputLabel>
									<OutlinedInput
										id='outlined-adornment-password'
										placeholder='Пароль'
										{...register('password')}
										type={passwordShown ? 'text' : 'password'}
										error={!!errors.password}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password visibility'
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge='end'
												>
													{passwordShown ? <EyeInvisibleOutlined /> : <EyeOutlined />}
												</IconButton>
											</InputAdornment>
										}
										label={'Пароль'}
									/>
								</FormControl>
							</div>
						</div>

						<div className='mt-8  justify-center items-center flex'>
							<AntButton className='flex w-48  justify-center hover:text-white hover:bg-green-500' loading={isLoading} htmlType={'submit'}>
								Войти
							</AntButton>
						</div>
					</form>
					<div className='w-full flex items-center justify-between py-5'>
						<hr className='w-full bg-gray-400' />
						<p className='text-base font-medium leading-4 px-2.5 text-gray-400'>ИЛИ</p>
						<hr className='w-full bg-gray-400  ' />
					</div>
					<div className='flex justify-center gap-5 w-full '>
						<button
							type='submit'
							className='w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500'
						>
							<svg className='w-4 mr-2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
								<path
									fill='#EA4335'
									d='M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z'
								/>
								<path
									fill='#34A853'
									d='M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z'
								/>
								<path
									fill='#4A90E2'
									d='M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z'
								/>
								<path
									fill='#FBBC05'
									d='M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z'
								/>
							</svg>
							<span>Google</span>
						</button>
						<button
							type='submit'
							className='w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:text-white hover:bg-gray-900 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500 px-'
						>
							<FaceBook />

							<span>Facebook</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
