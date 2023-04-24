import ChevronLeft from '../assets/svgs/chrevron-left.svg'

interface BackButtonProps {
    text: string
    onClick: () => void
}

export default function BackButton({text, onClick}: BackButtonProps): JSX.Element {
    return (
        <div onClick={onClick} style={{display: 'flex', cursor: 'pointer'}}>
            <img src={ChevronLeft} alt='<'/>
            <h2 style={{fontSize: '18px'}}>{text}</h2>
        </div>
    )
}