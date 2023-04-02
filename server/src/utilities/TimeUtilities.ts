export default class TimeUtilities {
    /**
     * Gets the time and date of exactly one week back from now.
     * TODO: Should maybe be moved to utility module or class.
     * @returns Date.
     */
    static GetLastWeek(): Date {
        const now = Date.now()
        const weekInmillis = 1000 * 60 * 60 * 24 * 7
        return new Date(now - weekInmillis)
    }
    
    /**
     * Gets the time of last friday, at 00:00.
     * TODO: Should maybe be moved to utility module or class.
     * @returns 
     */
    static GetLastFriday(): Date {
        let d = new Date()
        let day = d.getDay()
        // Could be done with mod instead.
        let diff = (day <= 5) ? (7 - 5 + day ) : (day - 5)
    
        d.setDate(d.getDate() - diff)
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
    
        return d
    }
}