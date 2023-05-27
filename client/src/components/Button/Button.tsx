import Spinner from '../Spinner/Spinner'
import './Button.css'

interface ButtonProps {
    text: string
    onClick?: () => void
    Icon?: any
    width?: string,
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    loading?: boolean
}

/**
 * A simple button.
 * 
 * Props:
 *     text    - The text displayed inside the button.
 *     onClick - Exectued on button click.
 *     Icon    - Icon displayed to the left of text. Default: No icon displayed.
 *     width   - The width of the button. Default = '100%'
 * 
 * Example usage:
 *     <Button
 *          text='Hello world!
 *          onClick={() => console.log('Hello world!')}
 *          color='black'
 *          Icon={ExampleIconComponent}
 *          width='100px'
 *      />
 *
 * @author Christoffer Billman
 * @version 1.0
 * @since 2023-04-06
 */

export default function Button({ text, onClick, width = '100%', Icon, disabled = false, type, loading}: ButtonProps): JSX.Element {

    if(loading) return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            style={{ width, background: 'var(--gray-70)' }}
        >
            <Spinner/>
        </button>
    )
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            style={{ width }}
        >
            {Icon !== undefined &&
                <Icon
                    color={disabled ? 'var(--text)' : 'var(--inverted-text)'}
                />}
                {text}
        </button>
    )
}