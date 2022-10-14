const findString = (array: string[], str?: string): string | null => {
	if (!str) return null;
	const image = array.find((element) => {
		if (element.toLowerCase().includes(str.toLowerCase())) return true;
	});
	return image ? image : null;
};
export default {
	findString,
};
