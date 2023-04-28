interface DeclareIconProps {
    color: string
}

export default function DeclareIcon({color}: DeclareIconProps) {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.125 18.925H12.875V17.925H14.25C14.5212 17.925 14.7349 17.8493 14.8909 17.6981C15.047 17.5468 15.125 17.3412 15.125 17.0812V13.7C15.125 13.4429 15.047 13.2328 14.8909 13.0696C14.7349 12.9065 14.5192 12.825 14.2438 12.825H10.625V11.2H15.125V9.47495H12.875V8.47495H11.125V9.47495H9.75C9.47875 9.47495 9.2651 9.55412 9.10905 9.71245C8.95301 9.87078 8.875 10.075 8.875 10.325V13.7062C8.875 13.9733 8.95301 14.1849 9.10905 14.3409C9.2651 14.4969 9.48081 14.575 9.7562 14.575H13.375V16.2H8.875V17.925H11.125V18.925ZM5.725 22.525C5.12875 22.525 4.60051 22.3007 4.1403 21.8522C3.6801 21.4036 3.45 20.8695 3.45 20.25V3.74995C3.45 3.12348 3.6801 2.58353 4.1403 2.1301C4.60051 1.67667 5.12875 1.44995 5.725 1.44995H14.825L20.575 7.14995V20.25C20.575 20.8695 20.3424 21.4036 19.8773 21.8522C19.4122 22.3007 18.8781 22.525 18.275 22.525H5.725ZM13.4 7.17495V3.74995H5.725V20.25H18.275V7.17495H13.4Z" fill={color}/>
    </svg>
    
}