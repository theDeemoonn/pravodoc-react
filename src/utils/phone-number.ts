export const phoneFormat = (value: string) => {
	return value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5')
}

export const phoneFormatDash = (value: string) => {
	return value.replace(/[^0-9]/g, '').replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3-$4-$5')
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
