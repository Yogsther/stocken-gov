import mongoose, { Schema } from 'mongoose';

// Removed id field because an id field is automatically added
// by mongoose. "_id"
export interface ITaxReport {
    player_guid: string
    items: String
    date: number
    signed: boolean
}

const taxReportSchema: Schema = new Schema<ITaxReport>({
    player_guid: { type: String, required: true },
    items: { type: [String], required: true },
    date: { type: Number, required: true },
    signed: { type: Boolean, required: true },
})

export default mongoose.model('TaxReport', taxReportSchema)