import { Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'

import { IUser } from '@/types/IUser'

import { useAppDispatch, useAppSelector } from '@/hook/redux'
import { useProtectedMutation } from '@/services/authService'
import { userAPI } from '@/services/userService'

const navigation = [
	{ name: 'Разместить заказ', href: '#', current: true },
	{ name: 'Team', href: '#', current: false },
	{ name: 'Projects', href: '#', current: false },
	{ name: 'Calendar', href: '#', current: false }
]

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ')
}

//TODO: add redux notifications
const solutions = [
	{
		name: 'Insights',
		description: 'Measure actions your users take',
		href: '##'
	},
	{
		name: 'Automations',
		description: 'Create your own targeted content',
		href: '##'
	},
	{
		name: 'Reports',
		description: 'Keep track of your growth',
		href: '##'
	}
]

const HeaderComponent = () => {
	const dispatch = useAppDispatch()
	const { user: userData } = useAppSelector(state => state.authReducer)
	const { id } = useParams()
	const { data: user } = userAPI.useFetchUserByIdQuery(id?.toString() || '')
	const [attemptAccess, { data, error, isLoading }] = useProtectedMutation()

	return (
		<Disclosure as='nav' className='bg-gray-800'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>Open main menu</span>
									{open ? <XMarkIcon className='block h-6 w-6' aria-hidden='true' /> : <Bars3Icon className='block h-6 w-6' aria-hidden='true' />}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
									<Link to={'/'}>
										<img className='block h-8 w-auto lg:hidden' src='src/assets/img/logo@2x.webp' alt='Your Company' />
										<img className='hidden h-8 w-auto lg:block' src='src/assets/img/logo@2x.webp' alt='Your Company' />
									</Link>
								</div>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex space-x-4'>
										{navigation.map(item => (
											<NavLink
												key={item.name}
												to={item.href}
												className={classNames(
													item.current
														? 'bg-gray-900 text-white no-underline hover:bg-green-500'
														: 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</NavLink>
										))}
									</div>
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<Popover className='relative'>
									{({ open }) => (
										<>
											<Popover.Button
												className={`
                ${open ? '' : 'text-opacity-90'}
                rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
											>
												<span className='sr-only'>View notifications</span>
												<BellIcon
													className={`${open ? '' : 'text-opacity-70'}
                  h-6 w-6`}
													aria-hidden='true'
												/>
											</Popover.Button>
											<Transition
												as={Fragment}
												enter='transition ease-out duration-200'
												enterFrom='opacity-0 translate-y-1'
												enterTo='opacity-100 translate-y-0'
												leave='transition ease-in duration-150'
												leaveFrom='opacity-100 translate-y-0'
												leaveTo='opacity-0 translate-y-1'
											>
												<Popover.Panel className='absolute left-1/2 z-10 mt-3 w-auto max-w-sm -translate-x-1/2 transform px-4 sm:px-0 '>
													<div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
														<div className='relative grid gap-8 bg-white p-7'>
															{solutions.map(item => (
																<a
																	key={item.name}
																	href={item.href}
																	className='-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
																>
																	<div className='flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12'>
																		{/*<item.icon aria-hidden="true" />*/}
																	</div>
																	<div className='ml-4'>
																		<p className='text-sm font-medium text-gray-900'>{item.name}</p>
																		<p className='text-sm text-gray-500'>{item.description}</p>
																	</div>
																</a>
															))}
														</div>
														<div className='bg-gray-50 p-4'>
															<a
																href='##'
																className='flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
															>
																<span className='flex items-center'>
																	<span className='text-sm font-medium text-gray-900'>Documentation</span>
																</span>
																<span className='block text-sm text-gray-500'>Start integrating products and tools</span>
															</a>
														</div>
													</div>
												</Popover.Panel>
											</Transition>
										</>
									)}
								</Popover>

								{/* Profile dropdown */}
								<Menu as='div' className='relative ml-3'>
									<div>
										<Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
											<span className='sr-only'>Open user menu</span>
											<img className='h-8 w-8 rounded-full' src='src/assets/img/avatar.png' alt='user avatar' />
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
											<Menu.Item>
												{({ active }) => (
													<Link
														to={user ? `/profile/${userData.id}` : '/login'}
														className={classNames(active ? 'bg-gray-100' : '', 'no-underline block px-4 py-2 text-sm text-gray-700')}
													>
														Профиль
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<Link to='#' className={classNames(active ? 'bg-gray-100' : '', 'no-underline block px-4 py-2 text-sm text-gray-700')}>
														Мои заказы
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<Link to='#' className={classNames(active ? 'bg-gray-100' : '', 'no-underline block px-4 py-2 text-sm text-gray-700')}>
														Выйти
													</Link>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pt-2 pb-3'>
							{navigation.map(item => (
								<Disclosure.Button
									key={item.name}
									as='a'
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white no-underline hover:bg-green-500 text-center'
											: 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white text-center',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default HeaderComponent
