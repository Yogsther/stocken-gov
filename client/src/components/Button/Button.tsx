import './Button.css'

interface ButtonProps {
    text: string
    onClick: () => void
    color?: string
    Icon?: any
    width?: string
}

/**
 * A simple button.
 * 
 * Props:
 *     text    - The text displayed inside the button.
 *     onClick - Exectued on button click.
 *     color   - Background color of the button. Default = 'black'
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

export default function Button({text, onClick, color = 'black',width = '100%', Icon}: ButtonProps): JSX.Element {
    return (
        <button onClick={onClick} style={{width, backgroundColor: color}}> {Icon !== undefined && <Icon color='white'/>} {text}</button>
    )
}