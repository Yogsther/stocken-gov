import mongoose, { Schema } from 'mongoose';

export interface IPlayer {
    guid: string
    password: string
    name: string
}

const playerSchema: Schema = new Schema<IPlayer>({
    guid: { type: String, required: true },
    password: { type: String, required: false },
    name: { type: String, required: true },
})

export default mongoose.model('Player', playerSchema)