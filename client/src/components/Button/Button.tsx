import './Button.css'

interface ButtonProps {
    text: string
    onClick: () => void
    color?: string
    Icon?: any
    width?: string
}

export default function Button({text, onClick, color = 'black',width = '100%', Icon}: ButtonProps): JSX.Element {
    return (
        <button onClick={onClick} style={{width, backgroundColor: color}}> {Icon !== undefined && <Icon color='white'/>} {text}</button>
    )
}