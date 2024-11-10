// Function to generate a random numeric ID of specified length
export const generateNumericID = (length = 8) => {
	const max = Math.pow(10, length);
	const min = Math.pow(10, length - 1);
	return Math.floor(Math.random() * (max - min)) + min;
};

// Function to validate an image URL format and return an error message if invalid
export const validateImageUrl = (imageUrl: string): string | null => {
	const imageUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i;

	if (!imageUrl) {
		return "Image URL is required";
	}

	if (!imageUrlPattern.test(imageUrl)) {
		return "Invalid image URL";
	}

	return null;
};
