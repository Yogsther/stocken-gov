import '../TaxDisplayRow/TaxDisplayRow.css'

export default function TaxDisplayRow(): JSX.Element {
    return (
       <div className='tax-display-row-container'>
            {/* God forgive my sins for this. It looks awful: */}
            <p style={{paddingRight: 'calc(1rem + 72px)',fontWeight: 700 }}>Resource</p>
            <p style={{paddingLeft: '20%', fontWeight: 700 }}>Income</p>
            <p style={{paddingLeft: '15%', fontWeight: 700 }}>Tax</p>
       </div>
    )
}