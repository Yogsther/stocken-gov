import BackButton from "./BackButton"
import TaxDisplay from "./TaxDisplay/TaxDisplay"

import TaxReport, { TaxReportToResourceRowArr } from "../types/TaxReport"
import useFetch from "../hooks/useFetch"
import Spinner from "./Spinner/Spinner"

interface DeclareConfirmationProps {
    onBack: () => void
    reportId: string
}

export default function DeclareConfirmation({onBack, reportId}: DeclareConfirmationProps): JSX.Element {

    const {data, loading, error} = useFetch<TaxReport[]>(process.env.REACT_APP_API_URL + '/api/reports?id='+ reportId)

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
    
	return (
		<>
			<BackButton text="Return to home" onClick={onBack}/>
			<h1>Tax report submitted</h1>
			<h4>Week X</h4>
            <p>The following resources have to be deposited in the town hall within 5 minutes.</p>
			<TaxDisplay rows={TaxReportToResourceRowArr(data![0])}/>
		</>
	)
}