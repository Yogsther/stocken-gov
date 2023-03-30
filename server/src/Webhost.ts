import express from 'express';
import Config from './Config';

export default class Webhost {

    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('dist'));

        this.app.listen(Config.getInstance().data.public_port, () => {
            console.log(`Public website server listening on port ${Config.getInstance().data.public_port}`);
        });
    }
}