import { Application, Request, Response } from 'express'

export default class ClientAPI {

    app: Application
    baseURL = '/api/'

    constructor(app: Application) {
        this.app = app

        this.app.get('/api/test', (req: Request, res: Response) => {
            const guid = req.query.guid
            res.send('Hello: ' + guid)
          })

        this.app.get(this.baseURL + 'players')
    }


    /*
    /players/[GUID]/
    */
}