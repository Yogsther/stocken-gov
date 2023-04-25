// npm
import { useState } from "react"

// Components
import SidebarLayout from "../../components/SidebarLayout/SidebarLayout"
import TaxOverview from "../../components/TaxOverview"

// Svgs
import Diamond from '../../assets/pngs/diamond.png'
import Coal from '../../assets/pngs/coal.png'
import Gold from '../../assets/pngs/raw_gold.png'
import Iron from '../../assets/pngs/raw_iron.png'

// Types
import ResouceRow from "../../types/ResourceRow"

// CSS
import './TaxPage.css'
import Declare from "../../components/Declare"

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
          case Subpages.OVERVIEW: return <TaxOverview onDeclareAction={() => setCurrentSubpage(Subpages.DECLARE)}/>
          case Subpages.DECLARE : return <Declare onBack={() => setCurrentSubpage(Subpages.OVERVIEW)}/>
        }
      }

    return (
        <SidebarLayout>
			{getCurrentPage()}
        </SidebarLayout>
    )
}