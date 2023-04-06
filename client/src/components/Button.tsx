interface ButtonProps {
    text: string
    onClick: () => void
    color?: string
}

export default function Button({text, onClick, color = 'black'}: ButtonProps): JSX.Element {
    return (
        <button onClick={onClick}>{text}</button>
    )
}