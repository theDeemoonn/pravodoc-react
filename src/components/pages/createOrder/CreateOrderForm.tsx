import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@mui/material'
import { DatePicker, DatePickerProps } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TypeOf, z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/hook/redux'
import { setDate, setDescription, setPrice, setTitle } from '@/store/reducer/createOrderSlice'
import { AntButton } from '@/ui'

const validationSchema = z.object({
	title: z.string().nonempty('Укажите название').max(20),
	description: z.string().nonempty('Укажите описание').max(350),
	price: z.string().nonempty('Укажите цену'),
	data: z.string().nonempty('Укажите дату')
})

export type FormData = TypeOf<typeof validationSchema>

const CreateOrderForm: React.FC = () => {
	const dispatch = useAppDispatch()
	const { title, description, price, date } = useAppSelector(state => state.createOrder)
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			title: '',
			description: '',
			price: '',
			data: ''
		}
	})

	const onSubmit = (data: FormData) => {
		dispatch(setTitle(data.title))
		dispatch(setDescription(data.description))
		dispatch(setPrice(data.price))
		dispatch(setDate(data.data))
	}

	const onChange = (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: [string, string] | string) => {
		setValue('data', dateString.toString())
	}

	return (
		<div className='h-full bg-gradient-to-tl from-white-600 to-indigo-900 w-full px-4'>
			<div className='flex flex-col items-center justify-center max-sm:p-5'>
				<div className='bg-white shadow-xl rounded lg:w-[550px] md:w-[450px] w-full p-10 max-sm:p-5'>
					<div className='mt-6 w-full'>
						<div className='relative flex items-center justify-center'>
							<TextField
								className='border rounded text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
								id='outlined-basic'
								label='Краткое описание'
								placeholder='Краткое описание'
								{...register('title')}
								error={!!errors.title}
								helperText={errors.title?.message}
							/>
						</div>
					</div>
					<div className='mt-6 w-full'>
						<div className='relative flex items-center justify-center'>
							<TextField
								className='border rounded text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
								id='outlined-basic'
								label='Описание'
								placeholder='Описание'
								{...register('description')}
								error={!!errors.description}
								helperText={errors.description?.message}
							/>
						</div>
					</div>
					<div className='mt-6 w-full'>
						<div className='relative flex items-center justify-center'>
							<TextField
								className='border rounded text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
								id='outlined-basic'
								label='Плата за услугу'
								placeholder='Плата за услугу'
								{...register('price')}
								error={!!errors.price}
								helperText={errors.price?.message}
							/>
						</div>
					</div>
					<div className='mt-6 w-full'>
						<div className='relative flex items-center justify-center'>
							<DatePicker placeholder='Выберет дату и время' showTime={{ format: 'HH:mm' }} onChange={onChange} format='DD-MM-YYYY HH:mm' />
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center justify-center mt-6'>
					<AntButton className='flex w-48 justify-center hover:text-white hover:bg-green-500' onClick={handleSubmit(onSubmit)}>
						Применить
					</AntButton>
				</div>
			</div>
		</div>
	)
}

export default CreateOrderForm
