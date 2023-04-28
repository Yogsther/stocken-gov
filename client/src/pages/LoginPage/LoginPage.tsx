import LoginForm from '../../components/LoginForm'
import './LoginPage.css'
import Icon from '../../assets/svgs/logo.svg'
import { Pages, useNavigation } from '../../contexts/Navigator'

export default function LoginPage() {
    
    const navigate = useNavigation()

    return (
        <div id='login-page-container'>
            <LoginForm onSignIn={() => navigate(Pages.TAX)}/>
            <div id='logo-container'>
                <img src={Icon} alt='logo' height='400px' style={{paddingTop: '4rem'}}/>
            </div>
        </div>
    )
}