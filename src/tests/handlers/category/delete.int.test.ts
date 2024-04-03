import { describe, expect, test } from '@jest/globals';
import cache from '../../../utils/redis.util'
import db from '../../../utils/mongo.util'
import * as deleteCategory from '../../../handlers/category/delete';
import { eventGenerator } from '../../../utils/test/eventGenerator';
import { CategorySeeder } from '../../../seeders/category.seeder';
import { CategoryRepository } from '../../../repositories/category.repository'

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

describe('Delete category integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should return 204 with valid token', async () => {
    const data = CategorySeeder.generate()
    const category = await (new CategoryRepository()).insertOne(data)
    const event = eventGenerator({
      headers,
      pathParameters: {
        id: category.insertedId.toString()
      }
    });
    // @ts-ignore
    const res = await deleteCategory.handler(event);

    expect(res.statusCode).toBe(204);
  })

  describe('rules token', () => {
    test('it should return 401 without token', async () => {
      const event = eventGenerator({});
      // @ts-ignore
      const res = await deleteCategory.handler(event);
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
      const res = await deleteCategory.handler(event);
      const response = JSON.parse(res.body);

      expect(res.statusCode).toBe(401);
      expect(response.message).toEqual('Invalid token');
    })
  })
})
