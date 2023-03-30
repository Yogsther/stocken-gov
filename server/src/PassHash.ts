import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export class PassHash {
    public static async toHash(password: string): Promise<string> {
        const salt = randomBytes(8).toString('hex');
        const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;
        return `${buf.toString('hex')}.${salt}`;
    }

    public static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = (await promisify(scrypt)(suppliedPassword, salt, 64)) as Buffer;
        return buf.toString('hex') === hashedPassword;
    }
}