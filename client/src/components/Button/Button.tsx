import './Button.css'

interface ButtonProps {
    text: string
    onClick: () => void
    color?: string
    Icon?: any
}

export default function Button({text, onClick, color = 'black', Icon}: ButtonProps): JSX.Element {
    return (
        <button onClick={onClick}> {Icon !== undefined && <Icon color='white'/>} {text}</button>
    )
}