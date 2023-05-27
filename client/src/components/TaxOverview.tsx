import useFetch, { FetchRequest } from "../hooks/useFetch"
import TaxReport, { TaxReportToResourceRowArr } from "../types/TaxReport"
import Spinner from "./Spinner/Spinner"
import TaxCard from "./TaxCard/TaxCard"
import TaxDisplay from "./TaxDisplay/TaxDisplay"

import getWeek from "../utils/getWeek"
import { ReactNode } from "react"

interface TaxOverviewProps {
    onDeclareAction: (report: TaxReport) => void
}

export default function TaxOverview({onDeclareAction}: TaxOverviewProps): JSX.Element {

    const preliminary = useFetch<TaxReport>(process.env.REACT_APP_API_URL + '/api/reports/preliminary')
    const current     = useFetch<TaxReport[]>(process.env.REACT_APP_API_URL + '/api/reports/current')
    const due         = useFetch<TaxReport[]>(process.env.REACT_APP_API_URL + '/api/reports/due')

    let textColor = 'black'
    if(preliminary.data?.signed) textColor = '#1ae86c' // Green
    else if(preliminary.data && preliminary.data.due < Date.now()) textColor = '#e81a39' // Red

    // TODO: Save date on submitted and display here!

    let duetimestamp = preliminary.data && new Date(preliminary.data.due).toISOString().split('T')[0]
    let valid_untiltimestamp = preliminary.data && new Date(preliminary.data.valid_until).toISOString().split('T')[0]

	return (
		<div className='tax-overview-container'>
                <div className='content-column'>
                    <h1>Preliminary Tax</h1>

                    {getLoaderOrErr(preliminary)}

                    {preliminary.data && (
                    <>
                        <h4>Week {getWeek(new Date(preliminary.data.due))}</h4>
                        <TaxDisplay rows={TaxReportToResourceRowArr(preliminary.data)}/>
                        <p style={{fontWeight: 700, color: textColor}}>Due: {duetimestamp}</p>
                        <p style={{fontWeight: 700, color: textColor}}>Open for declaration: {valid_untiltimestamp}</p>
                    </>
                    )}

                </div>

                <div className='action-column'>
                    <h1>Can be declared</h1>
                    {getLoaderOrErr(current)}
                    {current.data?.length === 0 && <p>You have no reports that can be declared, yeehaw 🤠</p>}
                    {current.data?.map(report => <TaxCard key={report._id} taxReport={report} onDeclareAction={onDeclareAction}/>)}
                    
                    <h1>Due</h1>
                    {getLoaderOrErr(due)}
                    {current.data?.length === 0 && <p>You have no due reports 🥳</p>}
                    {due.data?.map(report => <TaxCard key={report._id} taxReport={report} onDeclareAction={onDeclareAction}/>)}
                </div>
            </div>
	)
}

function getLoaderOrErr(allReports: FetchRequest<TaxReport[] | TaxReport>): ReactNode {
    if(allReports.loading) return (
        <Spinner />
    )

    if(allReports.error) return (
        <>
            <h1>Something went wrong while loading tax report.</h1>
            <h4>Reload the page to try again.</h4>
            <p>{allReports.error.message}</p>
        </>
    )
}