export enum Sizing {
    QUARTER = '0.25rem',
    HALF    = '0.5rem',
    SINGLE  = '1rem',
    DOUBLE  = '2rem',
    QUAD    = '4rem'
}
interface HSpaceProps {
    amount?: Sizing
}

export default function HSpace({amount = Sizing.SINGLE}: HSpaceProps): JSX.Element {
    return <div style={{width: amount}}/>
}