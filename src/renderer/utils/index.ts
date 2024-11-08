// Function to generate a random numeric ID of specified length
export const generateNumericID = (length = 8) => {
	const max = Math.pow(10, length);
	const min = Math.pow(10, length - 1);
	return Math.floor(Math.random() * (max - min)) + min;
};