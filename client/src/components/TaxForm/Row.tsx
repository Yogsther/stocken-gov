import HSpace from '../HSpace'
import ItemIcon from '../ItemIcon/ItemIcon'
import NumberInput from '../NumberInput'

interface TaxDisplayRowProps {
    icon: any
    title: string
    subtext: string
    incomeAmount: number
    deduct: number
    onDeductChange: any
    taxAmount: number
}

export default function Row({icon, title, subtext, incomeAmount, taxAmount, deduct, onDeductChange}: TaxDisplayRowProps): JSX.Element {
    return (
        <tr>
            <td className='td-resource'>
                <ItemIcon icon={icon}/>
                <HSpace/>
                <div>
                    <p style={{fontWeight: 700}}>{title}</p>
                    <p className='muted-text'>{subtext}</p>
                </div>
            </td>
            <td>
                <h2>{incomeAmount}</h2>
            </td>
            <td>
                <h2>{taxAmount}</h2>
            </td>
            <td>
                <NumberInput value={deduct} onChange={onDeductChange}/>
            </td>
            <td>
                <h2>{taxAmount - deduct}</h2>
            </td>
        </tr>
    )
}