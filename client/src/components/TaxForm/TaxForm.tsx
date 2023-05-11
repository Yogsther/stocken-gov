import FormTitleRow from './TitleRow'
import Row from './Row'

import getIcon from '../../utils/getIcon'
import TaxReport from '../../types/TaxReport'

interface TaxFormProps {
    taxReport: TaxReport
    setTaxForm: any
}

export default function TaxForm({taxReport, setTaxForm}: TaxFormProps): JSX.Element {

    // This only works because taxReport is never allowed to be undefined.

    // This causes an update of the entire state even though only part of it was updated.
    // Should be OK. As long as re-render time is < 16 ms.
    const updateDeduction = (resource: string, amount: number): void => {
        // Create copy of state
        let temp: any = {...taxReport}

        // This is also so hacky :(.
        temp.deductions![resource] = amount
        setTaxForm(temp)
    }

    return (
        <table>
            <thead>
                <FormTitleRow/>
            </thead>
            <tbody>
                {getRows(taxReport, updateDeduction)}
            </tbody>
        </table>
    )
}

function getRows(report: TaxReport, onDeductChange: (arg0: string, arg1: number) => void): JSX.Element[] {
    let rows: JSX.Element[] = []

    for(const key in report.income) {
        let value = report.income[key]
        rows.push(
            <Row
                icon={getIcon(key)}
                title={key}
                subtext={10 + ' % tax rate'} // Replace with call to API
                incomeAmount={value}
                taxAmount={report.tax[key]}
                deduct={report.deductions[key] === undefined ? 0 : report.deductions[key] }
                onDeductChange={(amount: number) => onDeductChange(key, amount)}
                key={key}
            />
        )
    }
    return rows
}