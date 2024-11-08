type EditorButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	icon: string;
	active?: boolean;
};

// EditorButton component to render a button with an icon and optional active styling
const EditorButton = ({ onClick, disabled = false, active = false, icon }: EditorButtonProps) => {
	// Default button class styles with conditional active styling
	let classNames = "p-3 rounded hover:bg-gray-600 disabled:opacity-50 disabled:hover:bg-transparent";

	// Apply active button style if the 'active' prop is true
	if (active) {
		classNames += " bg-gray-600";
	}

	return (
		<button onClick={onClick} disabled={disabled} className={classNames}>
			<img src={icon} className="w-5" />
		</button>
	);
};


export default EditorButton;
