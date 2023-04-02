import express from 'express';
import Config from '../Config';
import ItemLogger from '../ItemLogger';

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

        /*  this.addAPI("set_password", (c: APIHelper) => {
             let player = Players.GetOrCreatePlayer(c.getPlayerGUID(), c.getPlayerName());
             let password = c.getArg("password");
             PassHash.toHash(password).then((hash) => {
                 player.password = hash;
                 Players.SavePlayer(player);
                 c.respond("Password set!".Green());
             });
         }); */
         this.app.get(() => {
            
         })
         

        this.addAPI("get_tax_report", async (c: APIHelper) => {
            /* let player = c.getOrCreatePlayer();
            let report = Taxes.GetOrCreateActiveTaxReport(player.guid);
            let due = Taxes.GetNextDueDate(report);
            let reportString = "§l§o§6Tax Report -- Due Date: " + due.toLocaleDateString() + "\n\n";

            let gold = Taxes.GetAmountOfItem("RAW_GOLD", report);
            let iron = Taxes.GetAmountOfItem("RAW_IRON", report);
            let diamond = Taxes.GetAmountOfItem("DIAMOND", report);
            let coal = Taxes.GetAmountOfItem("COAL", report);

            reportString += `§7Gold: §e${gold}\n`;
            reportString += `§7Iron: §e${iron}\n`;
            reportString += `§7Diamond: §e${diamond}\n`;
            reportString += `§7Coal: §e${coal}\n`;

            c.respond(reportString); */
            c.respond("hello")
        });


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