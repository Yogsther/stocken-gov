import { HydratedDocument as HD } from "mongoose";
import ItemPickups, { IItemPickups } from "./models/ItemPickups";
import Player, { IPlayer } from "./models/Player";
import TaxReport, { ITaxReport } from "./models/TaxReport";
export default class Taxes {
    static TAX_RATE: number = 0.1
    /**
     * Registers that an item has been picked up.
     * @param user_id The guid for the player to register an item pickup for.
     * @param item The item id, i.e. what item has been picked up.
     * @param amount How many of this item has been picked up.
     */
    public static async RegisterItemPickup(user_id: string, item_id: string, amount: number): Promise<void> {
        const item: HD<IItemPickups> = await ItemPickups.findOne({user_id, item_id})

        // If player has not picked up any items with given item id, create new entry.
        if(item == null) {
            await new ItemPickups({
                user_id,
                item_id,
                amount,
                date: Date.now()
            })
            .save()
            return
        }
        // If the player has picked up items with given id, update.
        item.amount = item.amount + amount
        await item.save()
    }
    /**
     * Generates the tax reports for all players.
     */
    public static async GenerateTaxReports(): Promise<void> {
       const players: Array<IPlayer> = await Player.find({})
    
       const now = Date.now()

       for(let player of players) {
            await this.GenerateTaxReport(player.guid, now)
       }
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
     * Gets the time and date of exactly one week back from now.
     * TODO: Should maybe be moved to utility module or class.
     * @returns Date.
     */
    private static GetLastWeek(): Date {
        const now = Date.now()
        const weekInmillis = 1000 * 60 * 60 * 24 * 7
        return new Date(now - weekInmillis)
    }

    /**
     * Gets the time of last friday, at 00:00.
     * TODO: Should maybe be moved to utility module or class.
     * @returns 
     */
    private static GetLastFriday(): Date {
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
    /**
     * Deducts the given percentage from an amount of item pickups.
     * Floors the result. Formula: floor((1-rate) * amount)
     * @param item The given item
     * @param fraction How much to remove from the amount.
     * @returns The item with the amount deducted.
     */
    private static ApplyTax(amount: number, rate: number): number {
        return Math.floor(amount * rate)
    }
    /**
     * Generates a new tax report for each player, and inserts it into db.
     * @param user_id The guid for the player to generate tax report for.
     * @param timeGenerated The time at which the report was created.
     */
    private static async GenerateTaxReport(user_id: string, timeGenerated: number): Promise<void> {
        const items: Array<IItemPickups> = await Taxes.GetItemsPickedUpSinceLastFriday(user_id)
        await new TaxReport({
            player_guid: user_id,
            items: Taxes.DecuctItems(items),
            date: timeGenerated,
            signed: false
        }).save()
    }
    private static DecuctItems(items: Array<IItemPickups>): Map<string, number> {
        let resources = new Map<string, number>()
        for(let resource of items) {
            resources.set(resource.item_id, Taxes.ApplyTax(resource.amount, Taxes.TAX_RATE))
        }
        return resources
    }

    /**
     * Gets items picked up since last friday, for a given player.
     * @param user_id guid for the player to get items picked up for.
     * @returns A list of ItemPickups.
     */
    private static async GetItemsPickedUpSinceLastFriday(user_id: string): Promise<Array<IItemPickups>> {
        const millisSinceLastFriday = this.GetLastFriday().getMilliseconds()
    return await ItemPickups.find({user_id, date: { $gt: millisSinceLastFriday }})
    }
}