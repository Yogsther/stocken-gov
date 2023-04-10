import { useState } from 'react'
import LoginPage from './pages/LoginPage/LoginPage'
import TaxPage from './pages/TaxPage/TaxPage'

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
      case Pages.LOGIN: return /*<LoginPage onSignIn={onSignIn}/> */ <TaxPage/>
      case Pages.TAX  : return <TaxPage/>
    }
  }

  return getCurrentPage()
}
