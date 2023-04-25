import BackButton from "./BackButton"
import TaxForm from "./TaxForm/TaxForm"

interface DeclareProps {
    onBack: () => void
}

export default function Declare({onBack}: DeclareProps): JSX.Element {
	return (
		<>
			<BackButton text="Return to home" onClick={onBack}/>
			<h1>Declare Tax</h1>
			<h4>Week X</h4>
			<TaxForm/>
		</>
	)
}