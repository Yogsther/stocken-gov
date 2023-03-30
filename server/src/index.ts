
import { model, Schema } from 'mongoose';
import GetDatabaseConnection from './Database';
import Database from './Database';
import MinecraftAPI from './MinecraftAPI';
import Webhost from './Webhost';

const localApi = new MinecraftAPI();
const webhost = new Webhost();



/* 
GetDatabaseConnection().then(conn => {
    const User = conn.model('User', userSchema);
    const user = new User({
        name: 'Bill',
        email: 'test'
    });

    user.save().then(() => {
        console.log(user.email); // '
    });
})
 */