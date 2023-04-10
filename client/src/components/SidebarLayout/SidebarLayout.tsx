import Sidebar from "../Sidebar/Sidebar"
import './SidebarLayout.css'

interface SidebarLayoutProps {
    sidebar?: JSX.Element
    children: JSX.Element[] | JSX.Element
}
export default function SidebarLayout({sidebar = <Sidebar/>, children}: SidebarLayoutProps): JSX.Element {
    return (
        <div className='sidebar-layout-grid'>
            <div className='sidebar-container'>
                {sidebar}
            </div>
            <div className='content-container'>
                {children}
            </div>
        </div>
    )
}