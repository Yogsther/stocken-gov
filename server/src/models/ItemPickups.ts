import mongoose, { Model, Schema } from "mongoose";

export interface IItemPickups {
    user_id: string;
    item_id: string;
    amount: number;
    date: number;
}

const itemPickupsSchema: Schema = new Schema<IItemPickups>({
    user_id: { type: String, required: true },
    item_id: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
})

export default mongoose.model('ItemPickup', itemPickupsSchema)