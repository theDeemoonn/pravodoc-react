import { Button, ButtonProps, ConfigProvider } from 'antd'
import React from 'react'

export function AntButton({ type, size, loading, children, ...props }: ButtonProps) {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#ffffff'
				}
			}}
		>
			<Button loading={loading} size={size} type={type} {...props}>
				{children}
			</Button>
		</ConfigProvider>
	)
}
