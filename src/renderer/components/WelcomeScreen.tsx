type WelcomeScreenProps = {
	onStart: () => void;
};

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
	return (
		<div className="text-center pt-64">
			<h1 className="text-4xl font-bold mb-10">Welcome to Your Notes App!</h1>
			<button
				className="py-3 px-6 bg-gray-200 text-blue-500 rounded-full font-semibold text-lg hover:opacity-85"
				onClick={onStart}
			>
				🪐 Create Your First Note
			</button>
		</div>
	);
};

export default WelcomeScreen;
