import express from 'express';
import Config from '../Config';
import ItemLogger from '../ItemLogger';
import Player, { IPlayer } from '../models/Player';
import { PassHash } from '../utilities/PassHash';
import { HydratedDocument as HD } from 'mongoose';
import Taxes from '../Taxes';
import { ITaxReport } from '../models/TaxReport';
import { Maybe, isNothing } from '../utilities/Maybe';

declare global {
    interface String {
        Red(): string;
        Green(): string;
        Yellow(): string;
        Gray(): string;
        Orange(): string;
        Bold(): string;
        Italic(): string;
    }
}

String.prototype.Red = function () { return "§c" + this; };
String.prototype.Bold = function () { return "§l" + this; };
String.prototype.Italic = function () { return "§o" + this; };
String.prototype.Green = function () { return "§a" + this; };
String.prototype.Yellow = function () { return "§e" + this; };
String.prototype.Orange = function () { return "§6" + this; };
String.prototype.Gray = function () { return "§7" + this; };

const BlockTranslations = {
    "DIAMOND": "Diamond",
    "RAW_GOLD": "Raw Gold",
    "RAW_IRON": "Raw Iron",
    "COAL": "Coal"
}

class APIHelper {
    req: express.Request;
    res: express.Response;
    constructor(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;
    }

    getPlayerGUID(): string {
        return this.getArg("player_guid")
    }

    getPlayerName(): string {
        return this.getArg("player_name");
    }

    /* getOrCreatePlayer(): Player {
        return Players.GetOrCreatePlayer(this.getPlayerGUID(), this.getPlayerName());
    } */

    getArg(key: string): string {
        return this.req.headers[key.toLowerCase()];
    }

    respond(message: string) {
        this.res.end(message);
    }

}

export default class MinecraftAPI {

    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.addAPI('block_mined', (c: APIHelper) => {
            let itemName = c.getArg('itemname');
            let amount = c.getArg('itemamount');

            ItemLogger.RegisterItemPickup(c.getPlayerGUID(), itemName, parseInt(amount));
            c.respond(`Registered ${amount}x ${BlockTranslations[itemName.toUpperCase()]}`.Gray().Italic());
        });

        this.addAPI("set_password", async (c: APIHelper) => {
             const player: HD<IPlayer> = await Player.findOne({guid: c.getPlayerGUID()})
             const password = c.getArg("password")
             const hash = await PassHash.toHash(password)

             if(player == null) {
                await new Player({
                    guid: c.getPlayerGUID(),
                    name: c.getPlayerName(),
                    password: hash
                }).save()

                c.respond("Password set!".Green())
                return
             }

             player.password = hash
             await player.save()
             c.respond("Password set!".Green())
         }) 

        this.addAPI("get_tax_report", async (c: APIHelper) => {
            let report: Maybe<ITaxReport> = await Taxes.GetCurrentTaxReport(c.getPlayerGUID())

            if(isNothing(report)) {
                c.res.status(400)
                c.res.send("No user with GUID " + c.getPlayerGUID() + " found.")
                return
            }
            report = report as ITaxReport
            const due = new Date(report.due)
            let reportString = "§l§o§6Tax Report -- Due Date: " + due.toLocaleDateString() + "\n\n";

            for (const [key, value] of Object.entries(report.tax)) {
                reportString += `${value} ${key}\n`;
            }

            c.respond(reportString)
        })


        this.app.listen(Config.getInstance().data.minecraft_api_port, () => {
            console.log(`Minecraft API server listening on port ${Config.getInstance().data.minecraft_api_port}`);
        });
    }


    addAPI(path: string, callback: (callback: APIHelper) => void) {
        this.app.post("/local-api/" + path, (req, res) => {
            callback(new APIHelper(req, res));
        });
    }
}