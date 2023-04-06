import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import TaxPage from './pages/TaxPage'

import './App.css'

enum Pages {
  LOGIN,
  TAX
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.LOGIN)

  const onSignIn = () => setCurrentPage(Pages.TAX)

  const getCurrentPage = (): JSX.Element => {
    switch(currentPage) {
      case Pages.LOGIN: return <LoginPage onSignIn={onSignIn}/>
      case Pages.TAX  : return <TaxPage/>
    }
  }

  return getCurrentPage()
}
