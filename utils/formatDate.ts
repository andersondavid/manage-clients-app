export const formatDate = (date: Date) => {
	let fixMonth = date.getMonth() + 1;
	let addZeroToMouth = fixMonth < 10 ? "0" + fixMonth : fixMonth;

	let day = date.getDate();
	let month = addZeroToMouth;
	let year = date.getFullYear().toString().substring(4, 2);

	return `${day}/${month}/${year}`;
};
