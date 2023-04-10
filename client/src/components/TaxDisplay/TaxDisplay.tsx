import TaxDisplayRow from '../TaxDisplayRow/TaxDisplayRow'
import TitleRow from '../TitleRow/TitleRow'
import VSpace from '../VSpace'

export interface ResouceRow {
    resource: string
    incomeAmount: number,
    taxPercent: number,
    taxAmount: number,
    icon: string
}

interface TaxDisplayProps {
    rows: ResouceRow[]
}

export default function TaxDisplay({rows}: TaxDisplayProps): JSX.Element {
    return (
        <>
            <TitleRow/>
            {getRows(rows)}
        </>
    )
}

function getRows(rows: any) {
    return rows.map((row: any) => <><TaxDisplayRow
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