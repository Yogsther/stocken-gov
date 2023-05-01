// React
import { useEffect, useState } from 'react'

// Components
import TransitionLifecycle from './components/TransitionLifecycle'

// Context
import Navigator from './contexts/Navigator'
import ThemeContextProvider from './contexts/ThemeContext'

// CSS
import './App.css'

export default function App() {
  	const [renderPage, setRenderPage] = useState<boolean>(false)

  	useEffect(() => setRenderPage(true), [])

  	return (
		<TransitionLifecycle
			transition={{
				initial:    { opacity: 0, transform: 'translateY(-25px)' },
				transition: { opacity: 1, transform: 'translateY(0)' },
				exit:       { opacity: 0, transform: 'translateY(25px)' },
				duration: 500
			}}
			willRender={renderPage}
		>
			<ThemeContextProvider>
				<Navigator/>
			</ThemeContextProvider>
		</TransitionLifecycle>
  )
}
