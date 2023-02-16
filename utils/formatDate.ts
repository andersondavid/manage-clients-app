export const formatDate = (iSOString: string | Date) => {

	const date = new Date(iSOString)

	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear().toString().substring(4, 2)

	return `${day}/${month}/${year}`
}
