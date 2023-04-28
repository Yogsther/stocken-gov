import LoginForm from '../../components/LoginForm'
import './LoginPage.css'
import Icon from '../../assets/svgs/logo.svg'
import { Pages, useNavigation } from '../../contexts/Navigator'

/**
 * Login-page on the site.
 * 
 *
 * Example usage:
 *     <LoginPage/>
 *
 * @author Christoffer Billman
 * @version 1.0
 * @since 2023-04-10
 */
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