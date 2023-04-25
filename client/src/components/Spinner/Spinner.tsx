import './Spinner.css'
import SpinnerSVG from '../../assets/svgs/spinner.svg'

export default function Spinner() {
	return <img className='spinner' src={SpinnerSVG} alt='loading...'/>
}