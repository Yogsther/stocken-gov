import { useEffect, useState } from 'react'

import TransitionLifecycle from './components/TransitionLifecycle'
import Navigator from './contexts/Navigator'

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
			<Navigator/>
		</TransitionLifecycle>
  )
}
