import mongoose, { Schema } from 'mongoose';

interface Player {
    guid: string
    password: string
    name: string
}

const playerSchema: Schema = new Schema<Player>({
    guid: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
})

export default mongoose.model('Player', playerSchema)