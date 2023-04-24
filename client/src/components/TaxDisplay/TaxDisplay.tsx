import Row from './Row'
import TitleRow from './TitleRow'
import VSpace from '../VSpace'

import ResouceRow from '../../types/ResourceRow'

import './TaxDisplay.css'

interface TaxDisplayProps {
    rows: ResouceRow[]
}

export default function TaxDisplay({rows}: TaxDisplayProps): JSX.Element {
    return (
        <table>
            <thead>
                <TitleRow/>
            </thead>
            <tbody>
                {getRows(rows)}
            </tbody>
        </table>
    )
}

function getRows(rows: any) {
    return rows.map((row: any) => <><Row
                    icon={row.icon}
                    title={row.resource}
                    subtext={row.taxPercent + ' % tax rate'}
                    incomeAmount={row.incomeAmount}
                    taxAmount={row.taxAmount}
                    key={row.resource}
                />
                <VSpace/>
                </>
    )
}