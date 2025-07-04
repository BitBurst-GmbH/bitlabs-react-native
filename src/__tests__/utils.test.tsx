import {
  buildOfferWallUrl,
  encryptBase64,
  extractColors,
  generateUUID4,
  isColorLuminant,
} from '../utils';

describe('extractColors', () => {
  test('returns array with color twice given a HEX color', () => {
    const color = '#ff0000';
    const colors = extractColors(color);
    expect(colors).toEqual(['#ff0000', '#ff0000']);
  });

  test('returns array with colors given a CSS linear-gradient', () => {
    const color = 'linear-gradient(90deg, #ff0000 0%, #00ff00 100%)';
    const colors = extractColors(color);
    expect(colors).toEqual(['#ff0000', '#00ff00']);
  });

  test('returns undefined given a string that is neither HEX nor linear-gradient', () => {
    const color = 'Not Hex, nor linear-gradient';
    const colors = extractColors(color);
    expect(colors).toBeUndefined();
  });

  test('returns undefined given an empty string', () => {
    const color = '';
    const colors = extractColors(color);
    expect(colors).toBeUndefined();
  });
});

describe('isColorLuminant', () => {
  test('returns true given a color array including white', () => {
    const colors = ['#ffffff', '#ffffff'];
    const isLuminant = isColorLuminant(colors);
    expect(isLuminant).toBe(true);
  });

  test('returns false given a color array including black', () => {
    const colors = ['#000000', '#000000'];
    const isLuminant = isColorLuminant(colors);
    expect(isLuminant).toBe(false);
  });

  test('returns true given a color array including both white and black', () => {
    const colors = ['#ffffff', '#000000'];
    const isLuminant = isColorLuminant(colors);
    expect(isLuminant).toBe(true);
  });
});

describe('encryptBase64', () => {
  test('returns string encrypted in base64 given a string', () => {
    const str = 'Hello World!';
    const encrypted = encryptBase64(str);
    expect(encrypted).toBe('SGVsbG8gV29ybGQh');
  });

  test('returns empty string given an empty string', () => {
    const str = '';
    const encrypted = encryptBase64(str);
    expect(encrypted).toBe('');
  });

  test('returns string encrypted in base64 given a string with special characters', () => {
    const str = 'Hello World!@#$%^&*()_+';
    const encrypted = encryptBase64(str);
    expect(encrypted).toBe('SGVsbG8gV29ybGQhQCMkJV4mKigpXys=');
  });
});

describe('buildOfferWallUrl', () => {
  test('constructs URL correctly with token, uid, tags, and sdk parameter', () => {
    const token = 'token123';
    const uid = 'uid123';
    const tags = { tag1: 'value1', tag2: true };
    const url = buildOfferWallUrl(token, uid, tags, true);
    expect(url).toBe(
      'https://web.bitlabs.ai?token=token123&uid=uid123&os=ios&sdk=REACT&tag1=value1&tag2=true'
    );
  });

  test('constructs URL correctly without sdk parameter', () => {
    const token = 'token123';
    const uid = 'uid123';
    const tags = { tag1: 'value1', tag2: true };
    const url = buildOfferWallUrl(token, uid, tags, false);
    expect(url).toBe(
      'https://web.bitlabs.ai?token=token123&uid=uid123&os=ios&tag1=value1&tag2=true'
    );
  });

  test('handles empty tags correctly', () => {
    const token = 'token123';
    const uid = 'uid123';
    const tags = {};
    const url = buildOfferWallUrl(token, uid, tags, true);
    expect(url).toBe(
      'https://web.bitlabs.ai?token=token123&uid=uid123&os=ios&sdk=REACT'
    );
  });
});

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
