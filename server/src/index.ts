
import { model, Schema } from 'mongoose';
import GetDatabaseConnection from './Database';
import Database from './Database';
import MinecraftAPI from './api/MinecraftAPI';
import ItemPickups from './models/ItemPickups';
import Player from './models/Player';
import Taxes from './Taxes';
import Webhost from './Webhost';
import ClientAPI from './api/ClientAPI';

const localApi = new MinecraftAPI()
const clientApi = new ClientAPI()
//const webhost = new Webhost()

GetDatabaseConnection()

// Note, if guid is the same, will not update existing entry with same guid.
// a new player will be created with new _id.
/*new Player({
    guid: "test",
    password: "password",
    name: "popkrull"
}).save()*/

//Taxes.RegisterItemPickup("Tester", "DIAMOND", 2)
//Taxes.GenerateTaxReports()
//Taxes.SignTaxReport("Tester")


/*new ItemPickups({
    user_id: "Tester",
    item_id: "DIAMOND",
    amount: 5,
    date: Date.now()
}).save()*/