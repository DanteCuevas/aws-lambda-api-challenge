import { describe, expect, test } from '@jest/globals';
import cache from '../../../utils/redis.util'
import db from '../../../utils/mongo.util'
import * as createCategory from '../../../handlers/category/create';
import { eventGenerator } from '../../../utils/test/eventGenerator';
import { CategorySeeder } from '../../../seeders/category.seeder';

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

describe('Create category integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should return 201 with valid token', async () => {
    const generate = CategorySeeder.generate()
    // @ts-ignore
    delete (generate.created_at)
    const body = JSON.stringify(generate);
    const event = eventGenerator({ body, headers })
    // @ts-ignore
    const res = await createCategory.handler(event);
    const response = JSON.parse(res.body);

    expect(res.statusCode).toBe(201);
    expect(response.category._id).toBeDefined();
    expect(response.category.name).toBeDefined();
    expect(response.category.description).toBeDefined();
    expect(response.category.created_at).toBeDefined();
  })

  describe('rules token', () => {
    test('it should return 401 without token', async () => {
      const event = eventGenerator({});
      // @ts-ignore
      const res = await createCategory.handler(event);
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
      const res = await createCategory.handler(event);
      const response = JSON.parse(res.body);

      expect(res.statusCode).toBe(401);
      expect(response.message).toEqual('Invalid token');
    })
  })

  describe('rules name', () => {
    test('it should return 422 without body', async () => {
      const body = JSON.stringify({});
      const event = eventGenerator({ body, headers })
      // @ts-ignore
      const res = await createCategory.handler(event);
      const response = JSON.parse(res.body);

      expect(res.statusCode).toBe(422);
      expect(response.errors.name[0]).toEqual('"name" is required');
    })

    test('it should return 401 wiht invalid name', async () => {
      const body = JSON.stringify({
        name: true
      });
      const event = eventGenerator({ body, headers })
      // @ts-ignore
      const res = await createCategory.handler(event);
      const response = JSON.parse(res.body);

      expect(res.statusCode).toBe(422);
      expect(response.errors.name[0]).toEqual('"name" must be a string');
    })
  })
})
