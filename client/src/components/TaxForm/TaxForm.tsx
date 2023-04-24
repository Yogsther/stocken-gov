import FormTitleRow from './TitleRow'
import Row from './Row'
import Diamond from '../../assets/pngs/diamond.png'
import Coal from '../../assets/pngs/coal.png'
import Gold from '../../assets/pngs/raw_gold.png'
import Iron from '../../assets/pngs/raw_iron.png'
import VSpace from '../VSpace'

import DeductedResource from '../../types/DeductedResource'
import { useState } from 'react'

const mockData: DeductedResource[] = [
    {
    resourceRow: {
        resource: 'Diamond',
        incomeAmount: 20,
        taxPercent: 10,
        taxAmount: 2,
        icon: Diamond
    },
    deduct: 0,
    },
    {
        resourceRow: {
            resource: 'Raw Gold',
            incomeAmount: 20,
            taxPercent: 10,
            taxAmount: 2,
            icon: Gold
        },
        deduct: 0,
    },
    {
        resourceRow: {
            resource: 'Raw Iron',
            incomeAmount: 20,
            taxPercent: 10,
            taxAmount: 2,
            icon: Iron
        },
        deduct: 0,
    },
    {
        resourceRow: {
            resource: 'Coal',
            incomeAmount: 20,
            taxPercent: 10,
            taxAmount: 2,
            icon: Coal
        },
        deduct: 0,
    },
]

export default function TaxForm(): JSX.Element {

    const [taxForm, setTaxForm] = useState<DeductedResource[]>(mockData)

    // This causes an update of the entire state even though only part of it was updated.
    // Should be OK. As long as re-render time is < 16 ms.
    const updateDeduction = (resource: string, amount: number): void => {
        const index = taxForm.findIndex((dr: DeductedResource) => dr.resourceRow.resource === resource)

        // Create copy of state
        let temp = [...taxForm]

        // Calculate new deduction with prior state.
        temp[index] = {
            ...temp[index],
            deduct: amount
        }
        setTaxForm(temp)
    }

    return (
        <table>
            <thead>
                <FormTitleRow/>
            </thead>
            <tbody>
                {getRows(taxForm, updateDeduction)}
            </tbody>
        </table>
    )
}

function getRows(rows: DeductedResource[], onDeductChange: (arg0: string, arg1: number) => void) {
    return rows.map((row: DeductedResource) => <><Row
                    icon={row.resourceRow.icon}
                    title={row.resourceRow.resource}
                    subtext={row.resourceRow.taxPercent + ' % tax rate'}
                    incomeAmount={row.resourceRow.incomeAmount}
                    taxAmount={row.resourceRow.taxAmount}
                    deduct={row.deduct}
                    onDeductChange={(amount: number) => onDeductChange(row.resourceRow.resource, amount)}
                    key={row.resourceRow.resource}
                />
                <VSpace/>
                </>
    )
}