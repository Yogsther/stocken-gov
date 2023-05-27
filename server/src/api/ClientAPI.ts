import express, { Application, Request, Response, Next } from 'express'
import Taxes from '../Taxes'
import TaxReport, { ITaxReport } from '../models/TaxReport'
import Config from '../Config'
import { isNothing, Maybe } from '../utilities/Maybe'
import Player, { IPlayer } from '../models/Player'
import Token from '../utilities/Token'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { HydratedDocument as HD } from "mongoose"

/**
 * API for the client.
 * Current API definition:
 * 
 * No token required:
 * GET:  api/test
 * POST: api/login
 * 
 * Valid token required:
 * GET:  api/currentReport?guid=[guid]
 * GET:  api/player?guid=[guid]
 */
export default class ClientAPI {
    app: Application
    baseURL = '/api/'

    constructor() {
        this.app = express()
        // Unsure if the following two lines are nessecary:
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors({
            origin: ['https://gov.stocken.okdev.se', "http://localhost:3000"],
            credentials: true
        }))

        /**
         * GET: /api/test
         */
        this.app.get(this.baseURL + 'test', (req: Request, res: Response) => {
            const guid = req.query.guid
            res.send('Hello: ' + guid)
        })

        /**
         * POST: /api/login
         * Body:
         *   name:     username of user.
         *   password: cleartext password of user.
         */
        this.app.post(this.baseURL + 'login', async (req: Request, res: Response) => {
            const name: string = req.body.username
            const password: string = req.body.password


            if (name == undefined || password == undefined) {
                res.status(400)
                res.send('Missing credentials.')
                return
            }

            // Token.Generate authenticates the user.
            const token: Maybe<string> = await Token.Generate(name, password)

            if (isNothing(token)) {
                res.status(401)
                res.send('Incorrect credentials.')
                return
            }
            res.cookie('token', token)
            res.send()
        })

        // cookieParser is run before Token.VerifyMiddleware
        // because it depends on the cookies being parsed.
        this.app.use(cookieParser())
        // This middleware will be invoked on all following routes.
        this.app.use(Token.VerifyAndAddGUIDToReq)

        this.app.listen(Config.getInstance().data.client_port, () => {
            console.log(`Client API listening on port ${Config.getInstance().data.client_port}`);
        })

        /**
         * GET: /api/reports
         * Gets all tax reports of a given player, no matter its status.
         * Given an id query param, it will get only report with that id.
         */
        this.app.get(this.baseURL + 'reports', async (req: Request, res: Response) => {
            const guid = req.guid
            const id = req.query.id

            if(id) {
                const reports = [(await Taxes.GetTaxReportFromId(id)) as ITaxReport]
                res.send(reports)
            }
            else {
                const reports = await Taxes.GetTaxReports(guid)

                if (isNothing(reports)) {
                    res.status(404)
                    res.send('No reports found.')
                    return
                }
                res.send(reports)
            }
        })
        /**
         * GET: /api/reports/preliminary
         */
        this.app.get(this.baseURL + 'reports/preliminary', async (req: Request, res: Response) => {
            const guid = req.guid

            const report: Maybe<ITaxReport> = await Taxes.GetPreliminaryTaxReport(guid)

            if (isNothing(report)) {
                res.status(404)
                res.send('No reports found.')
                return
            }
            res.send(report)
        })
        /**
         * GET: /api/reports/current
         */
        this.app.get(this.baseURL + 'reports/current', async (req: Request, res: Response) => {
            const guid = req.guid

            const report: Maybe<ITaxReport> = await Taxes.GetCurrentTaxReport(guid)

            if (isNothing(report)) {
                res.status(200)
                res.send([])
                return
            }
            res.send(report)
        })

        /**
         * GET: /api/reports/due
         */
        this.app.get(this.baseURL + 'reports/due', async (req: Request, res: Response) => {
            const guid = req.guid

            const reports: Maybe<ITaxReport[]> = await Taxes.GetDueAndUnsignedTaxReports(guid)

            if (isNothing(reports)) {
                res.status(200)
                res.send([])
                return
            }
            res.send(reports)
        })
        /**
         * GET: /api/reports/signable
         */
        this.app.get(this.baseURL + 'reports/signable', async (req: Request, res: Response) => {
            const guid = req.guid

            const reports: Maybe<ITaxReport[]> = await Taxes.GetSignableReports(guid)

            if (isNothing(reports)) {
                res.status(200)
                res.send([])
                return
            }
            res.send(reports)
        })

        /**
         * PUT: /api/reports/sign
         */
        this.app.put(this.baseURL + 'reports/sign', async (req: Request, res: Response) => {
            const guid = req.guid
            const id = req.query.id

            console.log('Signing report for ' + guid + "!!!!!!!!!!!!!")

            const report: Maybe<ITaxReport> = await Taxes.GetTaxReportFromId(id)

            if (isNothing(report)) {
                res.status(404)
                res.send('Report not found.')
                return
            }

            await Taxes.SignTaxReport((report as ITaxReport)._id)

            res.send(await Taxes.GetTaxReportFromId(id))
        })
        /**
         * PUT: /api/reports/deduct
         */
        this.app.put(this.baseURL + 'reports/deduct', async (req: Request, res: Response) => {
            const guid = req.guid;
            console.log(req.body)
            let report: Maybe<HD<ITaxReport>> = await Taxes.GetTaxReportFromId(req.body._id)

            if (isNothing(report)) {
                res.status(404)
                res.send('Report not found.')
                return
            }

            let typedReport = report as HD<ITaxReport>
            typedReport.deductions = req.body.deductions
            await typedReport.save()
            res.send(typedReport)
        })
        /**
         * GET: /api/player
         */
        this.app.get(this.baseURL + 'player', async (req: Request, res: Response) => {
            const guid = req.guid
            const player: IPlayer = await Player.findOne({ guid })

            if (player == null) {
                res.send('No player with GUID ' + guid + ' found.')
                return
            }
            res.send({
                guid: player.guid,
                name: player.name
            })
        })
    }
}
