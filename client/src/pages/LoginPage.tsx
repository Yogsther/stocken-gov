import LoginForm from '../components/LoginForm'
import Icon from '../assets/svgs/logo.svg'

interface LoginPageProps {
    onSignIn: () => void
}
export default function LoginPage({onSignIn}: LoginPageProps) {
    return (
        <div id='login-page-container'>
            <LoginForm onSignIn={onSignIn}/>
            <div id='logo-container'>
                <img src={Icon} alt='logo' height='400px' style={{paddingTop: '4rem'}}/>
            </div>
        </div>
    )
}