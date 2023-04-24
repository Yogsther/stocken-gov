import Button from "../../components/Button"
import SidebarLayout from "../../components/SidebarLayout/SidebarLayout"
import TaxDisplay from "../../components/TaxDisplay/TaxDisplay"
import TaxForm from "../../components/TaxForm/TaxForm"

import Diamond from '../../assets/pngs/diamond.png'
import Coal from '../../assets/pngs/coal.png'
import Gold from '../../assets/pngs/raw_gold.png'
import Iron from '../../assets/pngs/raw_iron.png'

import ResouceRow from "../../types/ResourceRow"

import './TaxPage.css'

/*interface TaxPageProps {
}*/

const mockData: ResouceRow[] = [
    {
        resource: 'Diamond',
        incomeAmount: 20,
        taxPercent: 10,
        taxAmount: 2,
        icon: Diamond
    },
    {
        resource: 'Coal',
        incomeAmount: 40,
        taxPercent: 10,
        taxAmount: 4,
        icon: Coal
    },
    {
        resource: 'Raw Iron',
        incomeAmount: 40,
        taxPercent: 10,
        taxAmount: 4,
        icon: Iron
    },
    {
        resource: 'Raw Gold',
        incomeAmount: 40,
        taxPercent: 10,
        taxAmount: 4,
        icon: Gold
    }
]

export default function TaxPage(): JSX.Element {

    return (
        <SidebarLayout>
            <div className='tax-overview-container'>
                <div className='content-column'>
                    <h1>Preliminary Tax</h1>
                    <h4>Week 13</h4>
                    <TaxDisplay rows={mockData}/>
                    <TaxForm/>
                </div>

                <div className='action-column'>
                    <h1>Actions</h1>
                    <Button text='Declare' onClick={() => {}}/>
                </div>
            </div>
        </SidebarLayout>
    )
}