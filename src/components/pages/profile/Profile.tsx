import { PaperClipIcon } from '@heroicons/react/20/solid'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import avatar from '@/assets/img/avatar.png'
import { useAppSelector } from '@/hook/redux'
import { userAPI } from '@/services/userService'

const Profile = () => {
	const { data: user } = userAPI.useFetchUserByIdQuery(null, {
		skip: false,
		refetchOnMountOrArgChange: true,
		refetchOnReconnect: true
	})

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
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{user.phone}</dd>
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
							<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Attachments</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
									<ul role='list' className='divide-y divide-gray-200 rounded-md border border-gray-200'>
										<li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
											<div className='flex w-0 flex-1 items-center'>
												<PaperClipIcon className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
												<span className='ml-2 w-0 flex-1 truncate'>resume_back_end_developer.pdf</span>
											</div>
											<div className='ml-4 flex-shrink-0'>
												<a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
													Download
												</a>
											</div>
										</li>
										<li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
											<div className='flex w-0 flex-1 items-center'>
												<PaperClipIcon className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
												<span className='ml-2 w-0 flex-1 truncate'>coverletter_back_end_developer.pdf</span>
											</div>
											<div className='ml-4 flex-shrink-0'>
												<a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
													Download
												</a>
											</div>
										</li>
									</ul>
								</dd>
							</div>
						</dl>
					</div>
				)}
			</div>
		</>
	)
}

export { Profile }
