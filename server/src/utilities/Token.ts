import Player, { IPlayer } from "../models/Player";
import { Nothing, Maybe } from "./Maybe";
import { PassHash } from "./PassHash";
import { Request, Response, Next } from 'express'

export default class Token {
    static DELIMITER = '_'
    /**
     * Checks if a given token on the form [guid].[password hash] is valid.
     */
    static async Verify(token: string): Promise<boolean> {
        const [guid, password] = token.split(Token.DELIMITER)

        const player: IPlayer = await Player.findOne({ guid })

        if (player == null) {
            return false
        }

        return player.password == password
    }
    /**
     * Middleware for express that checks for the presence of a valid token in cookies.
     * If no valid token is found, a 401 (Unauthorized) status is sent.
     * If valid token is found, the GUID-part of it is added to the request object as req.guid.
     * @param req Express request
     * @param res Expess response
     * @param next Express next function
     * @returns void
     */
    static async VerifyAndAddGUIDToReq(req: Request, res: Response, next: Next) {
        const token = req.cookies.token

        if (token == undefined) {
            res.status(401)
            res.send('Token is missing.')
            return
        }

        const authenticated: boolean = await Token.Verify(token)

        if (!authenticated) {
            res.status(401)
            res.send('Invalid token.')
            return
        }
        // Set guid on request so that other controllers can use it.
        const [guid, _] = token.split(Token.DELIMITER)
        req.guid = guid
        next()
    }
    /**
     * Generates a token on the form [guid][DELIMITER][password hash] for a given GUID and password (cleartext).
     * Does checks whether this player exists and if the password provided is correct.
     * @param guid The GUID of the player to generate a token for.
     * @returns A token or Nothing.
     */
    static async Generate(name: string, cleartextPassword: string): Promise<Maybe<string>> {

        // Find a player by name, CASE INSENSITIVE.
        const player: IPlayer = await Player.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } })

        if (player == null || player.password == null) {
            console.log('Tried to generate a token for a non-existent player')
            return Nothing
        }

        const authenticated: boolean = await PassHash.compare(player.password, cleartextPassword)

        if (!authenticated) {
            console.log('Tried to generate a token provided a wrong password.')
            return Nothing
        }

        const hash: string = player.password
        return player.guid + Token.DELIMITER + hash
    }
}