import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Steps, message, theme } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { string } from 'zod'

import Judge from '@/assets/svg/orderItem/judge'
import CreateOrderForm from '@/components/pages/createOrder/CreateOrderForm'
import { useAppDispatch, useAppSelector } from '@/hook/redux'
import { setCategory } from '@/store/reducer/createOrderSlice'

const orderItems = [
	{
		id: 1,
		name: 'Суд',
		logoSvg: <Judge />,
		description: 'Представительство интересов в суде'
	},
	{
		id: 2,
		name: 'Нотариус',
		logoSvg: <Judge />,
		description: 'Представительство интересов в нотариальной конторе'
	},
	{
		id: 3,
		name: 'Составление документов',
		logoSvg: <Judge />,
		description: 'Договоры, заявления, жалобы...'
	},
	{
		id: 4,
		name: 'Риелтор',
		logoSvg: <Judge />,
		description: 'Помощь в покупке/продаже недвижимости'
	},
	{
		id: 5,
		name: 'Полиция',
		logoSvg: <Judge />,
		description: 'Помощь в решении проблем с полицией'
	},
	{
		id: 6,
		name: 'Юридические лица',
		logoSvg: <Judge />,
		description: 'Помощь в решении проблем с юридических лиц'
	},
	{
		id: 7,
		name: 'Следствие',
		logoSvg: <Judge />,
		description: 'Помощь в решении проблем с следствием'
	},
	{
		id: 8,
		name: 'ЗПП',
		logoSvg: <Judge />,
		description: 'Закон о защите прав потребителей'
	},
	{
		id: 9,
		name: 'ЖКХ',
		logoSvg: <Judge />,
		description: 'Жилищно-коммунальное хозяйство'
	},
	{
		id: 10,
		name: 'Иная',
		logoSvg: <Judge />,
		description: 'Помощь в решении проблем с другими организациями'
	}
]

const steps = [
	{
		title: 'Выберете категорию',
		content: 'First-content'
	},
	{
		title: 'Заполните данные',
		content: 'Second-content'
	},
	{
		title: 'Готово? Отправьте заявку!',
		content: 'Last-content'
	}
]

const { Meta } = Card

function createOrder() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const from = ((location.state as any)?.from.pathname as string) || `/profile`

	const { title, description, date, category, price } = useAppSelector(state => state.createOrder)

	const { token } = theme.useToken()
	const [current, setCurrent] = useState(0)

	const next = () => {
		setCurrent(current + 1)
	}

	const prev = () => {
		setCurrent(current - 1)
	}

	const selectOrder = (category: string) => {
		next()
		dispatch(setCategory(category))
	}

	const disabled = () => {
		if (current === 0 && !category) {
			return true
		}
		return current === 1 && !title && !description && !date && !price
	}

	const postOrder = async () => {
		const response = await fetch(`http://localhost:4000/product/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${document.cookie.split('=')[1]}`
			},
			body: JSON.stringify({
				title,
				description,
				date,
				category,
				price
			})
		})

		if (response.status === 201) {
			message.success('Заявка успешно создана')
			navigate(from, { state: { from: location.pathname } })
		}
		if (response.status === 401) {
			message.error('Необходимо авторизоваться')
			navigate('/login')
		}
		if (response.status === 500) {
			message.error('Произошла ошибка')
		}
	}

	const items = steps.map(item => ({ key: item.title, title: item.title }))

	const currentTab = useMemo(() => {
		switch (current) {
			case 0:
				return (
					<div className='flex mx-auto max-w-7xl: flex-wrap max-w-7xl: justify-center   px-2 sm:px-6 lg:px-8'>
						{orderItems.map(item => (
							<Card
								onClick={() => selectOrder(item.name)}
								key={item.id}
								hoverable
								size={'small'}
								className='py-3 mx-2 max-w-[250px]  max-w-7xl: my-2'
								cover={item.logoSvg}
							>
								<Meta title={item.name} description={item.description} />
							</Card>
						))}
					</div>
				)
			case 1:
				return <CreateOrderForm />
			case 2:
				return (
					<div className='overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-screen-md'>
						<Card bordered={false} style={{ width: 400 }}>
							<Meta
								avatar={orderItems.find(item => item.name === category)?.logoSvg}
								title={category}
								description={`${description}  ${title} за ${price} рублей, до ${date}`}
							/>
						</Card>
					</div>
				)
			default:
				return <div>404</div>
		}
	}, [current])

	return (
		<>
			<Steps current={current} items={items} />
			<div className='flex my-16 '>{currentTab}</div>
			<div style={{ marginTop: 24 }}>
				{current > 0 && (
					<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
						Предыдущий
					</Button>
				)}
				{current < steps.length - 1 && (
					<Button disabled={disabled()} type='primary' onClick={() => next()}>
						Следующий
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type='primary' onClick={postOrder}>
						Отправить
					</Button>
				)}
			</div>
		</>
	)
}

export default createOrder
