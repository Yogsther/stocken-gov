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

    static DAYS_IN_WEEK = 7

    /**
     * Gets the time of last friday, at 00:00.
     * @returns 
     */
    static GetLastFriday(): Date {
        let d = new Date()
        let day = d.getDay()
        // Could be done with mod instead.
        let diff = (day <= 5) ? (7 - 5 + day) : (day - 5)

        d.setDate(d.getDate() - diff)
        d = TimeUtilities.SetBeginningOfDay(d)

        return d
    }

    static GetNextSaturday() {
        let result = new Date()
        const today = new Date()
        const saturday = 7
        result.setDate(today.getDate() + (TimeUtilities.DAYS_IN_WEEK + saturday - today.getDay()) % TimeUtilities.DAYS_IN_WEEK)
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