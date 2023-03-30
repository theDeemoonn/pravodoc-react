import { notification } from 'antd'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'

import FaceBook from '@/assets/svg/facebook'
import { useAppDispatch } from '@/hook/redux'
import { useLoginMutation, useProtectedMutation } from '@/services/authService'
import { setCredentials } from '@/store/reducer/authSlice'
import { AntButton } from '@/ui'

export default function Auth() {
	const dispatch = useAppDispatch()
	const [login, { isLoading }] = useLoginMutation()
	const [api, contextHolder] = notification.useNotification()
	const { id } = useParams<{ id: string }>()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validateOnBlur: false,
		validateOnChange: false,
		enableReinitialize: true,
		onSubmit: () => {
			login(formik.values)
				.unwrap()
				.then(response => {
					dispatch(setCredentials(response))
					api.success({
						message: 'Успешно',
						description: 'Вы успешно авторизовались',
						placement: 'topRight',
						duration: 5
					})
				})
				.catch(error => {
					api.error({
						message: 'Ошибка',
						description: error.data.message,
						placement: 'topRight',
						duration: 5
					})
				})
		}
	})

	return (
		<div className='h-full bg-gradient-to-tl from-white-600 to-indigo-900 w-full py-16 px-4 '>
			{contextHolder}
			<div className='flex flex-col items-center justify-center max-sm:p-5'>
				<img className='h-24 w-24' src='src/assets/img/logo@2x.webp' alt={''} />

				<div className='bg-white shadow-xl rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 max-sm:p-5'>
					<p className='focus:outline-none text-2xl font-extrabold leading-6 text-gray-800'>Войти в аккаунт</p>
					<p className='focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500'>
						Нет аккаунта?{' '}
						<a className='hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer'>
							{' '}
							Зарегистрироваться
						</a>
					</p>

					<div className='mt-6  w-full'>
						<label id='email' className='text-sm font-medium leading-none text-gray-800'>
							Email
						</label>
						<div className='relative flex items-center justify-center'>
							<input
								aria-label='Email'
								name='email'
								value={formik.values.email || ''}
								onChange={formik.handleChange}
								className='bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
							/>
						</div>
					</div>
					<div className='mt-6  w-full'>
						<label htmlFor='pass' className='text-sm font-medium leading-none text-gray-800'>
							Password
						</label>
						<div className='relative flex items-center justify-center'>
							<input
								aria-label='Пароль'
								name='password'
								type={'password'}
								value={formik.values.password || ''}
								onChange={formik.handleChange}
								className='bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
							/>
							<div className='absolute right-0 mt-2 mr-3 cursor-pointer'>
								<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z'
										fill='#71717A'
									/>
								</svg>
							</div>
						</div>
					</div>
					<div className='mt-8  justify-center items-center flex'>
						<AntButton
							className='flex w-48  justify-center hover:text-white hover:bg-green-500'
							loading={isLoading}
							onClick={() => formik.handleSubmit()}
						>
							Войти
						</AntButton>
					</div>
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
