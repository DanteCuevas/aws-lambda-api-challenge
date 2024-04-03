import { describe, expect, test } from '@jest/globals';
import cache from '../../../utils/redis.util'
import db from '../../../utils/mongo.util'
import * as updateCategory from '../../../handlers/category/update';
import { eventGenerator } from '../../../utils/test/eventGenerator';
import { CategorySeeder } from '../../../seeders/category.seeder';
import { CategoryRepository } from '../../../repositories/category.repository'
import { Category } from '../../../interfaces/category.interface';

jest.mock('../../../utils/logger.util', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  },
  cleanup: jest.fn()
}));

const headers = {
  authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
}

beforeAll(async () => {
  await db.connect()
});

afterAll(async () => {
  await cache.quit()
  await db.disconnect()
});

describe('Show category integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should return 200 with valid token', async () => {
    const data = CategorySeeder.generate() as Category
    const category = await (new CategoryRepository()).insertOne(data)
    const newData = {
      name: 'new name',
      description: 'new description'
    }
    const body = JSON.stringify(newData)
    const event = eventGenerator({
      headers,
      body,
      pathParameters: {
        id: category.insertedId.toString()
      }
    });
    // @ts-ignore
    const res = await updateCategory.handler(event);
    const response = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(response.category._id).toBeDefined();
    expect(response.category.name).toEqual(newData.name);
    expect(response.category.description).toEqual(newData.description);
    expect(response.category.created_at).toBeDefined();
    expect(response.category.updated_at).toBeDefined();
  })

  describe('rules token', () => {
    test('it should return 401 without token', async () => {
      const event = eventGenerator({});
      // @ts-ignore
      const res = await updateCategory.handler(event);
      const response = JSON.parse(res.body);

      expect(res.statusCode).toBe(401);
      expect(response.message).toEqual('Invalid token');
    })

    test('it should return 401 wiht invalid token', async () => {
      const event = eventGenerator({
        headers: {
          authorization: 'Bearer pk_test_1'
        }
      });
      // @ts-ignore
      const res = await updateCategory.handler(event);
      const response = JSON.parse(res.body);

      expect(res.statusCode).toBe(401);
      expect(response.message).toEqual('Invalid token');
    })
  })
})