interface InputProps {
    placeholder?: string
    type?: string
    value: any
    onChange: any
}

export default function Input({placeholder = '00', value, onChange}: InputProps): JSX.Element {
    return (
    <input
        style={{width: '100px', textAlign: 'center', fontWeight: 700, fontSize: '1.5rem'}}
        type='tel'
        placeholder={placeholder}
        maxLength={3}
        value={value}
        onChange={e => onChange(e.target.value)}
    />
    )
}