import './ItemIcon.css'

interface ItemIconProps {
    icon: any
}

export default function ItemIcon({icon}: ItemIconProps): JSX.Element {
    return (
        <div className='item-icon-container'>
            <img src={icon} alt='icon' className='item-icon-img'/>
        </div>
    )
}