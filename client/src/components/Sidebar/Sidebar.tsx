import './Sidebar.css'
import Logo from '../../assets/svgs/logo.svg'
import SidebarItem from '../SidebarItem/SidebarItem'
import Money from '../../assets/svgs/Money'
import Courthouse from '../../assets/svgs/Courthouse'
import Map from '../../assets/svgs/Map'

export default function Sidebar() {

    return (
        <div className='sidebar'>
            <div className='center-logo'>
                <img src={Logo} alt='logo' width='125px'/>
            </div>

            <div className='sidebar-items'>
                <SidebarItem text='Tax' icon={<Money color='var(--gray-20)'/>} onClick={() => ''}/>
                <SidebarItem text='Law' icon={<Courthouse color='var(--gray-20)'/>} onClick={() => ''}/>
                <SidebarItem text='Map' icon={<Map color='var(--gray-20)'/>} onClick={() => ''}/>
            </div>
        </div>
    )
}