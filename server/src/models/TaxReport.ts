import mongoose, { Model, Schema } from 'mongoose';

// Removed id field because an id field is automatically added
// by mongoose. "_id"
export interface ITaxReport {
    player_guid: string
    items: Map<string, number>
    date: number
    signed: boolean
}

const taxReportSchema: Schema = new Schema<ITaxReport>({
    player_guid: { type: String, required: true },
    items: { type: Map<string, number>, required: true },
    date: { type: Number, required: true },
    signed: { type: Boolean, required: true },
})

export default mongoose.model('TaxReport', taxReportSchema)