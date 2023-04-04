export default class TimeUtilities {
    /**
     * Gets the time and date of exactly one week back from now.
     * TODO: Should maybe be moved to utility module or class.
     * @returns Date.
     */
    static GetExactlyOneWeekBack(): Date {
        const now = Date.now()
        const weekInmillis = 1000 * 60 * 60 * 24 * 7
        return new Date(now - weekInmillis)
    }
    
    /**
     * Gets the time of last friday, at 00:00.
     * @returns 
     */
    static GetLastFriday(): Date {
        let d = new Date()
        let day = d.getDay()
        // Could be done with mod instead.
        let diff = (day <= 5) ? (7 - 5 + day ) : (day - 5)
    
        d.setDate(d.getDate() - diff)
        d = TimeUtilities.SetBeginningOfDay(d)
    
        return d
    }
    static GetNextFriday() {
        let result = new Date()
        const today = new Date()
        const friday = 4

        result.setDate(today.getDate() + (7 + friday - today.getDay()) % 7)

        result = TimeUtilities.SetBeginningOfDay(result)

        return result
    }
    private static SetBeginningOfDay(d: Date): Date {
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        return d
    }
}