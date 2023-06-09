import Input from './Input'
import Button from './Button/Button'
import VSpace, { Sizing } from './VSpace'
import { FormEvent, useState } from 'react'

interface LoginFormProps {
    onSignIn: () => void
}

export default function LoginForm({ onSignIn }: LoginFormProps): JSX.Element {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [error, setError] = useState<string>('_')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSignIn = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        fetch(process.env.REACT_APP_API_URL + '/api/login',
        {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        }
    )
        .then(async (res) => {
            if (res.status === 401) {
                setError('Incorrect credentials.')
                setLoading(false)
            }
            if (res.status === 200) {
                onSignIn()
                setLoading(false)
            }
        })
        .catch(() => {
            setLoading(false)
            setError('There was a networking error.')
        })
    }

    return (
        <form id='login-form' onSubmit={handleSignIn}>
            <div style={{ width: '100%' }}>
                <h1 className='gray-50'>stocken.gov</h1>
                <h1>Sign In</h1>

                <Input placeholder='Username' type='text' value={username} onChange={setUsername} />
                <VSpace amount={Sizing.DOUBLE} />

                <Input placeholder='Password' type='password' value={password} onChange={setPassword} />
                <p className='muted-text'>Don't have credentials? Use /setpassword in game</p>
                <VSpace amount={Sizing.DOUBLE} />

                <Button text='Sign In' type="submit" loading={loading} />

                <p
                    className='muted-text error'
                    style={error === '_' ? { opacity: 0 } : { opacity: 1 }}
                >
                    {error}
                </p>
            </div>
        </form>
    )
}