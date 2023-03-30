
import { model, Schema } from 'mongoose';
import GetDatabaseConnection from './Database';
import Database from './Database';
import MinecraftAPI from './MinecraftAPI';
import Player from './Player';
import Webhost from './Webhost';

const localApi = new MinecraftAPI();
const webhost = new Webhost();

GetDatabaseConnection()

new Player({
    guid: "Tester",
    password: "LmAO",
    name: "lol"
}).save()