interface DefaultIconProps {
    color: string
}

export default function DefaultIcon({color}: DefaultIconProps) {
    return <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 96 960 960" fill={color}><path d="M231 823q-18 0-30-12t-12-30V524q0-16 12.5-28t29.5-12q17 0 29 12t12 29v257q0 17-12.5 29T231 823Zm253 0q-17 0-29-12t-12-30V524q0-16 12-28t29-12q17 0 29 12t12 29v257q0 17-12 29t-29 12ZM101 954q-19 0-32.5-14T55 907q0-20 13.5-33.5T102 860h757q19 0 33 14t14 33q0 20-14 33.5T858 954H101Zm628-131q-17 0-29-12t-12-30V524q0-16 12.5-28t28.5-12q18 0 30 12t12 29v257q0 17-12.5 29T729 823ZM526 136l334 192q20 10 33 28t13 39q0 23-17.5 37.5T848 447H111q-23 0-39.5-14.5T55 395q0-21 13.5-38.5T102 327l332-191q21-11 46-11t46 11ZM253 352h454-454Zm0 0h454L480 220 253 352Z"/></svg>
}