interface InputProps {
    placeholder: string
    type?: string
    value: any
    onChange: any
}

export default function Input({placeholder, type = 'text', value, onChange}: InputProps): JSX.Element {
    return (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
    />
    )
}