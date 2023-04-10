import HSpace, { Sizing } from '../HSpace'
import ItemIcon from '../ItemIcon/ItemIcon'
import NumberInput from '../NumberInput'
import './TaxFormRow.css'

interface TaxDisplayRowProps {
    icon: any
    title: string
    subtext: string
    incomeAmount: number
    deduct: number
    onDeductChange: any
    taxAmount: number
}

export default function TaxDisplayRow({icon, title, subtext, incomeAmount, taxAmount, deduct, onDeductChange}: TaxDisplayRowProps): JSX.Element {
    return (
       <div className='tax-display-row-container'>
            <ItemIcon icon={icon}/>
            <div style={{paddingLeft: '1rem'}}>
                <p style={{fontWeight: 700}}>{title}</p>
                <p className='muted-text'>{subtext}</p>
            </div>
            <h2 style={{paddingLeft: '20%'}}>{incomeAmount}</h2>
            <h2 style={{paddingLeft: '20%'}}>{taxAmount}</h2>
            <HSpace amount={Sizing.QUAD}/>
            <NumberInput value={deduct} onChange={onDeductChange}/>
       </div>
    )
}