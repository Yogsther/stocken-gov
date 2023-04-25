import useFetch from "../hooks/useFetch"
import TaxReport from "../types/TaxReport"
import BackButton from "./BackButton"
import Spinner from "./Spinner/Spinner"
import TaxForm from "./TaxForm/TaxForm"

interface DeclareProps {
    onBack: () => void
}

export default function Declare({onBack}: DeclareProps): JSX.Element {
    
    const {data, loading, error} = useFetch<TaxReport>(process.env.REACT_APP_API_URL + '/api/currentReport')

    if(loading) return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}>
            <Spinner/>
        </div>
    )

    if(error) return (
        <>
            <h1>Something went wrong while loading tax report.</h1>
            <h4>Reload the page to try again.</h4>
            <p>{error.message}</p>
        </>
    )

    // Data will never be undefined when rendering has gotten to this point,
    // therefore the non-null assertion on data.
	return (
		<>
			<BackButton text="Return to home" onClick={onBack}/>
			<h1>Declare Tax</h1>
			<h4>Week X</h4>
			<TaxForm taxReport={data!}/>
		</>
	)
}