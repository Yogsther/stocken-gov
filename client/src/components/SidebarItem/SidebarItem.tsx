import './SidebarItem.css'
import DefaultIcon from '../../assets/svgs/DefaultIcon'
import HSpace, {Sizing} from '../HSpace'

interface SidebarItemProps {
    onClick: () => void
    icon?: any
    text: string
}

export default function SidebarItem({text,icon = DefaultIcon,onClick}: SidebarItemProps) {
    return (
        <div className='item-container' onClick={onClick}>
            {icon}
            <HSpace amount={Sizing.HALF}/>
            <h3>{text}</h3>
        </div>
    )
}