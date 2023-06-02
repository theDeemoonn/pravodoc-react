import { TextField } from '@mui/material'
import { DatePicker, DatePickerProps } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { useFormik } from 'formik'
import React, { useCallback } from 'react'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '@/hook/redux'
import { setDate, setDescription, setPrice, setTitle } from '@/store/reducer/createOrderSlice'
import { AntButton } from '@/ui'

const validationSchema = yup.object({
	title: yup.string().required('Укажите название').max(20),
	description: yup.string().required('Укажите описание').max(350),
	price: yup.number().required('Укажите цену'),
	data: yup.string().required('Укажите дату')
})
const CreateOrderForm = () => {
	const dispatch = useAppDispatch()
	const { title, description, price, date } = useAppSelector(state => state.createOrder)

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			price: '',
			category: '',
			data: ''
		},
		validationSchema: validationSchema,

		onSubmit: () => {
			dispatch(setTitle(formik.values.title))
			dispatch(setDescription(formik.values.description))
			dispatch(setPrice(formik.values.price))
			dispatch(setDate(formik.values.data))
		}
	})

	const onChange = (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: [string, string] | string) => {
		formik.setFieldValue('data', dateString)
	}

	const formikValue = (value: string) =>
		useCallback(() => {
			if (value === 'title') {
				return title
			} else if (value === 'description') {
				return description
			} else if (value === 'price') {
				return price
			} else if (value === 'data') {
				return date
			}
		}, [title, description, price, date])

	const onOk = (value: DatePickerProps['value']) => {
		// value && formik.setFieldValue('data', value.format('MM-DD-YYYY HH:mm'))
	}

	return (
		<div className='h-full bg-gradient-to-tl from-white-600 to-indigo-900 w-full  px-4 '>
			<div className='flex flex-col items-center justify-center max-sm:p-5'>
				<div className='bg-white shadow-xl rounded lg:w-[550px]  md:w-[450px] w-full p-10  max-sm:p-5'>
					<div className='mt-6  w-full'>
						<div className='relative flex items-center justify-center'>
							<TextField
								className=' border rounded text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
								id='outlined-basic'
								label='Краткое описание'
								name='title'
								value={formik.values.title ? formik.values.title : title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={!!formik.errors.title && !!formik.touched.title}
								// helperText='Incorrect entry.'
							/>
						</div>
					</div>
					<div className='mt-6  w-full'>
						<div className='relative flex items-center justify-center'>
							<TextField
								className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
								id='outlined-basic'
								label='Описание'
								name='description'
								value={formik.values.description ? formik.values.description : description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={!!formik.errors.description && !!formik.touched.description}
								// helperText='Incorrect entry.'
							/>
						</div>
					</div>
					<div className='mt-6  w-full'>
						<div className='relative flex items-center justify-center'>
							<TextField
								className=' border rounded  text-s font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
								id='outlined-basic'
								label='Плата за услугу'
								name='price'
								value={formik.values.price ? formik.values.price : price}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={!!formik.errors.price && !!formik.touched.price}
								// helperText='Incorrect entry.'
							/>
						</div>
					</div>
					<div className='mt-6  w-full'>
						<div className='relative flex items-center justify-center'>
							<DatePicker
								placeholder={'Выберет дату и время'}
								showTime={{ format: 'HH:mm' }}
								onChange={onChange}
								onOk={(value: DatePickerProps['value']) => onOk(value)}
								format={'DD-MM-YYYY HH:mm'}
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center justify-center mt-6'>
					<AntButton className='flex w-48  justify-center hover:text-white hover:bg-green-500' onClick={() => formik.handleSubmit()}>
						Применить
					</AntButton>
				</div>
			</div>
		</div>
	)
}

export default CreateOrderForm
