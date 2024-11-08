import { useEffect } from "react";

// Custom hook to debounce a save function call
const useDebouncedSave = (value: any, delay: number, saveFn: () => void) => {
	useEffect(() => {
		// Set a timeout to invoke the save function after the specified delay
		const handler = setTimeout(() => {
			saveFn();
		}, delay);

		// Cleanup function to clear the timeout if dependencies change or on unmount
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay, saveFn]); // Re-run effect when value, delay, or saveFn change
};

export default useDebouncedSave;
