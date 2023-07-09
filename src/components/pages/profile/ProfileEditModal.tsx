import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@mui/material'
import { Modal, ModalProps, notification } from 'antd'
import React, { useEffect } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { TypeOf, object, string } from 'zod'

import { useAppSelector } from '@/hook/redux'
import { userAPI } from '@/services/userService'
import { phoneRegExp } from '@/utils/phone-number'

const registerSchemaModal = object({
	email: string().min(1, 'Укажите адрес электронной почты').email('Адрес электронной почты недействителен').trim(),
	surname: string().min(1, 'Требуется фамилия').trim(),
	name: string().min(1, 'Требуется имя ').trim(),
	age: string().min(1, 'Ого').max(100),
	phone: string()
		.min(1, 'Укажите номер телефона')
		.refine(value => phoneRegExp.test(String(value)), 'Не верный номер'),
	description: string().max(1000, 'Максимум 1000 символов').trim()
})

export type RegisterInputModal = TypeOf<typeof registerSchemaModal>

const ProfileEditModal = ({ open, onCancel, title }: ModalProps) => {
	const [updateUser, { isLoading, isSuccess, isError, error }] = userAPI.useUpdateUserMutation()
	const [api, contextHolder] = notification.useNotification()

	const user = useAppSelector(state => state.userState.user)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<RegisterInputModal>({
		resolver: zodResolver(registerSchemaModal)
	})

	const onOk = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		await handleSubmit(onSubmit)(e)
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

	const onSubmit = async (data: RegisterInputModal) => {
		await updateUser(data).unwrap()
	}

	const onErrors: SubmitErrorHandler<RegisterInputModal> = data => {
		api.error({
			message:
				data.email?.message || data.age?.message || data.name?.message || data.phone?.message || data.surname?.message || data.description?.message,
			description: 'Ошибка',
			placement: 'topRight',
			duration: 5
		})
	}

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
					disabled: !!errors.email || !!errors.name || !!errors.surname || !!errors.age || !!errors.phone || !!errors.description
				}}
			>
				<form onSubmit={handleSubmit(onSubmit, onErrors)}>
					<div className='mt-6  w-full'>
						<div className='relative flex items-center justify-center'>
							<TextField
								className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
								id='outlined-basic'
								label='Электронная почта'
								placeholder='Электронная почта'
								{...register('email', { required: true })}
								defaultValue={user?.email}
								error={!!errors.email}
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
								placeholder='Фамилия'
								{...register('surname', { required: true })}
								defaultValue={user?.surname}
								error={!!errors.surname}
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
								placeholder='Имя'
								{...register('name', { required: true })}
								defaultValue={user?.name}
								error={!!errors.name}
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
								aria-label='Age'
								placeholder='Возраст'
								{...register('age', { required: true })}
								defaultValue={user?.age}
								error={!!errors.age}
								helperText={!!errors.age ? 'Неужели вам больше 100?' : ''}
							/>
						</div>
					</div>
					<div className='mt-6  w-full'>
						<div className='relative flex items-center justify-center'>
							<TextField
								className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
								id='outlined-basic'
								label='Телефон'
								aria-label='Phone'
								placeholder='Телефон'
								{...register('phone', { required: true })}
								defaultValue={user?.phone}
								error={!!errors.phone}
								inputMode={'tel'}
								helperText={!!errors.phone ? 'Номер телефона должен быть в формате 7 999 999-99-99' : ''}
							/>
						</div>
					</div>
					<div className='mt-6  w-full'>
						<div className='relative flex items-center justify-center'>
							<TextField
								className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
								id='outlined-basic'
								label='Описание'
								aria-label='Description'
								placeholder='Описание'
								{...register('description', { required: true })}
								defaultValue={user?.description}
								error={!!errors.description}
								helperText={!!errors.description ? 'Описание не обязательно для заполнения' : ''}
							/>
						</div>
					</div>
				</form>
			</Modal>
		</>
	)
}

export default ProfileEditModal
