import ChevronLeft from '../assets/svgs/ChrevronLeft'

interface BackButtonProps {
    text: string
    onClick: () => void
}

export default function BackButton({text, onClick}: BackButtonProps): JSX.Element {
    return (
        <div onClick={onClick} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
            <ChevronLeft color='var(--text)'/>
            <h2 style={{fontSize: '18px'}}>{text}</h2>
        </div>
    )
}