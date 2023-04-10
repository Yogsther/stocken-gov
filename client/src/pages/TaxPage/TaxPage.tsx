import Button from "../../components/Button";
import SidebarLayout from "../../components/SidebarLayout/SidebarLayout";

import './TaxPage.css'

interface TaxPageProps {
    
}
export default function TaxPage({}: TaxPageProps): JSX.Element {
    return (
        <SidebarLayout>
            <div className='tax-overview-container'>
                <div className='content-column'>
                    <h1>Preliminary Tax</h1>
                    <h4>Week 13</h4>
                </div>

                <div className='action-column'>
                    <h1>Actions</h1>
                    <Button text='Declare' onClick={() => {}}/>
                </div>
            </div>
        </SidebarLayout>
    )
}