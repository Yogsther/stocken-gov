import Diamond from '../assets/pngs/diamond.png'
import Coal from '../assets/pngs/coal.png'
import Gold from '../assets/pngs/raw_gold.png'
import Iron from '../assets/pngs/raw_iron.png'
import UnknownIcon from '../assets/pngs/unknown.png'

export default function getIcon(key: string) {
    switch(key) {
        case "DIAMOND":  return Diamond
        case "COAL":     return Coal
        case "RAW_IRON": return Iron
        case "RAW_GOLD": return Gold
        default:         return UnknownIcon
    }
}