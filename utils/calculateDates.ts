export const calculateDates = (expirationDate: Date | undefined) => {
	if (expirationDate) {
		const countDownDate = new Date(expirationDate).getTime()
		const now = new Date().getTime()
		const distance = countDownDate - now
		const remainDays = Math.floor(distance / (1000 * 60 * 60 * 24))

		return remainDays
	}
}
