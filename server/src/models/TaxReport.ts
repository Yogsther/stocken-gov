import mongoose, { Model, Schema } from 'mongoose';

// Removed id field because an id field is automatically added
// by mongoose. "_id"
export interface ITaxReport {
    player_guid: string
    income: Map<string, number>
    tax: Map<string, number>
    deductions: Map<string, number>
    valid_until: number
    due: number
    signed: boolean
}

const taxReportSchema: Schema = new Schema<ITaxReport>({
    player_guid: { type: String, required: true },
    income: { type: Map<string, number>, required: true },
    tax: { type: Map<string, number>, required: true },
    deductions: { type: Map<string, number>, required: false },
    valid_until: { type: Number, required: true },
    due: { type: Number, required: true },
    signed: { type: Boolean, required: true },
})

export default mongoose.model('TaxReport', taxReportSchema)