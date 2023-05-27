import Button from "../Button/Button"
import TaxReport from '../../types/TaxReport'
import "./TaxCard.css"
import getWeek from "../../utils/getWeek"

interface TaxCardProps {
	taxReport: TaxReport
	onDeclareAction: (report: TaxReport) => void
}

export default function TaxCard({taxReport, onDeclareAction}: TaxCardProps): JSX.Element {

	const now = Date.now()
	const openForDeclaration = taxReport.valid_until < now
	const isDue = taxReport.due < now

	if(isDue) return (
		<div className='tax-card-container'>
			<div className='tax-card-title-row'>
				<h4>Week {getWeek(new Date(taxReport.valid_until))}</h4>
				<h4>Due</h4>
			</div>
			
			<p>+1 penalty per resouce per day</p>
			<Button text='Declare' onClick={() => onDeclareAction(taxReport)} />
		</div>
	)

	return (
		<div className='tax-card-container'>
			<div className='tax-card-title-row'>
				<h4>Week {getWeek(new Date(taxReport.valid_until))}</h4>
				<h4>{openForDeclaration ? 'Open for declaration' : 'Cannot declare yet'}</h4>
			</div>
			
			<p>Description</p>
			This report is ready for declaration.
			<Button text='Declare' onClick={() => {onDeclareAction(taxReport)}} />
		</div>
	)
}