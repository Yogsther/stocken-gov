import getIcon from "../utils/getIcon"
import ResourceRow from "./ResourceRow"

/**
 * This is a duplicate of the interface found in server/src/models/TaxReport.
 * They may go out of sync if any of them are changed.
 */
export default interface TaxReport {
    _id: string
    player_guid: string
    // Any because ts Map is turned into Object when JSON.stringify turns it into a JSON object.
    income: any
    tax: any
    deductions: any
    valid_until: number
    due: number
    signed: boolean
}

export function TaxReportToResourceRowArr(report: TaxReport): ResourceRow[] {
    let resources: ResourceRow[] = []

    for(const key in report.income) {
        const value = report.income[key]
        resources.push({
            resource: key,
            incomeAmount: value,
            taxPercent: 10, // Replace with call to API to get current tax percentage.
            taxAmount: report.tax[key],
            icon: getIcon(key)
        })
    }
    return resources
}