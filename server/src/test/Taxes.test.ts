import Taxes from '../Taxes'
import { ClearMockDatabase, GetMockDatabaseConnection, KillMockDatabase } from '../Database'
import TaxReport, { ITaxReport } from '../models/TaxReport'
import Player from '../models/Player'

/*
beforeAll(async () => await GetMockDatabaseConnection())

test('NoPriorPickupTest', async () => {
    await ItemLogger.RegisterItemPickup('test_guid', 'DIAMOND', 20)

    const item: IItemPickups = await ItemPickups.findOne({user_id: 'test_guid', item_id: 'DIAMOND'})

    expect(item.user_id).toBe('test_guid')
    expect(item.amount).toBe(20)
})

test('PriorPickupTest', async () => {
    await ItemPickups.deleteMany({user_id: 'test_guid'})
    await ItemLogger.RegisterItemPickup('test_guid', 'DIAMOND', 20)
    await ItemLogger.RegisterItemPickup('test_guid', 'DIAMOND', 20)

    const item: IItemPickups = await ItemPickups.findOne({user_id: 'test_guid', item_id: 'DIAMOND'})

    expect(item.amount).toBe(40)
})

test('BasicTaxReportTest', async () => {
    await new Player({
        guid: 'test_guid',
        password: 'pswd',
        name: 'testplayer'
    }).save()

    const taxreport: ITaxReport = await TaxReport.findOne({player_guid: 'test_guid'})
    expect(taxreport.tax.get('DIAMOND')).toBe(4)
})

afterAll(async () => {
    await ClearMockDatabase();
    (await GetMockDatabaseConnection()).close();
    await KillMockDatabase();
})
*/