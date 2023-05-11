import { useEffect, useState } from "react"
import DeclareIcon from "../../assets/svgs/DeclareIcon"
import useFetch from "../../hooks/useFetch"
import TaxReport from "../../types/TaxReport"
import BackButton from "../BackButton"
import Button from "../Button/Button"
import Spinner from "../Spinner/Spinner"
import TaxForm from "../TaxForm/TaxForm"
import VSpace from "../VSpace"

import './Declare.css'
import SignableField from "../SignableField/SignableField"

interface DeclareProps {
    onBack: () => void
    onSubmitSuccess: () => void
}

export default function Declare({ onBack, onSubmitSuccess }: DeclareProps): JSX.Element {

    const { data, loading, error } = useFetch<TaxReport>(process.env.REACT_APP_API_URL + '/api/currentReport')

    const [taxForm, setTaxForm] = useState<TaxReport>(data!)

    useEffect(() => {
        if(data !== undefined) setTaxForm(data)
    }, [data])

    const [submitError, setSubmitError] = useState('')

    const [hasSigned, setHasSigned] = useState(false)

    const handleSubmitForm = () => {
        console.log(data)

        fetch(process.env.REACT_APP_API_URL + '/api/deductReport',
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taxForm)
            }
        )
            .then(async (res) => {
                if (res.status === 200) {
                    onSubmitSuccess()
                    return
                }
                setSubmitError('Something went wrong when submitting declaration.')

            })
            .catch(() => setSubmitError('There was a networking error.'))
    }

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
            <Spinner />
        </div>
    )

    if (error) return (
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
            <BackButton text='Return to home' onClick={onBack} />
            <h1>Declare Tax</h1>
            <h4>Week X</h4>
            <TaxForm taxReport={data!} setTaxForm={setTaxForm} />
            <VSpace />
            <div className='sign-container'>
                <p>Sign here:</p>
                <SignableField setHasBeenSigned={setHasSigned} />
                <VSpace />
                <div className='submit-container'>
                    <p className='muted-text'>Signing and submitting is an irreversible action. Once the tax form is submitted, you are legally bound to pay the amounts submitted.</p>
                    <Button width='200px' text='Submit' disabled={!hasSigned} onClick={handleSubmitForm} Icon={DeclareIcon} />
                </div>
                {submitError !== '' && <p>Something went wrong when saving deductions. Please try again later.</p>}
            </div>
        </>
    )
}