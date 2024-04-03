import { describe, expect, test } from '@jest/globals';
import cache from '../../../utils/redis.util'
import db from '../../../utils/mongo.util'
import * as listCategory from '../../../handlers/category/list';
import { eventGenerator } from '../../../utils/test/eventGenerator';

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

afterAll(async () => {
  await cache.quit()
  await db.disconnect()
});

describe('List category integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should return 200 with valid token', async () => {
    const event = eventGenerator({ headers })
    // @ts-ignore
    const res = await listCategory.handler(event);
    const response = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(response.categories).toBeDefined();
  })

  describe('rules token', () => {
    test('it should return 401 without token', async () => {
      const event = eventGenerator({});
      // @ts-ignore
      const res = await listCategory.handler(event);
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
      const res = await listCategory.handler(event);
      const response = JSON.parse(res.body);

      expect(res.statusCode).toBe(401);
      expect(response.message).toEqual('Invalid token');
    })
  })
})
