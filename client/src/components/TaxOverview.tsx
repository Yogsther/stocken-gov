import useFetch from "../hooks/useFetch"
import TaxReport, { TaxReportToResourceRowArr } from "../types/TaxReport"
import Button from "./Button/Button"
import Spinner from "./Spinner/Spinner"
import TaxDisplay from "./TaxDisplay/TaxDisplay"

interface TaxOverviewProps {
    onDeclareAction: () => void
}

export default function TaxOverview({onDeclareAction}: TaxOverviewProps): JSX.Element {

    const {data, loading, error} = useFetch<TaxReport>(process.env.REACT_APP_API_URL + '/api/currentReport')

    if(loading) return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}>
            <Spinner/>
        </div>
    )

    if(error) return (
        <>
            <h1>Something went wrong while loading tax report.</h1>
            <h4>Reload the page to try again.</h4>
            <p>{error.message}</p>
        </>
    )

    if(data === undefined) return (<></>) // To stop IDE from complaining about data possibly being undefined

    let textColor = 'black'
    if(data?.signed) textColor = '#1ae86c' // Green
    else if(data?.due < Date.now()) textColor = '#e81a39' // Red

    // TODO: Save date on submitted and display here!

    let timestamp = new Date(data.due).toISOString().split('T')[0]

    let canDeclare: boolean = data?.signed === false && data?.valid_until > Date.now()

	return (
		<div className='tax-overview-container'>
                <div className='content-column'>
                    <h1>Preliminary Tax</h1>
                    <h4>Week {getWeek(new Date(data.due))}</h4>
                    <TaxDisplay rows={TaxReportToResourceRowArr(data!)}/>
                    <p style={{fontWeight: 700, color: textColor}}>Declare by: {timestamp}</p>
                </div>

                <div className='action-column'>
                    <h1>Actions</h1>
                    <Button text='Declare' onClick={onDeclareAction} disabled={canDeclare}/>
                </div>
            </div>
	)
}

// Copied from GitHub
// https://gist.github.com/IamSilviu/5899269
// Should maybe be moved, lowers cohesion of TaxOverview.
function getWeek(today: Date) {
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}