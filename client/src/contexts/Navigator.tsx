import { createContext, useContext, useState } from 'react'

import TaxPage from '../pages/TaxPage/TaxPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotYetImplementedPage from '../pages/NotYetImplementedPage/NotYetImplementedPage'

export enum Pages {
    LOGIN,
    TAX,
    NOT_IMPLEMENTED
}

export const NavigationContextState = createContext(Pages.LOGIN)
export const NavigationContextSetter = createContext<React.Dispatch<React.SetStateAction<Pages>>>(() => {})

export const useNavigation = () => useContext(NavigationContextSetter)
// MAYBE: Add hook for subscribing to navigationState, aka currentPage.

export default function Navigator() {

    const [currentPage, setCurrentPage] = useState(Pages.LOGIN)

    const getCurrentPage = (): JSX.Element => {
    	switch(currentPage) {
      		case Pages.LOGIN: return <LoginPage/>
      		case Pages.TAX  : return <TaxPage/>
            default         : return <NotYetImplementedPage/>
    	}
  	}

    return (
        <NavigationContextState.Provider value={currentPage}>
            <NavigationContextSetter.Provider value={setCurrentPage}>
                {getCurrentPage()}
            </NavigationContextSetter.Provider>
        </NavigationContextState.Provider>

    )
}