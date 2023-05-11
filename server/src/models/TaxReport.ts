import mongoose, { Model, Schema } from 'mongoose';

// Removed id field because an id field is automatically added
// by mongoose. "_id"
export interface ITaxReport {
    _id: any
    player_guid: string
    income: Map<string, number>
    tax: Map<string, number>
    deductions: Map<string, number>
    date: number
    due: number
    signed: boolean
}

const taxReportSchema: Schema = new Schema<ITaxReport>({
    player_guid: { type: String, required: true },
    income: { type: Map<string, number>, required: true },
    tax: { type: Map<string, number>, required: true },
    deductions: { type: Map<string, number>, required: false },
    date: { type: Number, required: true },
    due: { type: Number, required: true },
    signed: { type: Boolean, required: true },
})

export default mongoose.model('TaxReport', taxReportSchema)