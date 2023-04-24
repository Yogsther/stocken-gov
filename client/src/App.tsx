import { useEffect, useState } from 'react'
//import LoginPage from './pages/LoginPage/LoginPage'
import TaxPage from './pages/TaxPage/TaxPage'

import './App.css'
import TransitionLifecycle from './components/TransitionLifecycle'
import LoginPage from './pages/LoginPage/LoginPage'

enum Pages {
  LOGIN,
  TAX
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.TAX)
  const [renderPage, setRenderPage] = useState<boolean>(false)

  useEffect(() => setRenderPage(true), [])

  const onSignIn = () => setCurrentPage(Pages.TAX)

  const getCurrentPage = (): JSX.Element => {
    switch(currentPage) {
      case Pages.LOGIN: return <LoginPage onSignIn={onSignIn}/>
      case Pages.TAX  : return <TaxPage/>
    }
  }

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
		{getCurrentPage()}
	</TransitionLifecycle>
  )
}
