export enum Sizing {
    QUARTER = '0.25rem',
    HALF    = '0.5rem',
    SINGLE  = '1rem',
    DOUBLE  = '2rem',
    QUAD    = '4rem'
}
interface VSpaceProps {
    amount?: Sizing
}

export default function VSpace({amount = Sizing.SINGLE}: VSpaceProps): JSX.Element {
    return <div style={{height: amount}}/>
}