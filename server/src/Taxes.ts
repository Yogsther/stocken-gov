import { HydratedDocument as HD } from "mongoose"
import Config from "./Config"
import "./utilities/Maybe"
import Player, { IPlayer } from "./models/Player"
import TaxReport, { ITaxReport } from "./models/TaxReport"
import TimeUtilities from "./utilities/TimeUtilities"
import { Nothing, Maybe, isNothing } from "./utilities/Maybe"
export default class Taxes {
    public static async GetDueAndUnsignedTaxReports(guid: number): Promise<Maybe<ITaxReport[]>> {
        const now = Date.now()
        // Gets all due and unsiged tax reports.
        const reports: ITaxReport[] = await TaxReport.find({ player_id: guid, signed: false, due: { $lt: now } })
        if (reports.length == 0) {
            return Nothing
        }
        return reports
    }
    /**
     * Gets all tax reports for a given player
     * @param guid GUID of the player.
     * @returns The tax reports or Nothing if none exist.
     */
    public static async GetTaxReports(guid: string): Promise<Maybe<ITaxReport[]>> {
        const reports: ITaxReport[] = await TaxReport.find({ player_id: guid })
        if (reports.length == 0) {
            return Nothing
        }
        return reports
    }

    public static async GetCurrentTaxReport(guid: string): Promise<Maybe<ITaxReport>> {
        const now = Date.now()
        const report: ITaxReport = await TaxReport.findOne({ player_guid: guid, valid_until: { $gt: now } })

        if (report == null)
            return Nothing

        return report
    }

    public static async GetOrCreateValidTaxReport(guid: string): Promise<HD<ITaxReport>> {

        let report = await Taxes.GetCurrentTaxReport(guid)
        const now = Date.now()

        if (isNothing(report) || (report as ITaxReport).valid_until < now) {
            await new TaxReport({
                player_guid: guid,
                tax: new Map<string, number>(),
                income: new Map<string, number>(),
                deductions: new Map<string, number>(),
                valid_until: TimeUtilities.GetNextSaturday(),
                due: TimeUtilities.GetNextSaturday() + TimeUtilities.DaysInMillis(2),
                signed: false
            }).save()

            return this.GetOrCreateValidTaxReport(guid)
        }

        return report as HD<ITaxReport>
    }


    /**
     * Signs the tax report with given id.
     * @param report_id The id of the tax report to be signed.
     */
    public static async SignTaxReport(report_id: number): Promise<void> {
        let report: HD<ITaxReport>
        try {
            report = await TaxReport.findById(report_id)
        }
        catch (err) {
            console.error("Could not find tax report with id " + report_id + ".")
        }
        report.signed = true
        await report.save()
    }

    public static async GetTaxReportFromId(report_id: number): Promise<Maybe<HD<ITaxReport>>> {
        const report: HD<ITaxReport> = await TaxReport.findById(report_id)
        if (report == null) {
            return Nothing
        }
        return report
    }


    /**
     * Taxes a given amount with the tax rate present in the config.
     * Floors the result. Formula: floor(rate * amount)
     * @param item The given item
     * @param fraction How much to remove from the amount.
     * @returns The item with the amount deducted.
     */
    private static ApplyTax(amount: number): number {
        const rate = Config.getInstance().data.tax_rate
        return Math.floor(amount * rate)
    }
    /**
     * Updates the income in a given players tax report, with the given item_id and amount.
     * @param user_id The guid for the player to update income for.
     */
    public static async UpdateIncome(user_id: string, item_id: string, amount: number): Promise<void> {
        if (amount <= 0) {
            throw new Error('Cannot register negative amount of items picked up.')
        }

        const player: IPlayer = await Player.findOne({ guid: user_id })
        if (player == null) {
            console.log('Tried to upsert at tax report for non-existent user.')
            return
        }

        let report: HD<ITaxReport> = await Taxes.GetOrCreateValidTaxReport(user_id)

        let amountBefore = report.income.get(item_id)

        // If the item does not exist in the map, we set the beforeAmount of this item to 0.
        if (amountBefore === undefined) amountBefore = 0

        report.income.set(item_id, amountBefore + amount)
        report.tax.set(item_id, Taxes.ApplyTax(amountBefore + amount))
        await report.save()
    }
}