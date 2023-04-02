import { ClearMockDatabase, GetMockDatabaseConnection, KillMockDatabase } from "../Database"
import ItemLogger from "../ItemLogger"
import { IItemPickups } from "../models/ItemPickups"

beforeAll(async () => await GetMockDatabaseConnection())

test("BasicItemLoggerTest", async () => {
    await ItemLogger.RegisterItemPickup('tester', 'DIAMOND', 50000)
    const items: Array<IItemPickups> = await ItemLogger.GetItemsPickedUpSinceLastFriday('tester')
    
    expect(items[0].amount).toBe(50000)

    await expect(ItemLogger.RegisterItemPickup('tester', 'GOLD', -1))
    .rejects
    .toThrowError('Cannot register negative amount of items picked up.')
})

afterAll(async () => {
    await ClearMockDatabase();
    (await GetMockDatabaseConnection()).close();
    await KillMockDatabase();
})