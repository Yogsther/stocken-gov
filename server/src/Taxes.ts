import ItemPickups, { IItemPickups } from "./models/ItemPickups";
import Player, { IPlayer } from "./models/Player";
import TaxReport, { ITaxReport } from "./models/TaxReport";
export default class Taxes {

    /**
     * Registers that an item has been picked up.
     * @param user_id The guid for the player to register an item pickup for.
     * @param item The item id, i.e. what item has been picked up.
     * @param amount How many of this item has been picked up.
     */
    public static async RegisterItemPickup(user_id: string, item_id: string, amount: number): Promise<void> {
        const item: IItemPickups = await ItemPickups.findOne({user_id, item_id})

        // If player has not picked up any items with given item id, create new entry.
        if(item == null) {
            new ItemPickups({
                user_id,
                item_id,
                amount,
                date: Date.now()
            })
            .save()
            return
        }
        // If the player has picked up items with given id, update.
        new ItemPickups({
            user_id: item.user_id,
            item_id: item.item_id,
            amount: item.amount + amount,
            date: item.date
        })
        .save()
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
        let report: ITaxReport
        try {
             report = await TaxReport.findById(report_id)
        }
        catch(err){
            console.error("Could not find tax report with id " + report_id + ".")
        }
        await new TaxReport({
            ...report,
            signed: true
        })
        .save()
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
    private static Deduct(item: IItemPickups, rate: number): IItemPickups {
        const decuction = 1 - rate
        return {
            ...item,
            amount: Math.floor(item.amount * decuction)
        }
    }
    /**
     * Generates a new tax report for each player, and inserts it into db.
     * @param user_id The guid for the player to generate tax report for.
     * @param timeGenerated The time at which the report was created.
     */
    private static async GenerateTaxReport(user_id: string, timeGenerated: number): Promise<void> {
        const items: Array<IItemPickups> = await this.GetItemsPickedUpSinceLastFriday(user_id)
        await new TaxReport({
            player_guid: user_id,
            items,
            date: timeGenerated,
            signed: false
        }).save()
    }

    /**
     * Gets items picked up since last friday, for a given player.
     * @param user_id guid for the player to get items picked up for.
     * @returns A list of ItemPickups.
     */
    private static async GetItemsPickedUpSinceLastFriday(user_id: string): Promise<Array<IItemPickups>> {
        const millisSinceLastFriday = this.GetLastFriday().getMilliseconds()
        return ItemPickups.find({user_id, date: { $gt: millisSinceLastFriday }})
    }
    /*  public static GetTaxReports(player_guid: string): TaxReport[] {
         return Database.GetAll<TaxReport>(DatabasePath.TAX_REPORTS(player_guid));
     } */

    /*  public static GetOrCreateActiveTaxReport(player_guid: string): TaxReport {
         let report = Database.Get<TaxReport>(DatabasePath.TAX_REPORTS(player_guid), DatabaseKeys.TAX_REPORT_SUBMITTED, false);
         if (report == null) {
             report = {
                 id: Database.UUID(),
                 player_guid,
                 items: [],
                 date: new Date(),
                 submitted: false
             };
             console.log("Creating new tax report for " + player_guid);
             Database.Set(DatabasePath.TAX_REPORTS(player_guid), DatabaseKeys.TAX_REPORT_ID, report);
         }
         return report;
     } */

    /* public static AddTaxableIncome(player_guid: string, item: string, amount: number): void {
        let report = this.GetOrCreateActiveTaxReport(player_guid);
        let taxItem = report.items.find((taxItem: any) => taxItem.item == item);
        if (taxItem == null) {
            taxItem = {
                item: item,
                totalIncome: 0,
                deductedAmount: 0
            };
            report.items.push(taxItem);
        }
        console.log("Adding " + amount + " to " + item + " for " + player_guid);
        taxItem.totalIncome += amount;
        Database.Set(DatabasePath.TAX_REPORTS(player_guid), DatabaseKeys.TAX_REPORT_SUBMITTED, report);
    } */

    /*  public static GetNextDueDate(report: TaxReport): Date {
         // TODO: Tidy up and remove magic numbers
         let nextDueDate = new Date(report.date);
         nextDueDate.setDate(nextDueDate.getDate() + (6 + 7 - nextDueDate.getDay()) % 7);
         nextDueDate.setHours(0, 0, 0, 0);
         if (nextDueDate.getTime() - new Date(report.date).getTime() < 24 * 60 * 60 * 1000) {
             nextDueDate.setDate(nextDueDate.getDate() + 7);
         }
         return nextDueDate;
     } */

    /* public static GetAmountOfItem(item: string, report: TaxReport): number {
        let taxItem = report.items.find((taxItem: any) => taxItem.item == item);
        if (taxItem == null)
            return 0;
        return taxItem.totalIncome;
    } */
}