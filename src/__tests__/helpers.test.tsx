import {
  currencize,
  encryptBase64,
  extractColors,
  isColorLuminant,
  rounded,
} from '../utils/helpers';

describe('extractColors', () => {
  test('Given a color as HEX, return an array containg the color twice', () => {
    const color = '#ff0000';
    const colors = extractColors(color);
    expect(colors).toEqual(['#ff0000', '#ff0000']);
  });

  test('Given a color as a css linear-gradient, return an array containing the colors', () => {
    const color = 'linear-gradient(90deg, #ff0000 0%, #00ff00 100%)';
    const colors = extractColors(color);
    expect(colors).toEqual(['#ff0000', '#00ff00']);
  });

  test('Given an empty string, return undefined', () => {
    const color = '';
    const colors = extractColors(color);
    expect(colors).toBeUndefined();
  });

  test('Given a string is not HEX nor linear-gradient, return undefined', () => {
    const color = 'Not Hex, nor linear-gradient';
    const colors = extractColors(color);
    expect(colors).toBeUndefined();
  });
});

describe('isColorLuminant', () => {
  test('Given a color array including white, return true', () => {
    const colors = ['#ffffff', '#ffffff'];
    const isLuminant = isColorLuminant(colors);
    expect(isLuminant).toBe(true);
  });

  test('Given a color array including black, return false', () => {
    const colors = ['#000000', '#000000'];
    const isLuminant = isColorLuminant(colors);
    expect(isLuminant).toBe(false);
  });

  test('Given a color array including white and black, return true', () => {
    const colors = ['#ffffff', '#000000'];
    const isLuminant = isColorLuminant(colors);
    expect(isLuminant).toBe(true);
  });
});

describe('rounded', () => {
  test('Given a number with 2 or more decimal points, return the same number rounded to 2 decimals', () => {
    const number = 1.23456789;
    const roundedNum = rounded(number);
    expect(roundedNum).toBe(1.23);
  });

  test('Given a number with 1 decimal point, return the same number', () => {
    const number = 1.2;
    const roundedNum = rounded(number);
    expect(roundedNum).toBe(1.2);
  });

  test('Given a number with no decimal points, return the same number', () => {
    const number = 1;
    const roundedNum = rounded(number);
    expect(roundedNum).toBe(1);
  });
});

describe('currencize', () => {
  test('Given a value and a currency string, return the value with the currency string', () => {
    const value = '1';
    const currency = '$';
    const currencized = currencize(value, currency);
    expect(currencized).toBe('1 $');
  });

  test('Given a value and an empty currency string, return the value alone', () => {
    const value = '1';
    const currency = '';
    const currencized = currencize(value, currency);
    expect(currencized).toBe('1');
  });

  test('Given an empty value and a currency string, return the currency string alone', () => {
    const value = '';
    const currency = '$';
    const currencized = currencize(value, currency);
    expect(currencized).toBe(' $');
  });

  test('Given an empty value and an empty currency string, return an empty string', () => {
    const value = '';
    const currency = '';
    const currencized = currencize(value, currency);
    expect(currencized).toBe('');
  });

  test('Given a value and a right-positional currency string, return the value with the currency string positioned to the right', () => {
    const value = '1';
    const currency = '${value}';
    const currencized = currencize(value, currency);
    expect(currencized).toBe('$1');
  });

  test('Given a value and a left-positional currency string, return the value with the currency string positioned to the left', () => {
    const value = '1';
    const currency = '{value}$';
    const currencized = currencize(value, currency);
    expect(currencized).toBe('1$');
  });
});

describe('encryptBase64', () => {
  test('Given a string, return the string encrypted in base64', () => {
    const str = 'Hello World!';
    const encrypted = encryptBase64(str);
    expect(encrypted).toBe('SGVsbG8gV29ybGQh');
  });

  test('Given an empty string, return an empty string', () => {
    const str = '';
    const encrypted = encryptBase64(str);
    expect(encrypted).toBe('');
  });

  test('Given a string with special characters, return the string encrypted in base64', () => {
    const str = 'Hello World!@#$%^&*()_+';
    const encrypted = encryptBase64(str);
    expect(encrypted).toBe('SGVsbG8gV29ybGQhQCMkJV4mKigpXys=');
  });
});
