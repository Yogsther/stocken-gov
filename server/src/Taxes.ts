/* import Database, { DatabaseKeys, DatabasePath, TaxReport } from "./Database"; */
import Database from "./Database";
import { Players } from "./Players";
import mongoose from "mongoose";
import GetDatabaseConnection from "./Database";


interface IItemPickup {
    user_id: string;
    item: string;
    amount: number;
    date: Date;
}

const itemPickupSchema = new mongoose.Schema<IItemPickup>({
    user_id: { type: String, required: true },
    item: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true }
});


export default class Taxes {

    /* 
interface IUser {
    name: string;
    email: string;
    avatar?: string;
} */

    /* const userSchema = new Schema<IUser>({
        name: { type: String, required: true },
        email: { type: String, required: true },
        avatar: String
    }); */

    /* const userSchema = new Schema<IUser>({
        name: { type: String, required: true },
        email: { type: String, required: true },
        avatar: String
    });
     */



    public static RegisterItemPickup(user_id: string, item: string, amount: number) {
        GetDatabaseConnection().then(conn => {
            const ItemPickups = conn.model('ItemPickups', itemPickupSchema);
            const itemPickup = new ItemPickups({
                user_id,
                item,
                amount,
                date: new Date()
            });
            itemPickup.save().then(() => {
                console.log(itemPickup.user_id); // '
            });
        })
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