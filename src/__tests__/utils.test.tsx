import { generateUUID4 } from '../api/sentry-service/utils';

describe('generateUUID4', () => {
  test('returns a string with 36 characters', () => {
    const uuid = generateUUID4();
    expect(uuid).toHaveLength(36);
  });

  test('returns a string with the correct format', () => {
    const uuid = generateUUID4();
    const expected =
      /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[\da-f]{4}-[\da-f]{12}$/;
    expect(uuid).toMatch(expected);
  });
});
