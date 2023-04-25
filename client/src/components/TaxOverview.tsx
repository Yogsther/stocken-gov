import useFetch from "../hooks/useFetch"
import ResourceRow from "../types/ResourceRow"
import TaxReport from "../types/TaxReport"
import Button from "./Button"
import Spinner from "./Spinner/Spinner"
import TaxDisplay from "./TaxDisplay/TaxDisplay"

import Diamond from '../assets/pngs/diamond.png'
import Coal from '../assets/pngs/coal.png'
import Gold from '../assets/pngs/raw_gold.png'
import Iron from '../assets/pngs/raw_iron.png'
import UnknownIcon from '../assets/pngs/unknown.png'

interface TaxOverviewProps {
    onDeclareAction: () => void
}

export default function TaxOverview({onDeclareAction}: TaxOverviewProps): JSX.Element {

    const {data, loading, error} = useFetch<TaxReport>(process.env.REACT_APP_API_URL + '/api/currentReport')

    if(loading) return <Spinner/>

    if(error) return (
        <>
            <h1>Something went wrong while loading tax report.</h1>
            <h4>Reload the page to try again.</h4>
            <p>{error.message}</p>
        </>
    )

	return (
		<div className='tax-overview-container'>
                <div className='content-column'>
                    <h1>Preliminary Tax</h1>
                    <h4>Week 13</h4>
                    <TaxDisplay rows={TaxReportToResourceRowArr(data!)}/>
                </div>

                <div className='action-column'>
                    <h1>Actions</h1>
                    <Button text='Declare' onClick={onDeclareAction}/>
                </div>
            </div>
	)
}

function TaxReportToResourceRowArr(report: TaxReport): ResourceRow[] {
    let resources: ResourceRow[] = []
    console.log(report.income)

    for(const key in report.income) {
        const value = report.income[key]
        resources.push({
            resource: key,
            incomeAmount: value,
            taxPercent: 10,
            // TODO: This is wrong. Dont calculate tax based on magic number in frontend. Use report.tax field.
            taxAmount: Math.floor(value * 0.1),
            icon: getIcon(key)
        })
    }
    return resources
}

function getIcon(key: string) {
    switch(key) {
        case "DIAMOND":  return Diamond
        case "COAL":     return Coal
        case "RAW_IRON": return Iron
        case "RAW_GOLD": return Gold
        default:         return UnknownIcon
    }
}