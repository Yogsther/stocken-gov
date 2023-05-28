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
import Declare from "../../components/Declare/Declare"
import DeclareConfirmation from "../../components/DeclareConfirmation"
import TaxReport from "../../types/TaxReport"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    DECLARE,
    DECLARE_CONFIRMATION
}

/**
 * The tax-section of the site.
 * 
 *
 * Example usage:
 *     <TaxPage/>
 *
 * @author Christoffer Billman
 * @version 1.0
 * @since 2023-04-10
 */

export default function TaxPage(): JSX.Element {

    const [currentSubpage, setCurrentSubpage] = useState<Subpages>(Subpages.OVERVIEW)
    const [declareReport, setDeclareReport] = useState<TaxReport | null>(null)

    const switchDeclaredReportAndPage = (report: TaxReport) => {
        setDeclareReport(report)
        setCurrentSubpage(Subpages.DECLARE)
    }

    const getCurrentPage = (): JSX.Element => {
        switch(currentSubpage) {
          case Subpages.OVERVIEW: return <TaxOverview onDeclareAction={switchDeclaredReportAndPage}/>
          case Subpages.DECLARE : return (
            <Declare
                onBack={() => setCurrentSubpage(Subpages.OVERVIEW)}
                onSubmitSuccess={() => setCurrentSubpage(Subpages.DECLARE_CONFIRMATION)}
                report={declareReport!}
            />)
          case Subpages.DECLARE_CONFIRMATION: return <DeclareConfirmation onBack={() => setCurrentSubpage(Subpages.OVERVIEW)} reportId={declareReport!._id}/>
        }
      }

    return (
        <SidebarLayout>
			{getCurrentPage()}
        </SidebarLayout>
    )
}