import * as fs from 'fs';

const CONFIG_LOCATION = __dirname + '/../config.json';

export class ConfigData {
    public minecraft_api_port: number = 1099;
    public public_port: number = 3000;
    public tax_rate: number = 0.1;
    public connstring: string = 'mongodb://localhost:27017'
}

export default class Config {
    private static instance: Config;
    public data: ConfigData;

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
            Config.instance.load();
        }
        return Config.instance;
    }

    private load(): void {
        if (!fs.existsSync(CONFIG_LOCATION)) {
            console.log('Config file does not exist, creating a new one');
            this.data = new ConfigData();
            this.save();
        } else {
            this.data = JSON.parse(fs.readFileSync(CONFIG_LOCATION).toString());
        }
        console.log('Config loaded from ' + CONFIG_LOCATION);
    }

    public save(): void {
        fs.writeFileSync(CONFIG_LOCATION, JSON.stringify(this.data, null, 4));
    }
}
