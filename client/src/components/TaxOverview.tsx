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

    const date = new Date(data!.due)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
    const year = date.getFullYear()

	return (
		<div className='tax-overview-container'>
                <div className='content-column'>
                    <h1>Preliminary Tax</h1>
                    <h4>Week {getWeek(date)}</h4>
                    <TaxDisplay rows={TaxReportToResourceRowArr(data!)}/>
                    <p style={{fontWeight: 700}}>Delcare by: {year}-{month}-{day}</p>
                </div>

                <div className='action-column'>
                    <h1>Actions</h1>
                    <Button text='Declare' onClick={onDeclareAction}/>
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