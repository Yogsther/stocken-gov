/**
 * This is a duplicate of the interface found in server/src/models/TaxReport.
 * They may go out of sync if any of them are changed.
 */
export default interface ITaxReport {
    player_guid: string
    // Any because ts Map is turned into Object when JSON.stringify turns it into a JSON object.
    income: any
    tax: any
    deductions: any
    date: number
    due: number
    signed: boolean
}