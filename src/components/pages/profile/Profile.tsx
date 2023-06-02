import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

import avatar from '@/assets/img/avatar.png'
import ProfileEditModal from '@/components/pages/profile/ProfileEditModal'
import { userAPI } from '@/services/userService'
import { phoneFormatDash } from '@/utils/phone-number'

const Profile = () => {
	const [pollingInterval, setPollingInterval] = useState(0)
	const { data: user } = userAPI.useFetchUserByIdQuery(null, {
		refetchOnFocus: true,
		refetchOnReconnect: true,
		refetchOnMountOrArgChange: true,
		pollingInterval: pollingInterval
	})

	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleModalOpen = () => {
		setIsModalOpen(true)
	}

	const handleModalClose = () => {
		setIsModalOpen(false)
		setPollingInterval(100)
		setTimeout(() => {
			setPollingInterval(0)
		}, 105)
	}

	useEffect(() => {
		if (user) {
			document.title = `${user.surname} ${user.name} - Профиль`
		}
	}, [user])

	return (
		<>
			<h1>Профиль</h1>
			<div className='overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-screen-md'>
				<div className='flex justify-center py-2 items-center rounded-full'>
					<img className='rounded-full w-40 h-40' src={avatar} alt={'user avatar'} />
				</div>
				{user && (
					<div className='border-t border-gray-200'>
						<dl>
							<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>ФИО</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
									{user.surname} {user.name}
								</dd>
							</div>
							<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Телефон</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{phoneFormatDash(String(user?.phone))}</dd>
							</div>
							<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Email</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{user.email}</dd>
							</div>
							<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Возраст</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{user.age}</dd>
							</div>
							<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>О себе</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{user.description}</dd>
							</div>
							<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6'>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
									<ul role='list' className='divide-y divide-gray-200 rounded-md border border-gray-200'>
										<li className='flex items-center justify-end py-3 pl-3 pr-4 text-sm'>
											<div className='ml-4 flex-shrink-0'>
												<Button type={'link'} onClick={() => handleModalOpen()}>
													Редактировать профиль
												</Button>
											</div>
										</li>
										<li className='flex items-center justify-end py-3 pl-3 pr-4 text-sm'>
											<Button type={'link'} danger onClick={() => handleModalOpen()}>
												Удалить аккаунт
											</Button>
										</li>
									</ul>
								</dd>
							</div>
						</dl>
					</div>
				)}
			</div>
			<ProfileEditModal open={isModalOpen} onCancel={handleModalClose} title={'Изменение данных пользователя'} />
		</>
	)
}

export { Profile }
