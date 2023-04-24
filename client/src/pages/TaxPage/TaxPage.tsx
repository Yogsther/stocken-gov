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
import { useState } from "react"
import BackButton from "../../components/BackButton"

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

enum Subpages {
    OVERVIEW,
    DECLARE
  }

export default function TaxPage(): JSX.Element {

    const [currentSubpage, setCurrentSubpage] = useState<Subpages>(Subpages.OVERVIEW)

    const getCurrentPage = (): JSX.Element => {
        switch(currentSubpage) {
          case Subpages.OVERVIEW: return getOverview(setCurrentSubpage)
          case Subpages.DECLARE : return getDeclare(setCurrentSubpage)
        }
      }

    return (
        <SidebarLayout>
			{getCurrentPage()}
        </SidebarLayout>
    )
}

function getDeclare(setPage: Function): JSX.Element {
	return (
		<>
			<BackButton text="Return to home" onClick={() => setPage(Subpages.OVERVIEW)}/>
			<h1>Declare Tax</h1>
			<h4>Week X</h4>
			<TaxForm/>
		</>
	)
}

function getOverview(setPage: Function): JSX.Element {
	return (
		<div className='tax-overview-container'>
                <div className='content-column'>
                    <h1>Preliminary Tax</h1>
                    <h4>Week 13</h4>
                    <TaxDisplay rows={mockData}/>
                </div>

                <div className='action-column'>
                    <h1>Actions</h1>
                    <Button text='Declare' onClick={() => setPage(Subpages.DECLARE)}/>
                </div>
            </div>
	)
}