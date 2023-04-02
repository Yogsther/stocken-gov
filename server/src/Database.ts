import Config from "./Config";
import mongoose, { connect } from 'mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";

export default async function GetDatabaseConnection() {
    if (!mongoose.connection.readyState) {
        await connect(Config.getInstance().data.connstring);
    }
    return mongoose.connection;
}

let mongoMemoryServer: MongoMemoryServer = null

export async function GetMockDatabaseConnection() {
    if (!mongoose.connection.readyState) {
        mongoMemoryServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoMemoryServer.getUri())
    }
    return mongoose.connection
}

export async function KillMockDatabase() {
    await mongoMemoryServer.stop()
}
export async function ClearMockDatabase() {
    if(mongoMemoryServer == null) {
        throw new Error('Attempted to clear real database with clearMockDatabase. Do not do this.')
    }
    const collections = mongoose.connection.collections
    for(const key in collections) {
        const collection = collections[key]
        await collection.deleteMany()
    }
}

/* 
run().catch(err => console.log(err));

async function run() {
    // 4. Connect to MongoDB
    await connect('mongodb://127.0.0.1:27017/test');

    const user = new User({
        name: 'Bill',
        email: 'bill@initech.com',
        avatar: 'https://i.imgur.com/dM7Thhn.png'
    });
    await user.save();

    console.log(user.email); // 'bill@initech.com'
}
 */


/* import { Sequelize, Model, DataTypes } from "sequelize";


export class ItemPickups extends Model {
    public user_id!: string;
    public item_id!: string;
    public amount!: number;
    public date!: Date;
}

export class TaxReport extends Model {
    public id!: string;
    public player_guid!: string;
    public items!: string;
    public date!: Date;
    public submitted!: boolean;
}

export class Player extends Model {
    public guid!: string;
    public name!: string;
    public password!: string;
}


export default class Database {
    public sequelize: Sequelize;


    public async getConnection() {
        this.sequelize = new Sequelize(Config.getInstance().data.connstring, {
            dialect: 'mysql',
            logging: false
        });

        this.sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                this.define()
                return this.sequelize.sync();
            }
            )
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                return err;
            });
    }



    define() {
        Player.init({
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
        }, {
            sequelize: this.sequelize,
            modelName: 'player'
        });

        ItemPickups.init({
            user_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            item_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize: this.sequelize,
            modelName: 'item_pickups'
        });

        TaxReport.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            player_guid: {
                type: DataTypes.STRING,
                allowNull: false
            },
            items: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            submitted: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        }, {
            sequelize: this.sequelize,
            modelName: 'tax_report'
        });


    }
} */