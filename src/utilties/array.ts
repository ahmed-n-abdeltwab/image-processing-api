const findString = (array: string[], str?: string):string|undefined|null => {
	if(!str) return null;
	return array.find((element) => {
		if (element.toLowerCase().includes(str.toLowerCase())) return true;
	});
};
export default {
	findString,
};
