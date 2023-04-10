interface InputProps {
    placeholder?: string
    type?: string
    value: any
    onChange: any
}

export default function Input({placeholder = '00', value, onChange}: InputProps): JSX.Element {
    return (
    <input
        style={{width: '50px'}}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
    />
    )
}