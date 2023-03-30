/* import Database, { DatabaseKeys, DatabasePath, Player } from "./Database"; */

import { DataTypes, Sequelize } from "sequelize";
import Database from "./Database";

export class Players {
    /* public constructor(conn: Sequelize) {
        const Player = conn.define('Player', {
            guid: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });
    }
 */
    /* public static GetOrCreatePlayer(guid: string, name: string): Player {
        let player = this.GetPlayer(guid);
        if (!player) {
            player = Database.getInstance().sequelize.models.Player.create({ guid: guid, name: name, password: "" });
        }
        return player;
    }

    public static GetPlayer(guid: string): Player | null {
        return Database.getInstance().sequelize.models.Player.findOne({ where: { guid: guid } });
    } */

    /*  public static UpdatePlayer(guid: string, name: string, modifier: (player: Player) => void): void {
         let player = this.GetOrCreatePlayer(guid, name);
         modifier(player);
         console.log("Updating player ", player);
         Database.Set(DatabasePath.PLAYERS, DatabaseKeys.PLAYER, player);
     }
 
     public static SavePlayer(player: Player): void {
         Database.Set(DatabasePath.PLAYERS, DatabaseKeys.PLAYER, player);
     } */
}