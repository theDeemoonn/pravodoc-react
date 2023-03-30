import { HomeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

import './404.scss'
import { AntButton } from '@/ui'

function Page404() {
	return (
		<div className='b-page__wrap'>
			<div className='image-wrapper'>
				<div className='image-img'>
					<img src='src/assets/img/404_center.png' alt='' />
					<div className='image-img_left'>
						<img src='src/assets/img/404_left.png' alt='' />
					</div>

					<div className='image-img_right'>
						<img src='src/assets/img/404_right.png' alt='' />
					</div>
				</div>

				<div className='unsearched-wrapper'>
					<div className='unsearched-header'>Страница не найдена!</div>
					<div className='unsearched-text'>Страница, которую вы ищете, не существует или временно недоступна</div>

					<NavLink to={'/'}>
						<Button type='primary' size='large' icon={<HomeOutlined />}>
							Главная
						</Button>
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Page404
