import { createContext, useContext, useState } from 'react'

import TaxPage from '../pages/TaxPage/TaxPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotYetImplementedPage from '../pages/NotYetImplementedPage/NotYetImplementedPage'

export enum Pages {
    LOGIN,
    TAX,
    NOT_IMPLEMENTED
}

// Context to store navigation state and setters in
export const NavigationContextState = createContext(Pages.LOGIN)
export const NavigationContextSetter = createContext<React.Dispatch<React.SetStateAction<Pages>>>(() => {})

/**
 * Provides a function that can be used to change what is currently displayed as the current page.
 * @returns A function which navigates between the different pages.
 */
export const useNavigation = () => useContext(NavigationContextSetter)
// MAYBE: Add hook for subscribing to navigationState, aka currentPage.

/**
 * Navigation provider for the entire website.
 * 
 * Example usage:
 *     <Navigator/>
 *
 * @author Christoffer Billman
 * @version 1.0
 * @since 2023-04-28
 */
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