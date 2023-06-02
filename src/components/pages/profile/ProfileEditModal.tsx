import { TextField } from '@mui/material'
import { Modal, ModalProps, notification } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { TypeOf, number, object, string } from 'zod'

import { useAppSelector } from '@/hook/redux'
import { userAPI } from '@/services/userService'
import { phoneRegExp } from '@/utils/phone-number'

const registerSchemaModal = object({
	email: string().min(1, 'Укажите адрес электронной почты').email('Адрес электронной почты недействителен').trim(),
	surname: string().min(1, 'Требуется фамилия').trim(),
	name: string().min(1, 'Требуется имя ').trim(),
	age: number().max(1, 'Ого'),
	phone: number()
		.min(1, 'Укажите номер телефона')
		.refine(value => phoneRegExp.test(String(value)), 'Не верный номер')
})

const validationSchema = yup.object({
	email: yup.string().email('Адрес электронной почты недействителен'),
	surname: yup.string(),
	name: yup.string(),
	age: yup.number().max(100, 'Ого'),
	phone: yup.string().min(11).max(11, 'Не верный номер').matches(phoneRegExp, 'Не верный номер'),
	description: yup.string().max(1000, 'Максимум 1000 символов')
})

export type RegisterInputModal = TypeOf<typeof registerSchemaModal>

const ProfileEditModal = ({ open, onCancel, title }: ModalProps) => {
	const [updateUser, { isLoading, isSuccess, isError, error }] = userAPI.useUpdateUserMutation()
	const [api, contextHolder] = notification.useNotification()

	const user = useAppSelector(state => state.userState.user)

	const formik = useFormik({
		initialValues: {
			email: user?.email || '',
			surname: user?.surname || '',
			name: user?.name || '',
			age: user?.age || 0,
			phone: user?.phone || 0,
			description: user?.description || '',
			showPassword: false
		},
		validationSchema: validationSchema,

		validateOnBlur: true,
		enableReinitialize: true,
		validateOnChange: true,
		onSubmit: () => {
			updateUser(formik.values)
				.unwrap()
				.catch(err => {
					api.error({
						message: 'Ошибка',
						description: err.data.message,
						placement: 'topRight',
						duration: 5
					})
				})
		}
	})

	const onOk = () => {
		formik.handleSubmit()
	}
	const handleClickShowPassword = () => {
		formik.setFieldValue('showPassword', !formik.values.showPassword)
	}

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	useEffect(() => {
		if (isSuccess) {
			api.success({
				message: 'Успешно',
				description: 'Данные успешно обновлены',
				placement: 'topRight'
			})
		}
	}, [isSuccess])

	return (
		<>
			{contextHolder}
			<Modal
				title={title}
				open={open}
				onOk={onOk}
				confirmLoading={isLoading}
				cancelButtonProps={{
					disabled: isLoading
				}}
				onCancel={onCancel}
				destroyOnClose
				okButtonProps={{
					disabled: !!formik.errors.email || !!formik.errors.surname || !!formik.errors.name || !!formik.errors.phone
				}}
			>
				<div className='mt-6  w-full'>
					<div className='relative flex items-center justify-center'>
						<TextField
							className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
							id='outlined-basic'
							label='Электронная почта'
							name='email'
							value={formik.values.email || user?.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={!!formik.touched.email && !!formik.errors.email}
							// helperText='Incorrect entry.'
						/>
					</div>
				</div>
				<div className='mt-6  w-full'>
					<div className='relative flex items-center justify-center'>
						<TextField
							className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
							id='outlined-basic'
							label='Фамилия'
							aria-label='Surname'
							name='surname'
							onBlur={formik.handleBlur}
							value={formik.values.surname || user?.surname}
							onChange={formik.handleChange}
							error={!!formik.touched.surname && !!formik.errors.surname}
							// helperText='Incorrect entry.'
						/>
					</div>
				</div>
				<div className='mt-6  w-full'>
					<div className='relative flex items-center justify-center'>
						<TextField
							className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
							id='outlined-basic'
							label='Имя'
							aria-label='Name'
							name='name'
							onBlur={formik.handleBlur}
							value={formik.values.name || user?.name}
							onChange={formik.handleChange}
							error={!!formik.touched.name && !!formik.errors.name}
							// helperText='Incorrect entry.'
						/>
					</div>
				</div>
				<div className='mt-6  w-full'>
					<div className='relative flex items-center justify-center'>
						<TextField
							className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
							id='outlined-basic'
							label='Возраст'
							onBlur={formik.handleBlur}
							aria-label='Age'
							name='age'
							value={formik.values.age || user?.age}
							onChange={formik.handleChange}
							error={!!formik.touched.age && !!formik.errors.age}
							helperText={formik.errors.age ? 'Неужели вам больше 100?' : ''}
						/>
					</div>
				</div>
				<div className='mt-6  w-full'>
					<div className='relative flex items-center justify-center'>
						<TextField
							className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
							id='outlined-basic'
							label='Телефон'
							onBlur={formik.handleBlur}
							aria-label='Phone'
							name='phone'
							value={formik.values.phone || user?.phone}
							onChange={formik.handleChange}
							error={!!formik.touched.phone && !!formik.errors.phone}
							helperText={formik.errors.phone && formik.touched.phone ? 'Номер телефона должен быть в формате 7 999 999-99-99' : ''}
						/>
					</div>
				</div>
				<div className='mt-6  w-full'>
					<div className='relative flex items-center justify-center'>
						<TextField
							className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
							id='outlined-basic'
							label='Описание'
							onBlur={formik.handleBlur}
							aria-label='Description'
							name='description'
							value={formik.values.description || user?.description}
							error={!!formik.touched.description && !!formik.errors.description}
							onChange={formik.handleChange}
							helperText={formik.errors.description && formik.touched.description ? 'Описание не обязательно для заполнения' : ''}
						/>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default ProfileEditModal
