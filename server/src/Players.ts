import Player, { IPlayer } from "./models/Player";
import { HydratedDocument as HD } from "mongoose";

export default class Players {
    public static async GetOrCreatePlayer(guid: string, name: string): Promise<HD<IPlayer>> {

        let player: HD<IPlayer> = await Player.findOne({ guid });

        if (player == null) {
            await new Player({
                guid,
                name,
                password: null
            }).save();
            return await this.GetOrCreatePlayer(guid, name);
        }

        return player;
    }
}