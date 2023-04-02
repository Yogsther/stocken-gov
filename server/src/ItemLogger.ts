import ItemPickups, { IItemPickups } from "./models/ItemPickups"
import { HydratedDocument as HD } from "mongoose"
import TimeUtilities from "./utilities/TimeUtilities"

export default class ItemLogger {
    /**
     * Registers that an item has been picked up.
     * @param user_id The guid for the player to register an item pickup for.
     * @param item The item id, i.e. what item has been picked up.
     * @param amount How many of this item has been picked up.
     */
    public static async RegisterItemPickup(user_id: string, item_id: string, amount: number): Promise<void> {
        if(amount <= 0) {
            throw new Error('Cannot register negative amount of items picked up.')
        }
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
     * Gets items picked up since last friday, for a given player.
     * @param user_id guid for the player to get items picked up for.
     * @returns A list of ItemPickups.
     */
    static async GetItemsPickedUpSinceLastFriday(user_id: string): Promise<Array<IItemPickups>> {
        const millisSinceLastFriday = TimeUtilities.GetLastFriday().getMilliseconds()
        return await ItemPickups.find({user_id, date: { $gt: millisSinceLastFriday }})
    }
}