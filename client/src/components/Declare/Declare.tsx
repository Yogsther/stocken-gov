import { useEffect, useState } from "react"
import DeclareIcon from "../../assets/svgs/DeclareIcon"
import TaxReport from "../../types/TaxReport"
import BackButton from "../BackButton"
import Button from "../Button/Button"
import TaxForm from "../TaxForm/TaxForm"
import VSpace from "../VSpace"

import './Declare.css'
import SignableField from "../SignableField/SignableField"
import getWeek from "../../utils/getWeek"

interface DeclareProps {
    onBack: () => void
    onSubmitSuccess: () => void
    report: TaxReport
}

export default function Declare({ onBack, onSubmitSuccess, report }: DeclareProps): JSX.Element {
    let data = report
    const [taxForm, setTaxForm] = useState<TaxReport>(data!)

    useEffect(() => {
        if(data !== undefined) setTaxForm(data)
    }, [data])

    const [submitError, setSubmitError] = useState('')
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [hasSigned, setHasSigned] = useState(false)

    const handleSave = (onSuccess: () => void) => {
        fetch(process.env.REACT_APP_API_URL + '/api/reports/deduct',
            {
                method: 'PUT',
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
                    onSuccess()
                    return
                }
                setSubmitError('Something went wrong when saving declaration.')

            })
            .catch(() => setSubmitError('There was a networking error.'))
    }

    const handleSign = () => {
        handleSave(() => {
            fetch(process.env.REACT_APP_API_URL + '/api/reports/sign?=' + report._id,
            {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(async (res) => {
                if (res.status === 200) {
                    onSubmitSuccess()
                    return
                }
                setSubmitError('Something went wrong when signing declaration.')

            })
            .catch(() => setSubmitError('There was a networking error.'))
        })
    }


    // Data will never be undefined when rendering has gotten to this point,
    // therefore the non-null assertion on data.
    return (
        <>
            <BackButton text='Return to home' onClick={onBack} />
            <h1>Declare Tax</h1>
            <h4>Week {getWeek(new Date(report.valid_until))}</h4>
            <TaxForm taxReport={data!} setTaxForm={setTaxForm} />
            <VSpace />
            <div className='sign-container'>
                <p>Sign here:</p>
                <SignableField setHasBeenSigned={setHasSigned} />
                <VSpace />
                <div className='submit-container'>
                    <p className='muted-text'>Signing and submitting is an irreversible action. Once the tax form is submitted, you are legally bound to pay the amounts submitted.</p>
                    <Button width='200px' text={saveSuccess ? 'Saved!' : 'Save'} success={saveSuccess} type='button' onClick={() =>{
                            handleSave(() => {
                                setSaveSuccess(true)
                                setTimeout(() => {
                                    setSaveSuccess(false)
                                }, 3000)
                            })
                        }}
                    />
                    <Button width='200px' text='Save & Sign' disabled={!hasSigned} onClick={handleSign} Icon={DeclareIcon} />
                </div>
                {submitError !== '' && <p>Something went wrong when saving deductions. Please try again later.</p>}
            </div>
        </>
    )
}