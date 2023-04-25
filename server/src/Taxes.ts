import { HydratedDocument as HD } from "mongoose"
import Config from "./Config"
import ItemLogger from "./ItemLogger"
import "./utilities/Maybe"
import { IItemPickups } from "./models/ItemPickups"
import Player, { IPlayer } from "./models/Player"
import TaxReport, { ITaxReport } from "./models/TaxReport"
import TimeUtilities from "./utilities/TimeUtilities"
import { Nothing, Maybe } from "./utilities/Maybe"
export default class Taxes {
    /**
     * Generates the tax reports for all players.
     */
    public static async GenerateTaxReports(): Promise<void> {
       const players: Array<IPlayer> = await Player.find({})

       for(let player of players) {
            await Taxes.UpsertTaxReport(player.guid)
       }
    }
    public static async GetDueAndUnsignedTaxReports(guid: number): Promise<Maybe<ITaxReport[]>> {
        const now = Date.now()
        // Gets all due and unsiged tax reports.
        const reports: ITaxReport[] = await TaxReport.find({player_id: guid, signed: false, due: {$lt: now}})
        if(reports.length == 0) {
            return Nothing
        }
        return reports
    }
    /**
     * Gets all tax reports for a given player
     * @param guid GUID of the player.
     * @returns The tax reports or Nothing if none exist.
     */
    public static async GetTaxReports(guid: string): Promise<Maybe<ITaxReport[]>>{
        const reports: ITaxReport[] = await TaxReport.find({player_id: guid})
        if(reports.length == 0){
            return Nothing
        }
        return reports
    }
    public static async GetCurrentTaxReport(guid: string): Promise<Maybe<ITaxReport>> {
        const player: IPlayer = await Player.findOne({guid})
        if(player == null){
            return Nothing
        }

        await Taxes.UpsertTaxReport(guid)
        const millisLastFriday = TimeUtilities.GetLastFriday().getMilliseconds()
        const now = Date.now()
        const report: ITaxReport = await TaxReport.findOne({player_guid: guid, date: { $gt: millisLastFriday}, due: {$gt: now }})

        if(report == null) {
            console.error("Could not find tax report even though one should be present.")
            return Nothing
        }
        
        return report
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
        catch(err){
            console.error("Could not find tax report with id " + report_id + ".")
        }
        report.signed = true
        await report.save()
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
     * Upserts a tax report for a given user.
     * @param user_id The guid for the player to upsert tax report for.
     */
    private static async UpsertTaxReport(user_id: string): Promise<void> {
        const player: IPlayer = await Player.findOne({guid: user_id})
        if(player == null) {
            console.log('Tried to upsert at tax report for non-existent user.')
            return
        }
        const millisLastFriday = TimeUtilities.GetLastFriday().getMilliseconds()
        const oneWeekMillis = 1000 * 60 * 60 * 24 * 7
        const report: HD<ITaxReport> = await TaxReport.findOne({player_guid: user_id, date: { $gt: millisLastFriday }})

        const items: IItemPickups[] = await ItemLogger.GetItemsPickedUpSinceLastFriday(user_id)
        // If no report was found or next tax period has begun, make one.
        if(report == null || (millisLastFriday + oneWeekMillis) > Date.now()) {
            await new TaxReport({
                player_guid: user_id,
                tax: Taxes.TaxItems(items),
                income: Taxes.ItemPickupsToMap(items),
                deductions: new Map<string, number>(),
                date: Date.now(),
                due: TimeUtilities.GetNextFriday(),
                signed: false
            }).save()
            return
        }
        // If a report was found, update its items.
        report.income = this.ItemPickupsToMap(items)
        report.tax    = Taxes.TaxItems(items)
        await report.save()
    }
    private static TaxItems(items: Array<IItemPickups>): Map<string, number> {
        let resources = new Map<string, number>()
        for(let resource of items) {
            resources.set(
                resource.item_id,
                Taxes.ApplyTax(resource.amount))
        }
        return resources
    }
    private static ItemPickupsToMap(items: Array<IItemPickups>): Map<string, number> {
        let resources = new Map<string, number>()
        for(let resource of items) {
            resources.set(
                resource.item_id,
                resource.amount)
        }
        return resources
    }
}