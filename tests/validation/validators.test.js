import { describe, expect, it } from "@jest/globals";
import { 
  validateUsername, 
  validateTheme, 
  validateHide, 
  validateShow, 
  validateCacheSeconds, 
  validateBoolean, 
  validateColor,
  validateNumeric,
  validateLocale
} from "../../src/validation/validators.js";

describe('Username Validation', () => {
  test('valid usernames', () => {
    expect(validateUsername('anuraghazra')).toBe('anuraghazra');
    expect(validateUsername('user-name')).toBe('user-name');
    expect(validateUsername('user123')).toBe('user123');
    expect(validateUsername('USER-NAME')).toBe('user-name'); // Should lowercase
  });
  
  test('invalid usernames', () => {
    expect(() => validateUsername('')).toThrow('Username is required');
    expect(() => validateUsername(null)).toThrow('Username is required');
    expect(() => validateUsername(undefined)).toThrow('Username is required');
    expect(() => validateUsername('user-name-')).toThrow('Invalid GitHub username format');
    expect(() => validateUsername('-username')).toThrow('Invalid GitHub username format');
    expect(() => validateUsername('renovate-bot')).toThrow('This username is not allowed');
    expect(() => validateUsername('a'.repeat(40))).toThrow('Username must be between 1 and 39 characters');
  });
});

describe('Theme Validation', () => {
  test('valid themes', () => {
    expect(validateTheme('default')).toBe('default');
    expect(validateTheme('dark')).toBe('dark');
    expect(validateTheme('DARK')).toBe('dark'); // Should lowercase
    expect(validateTheme('')).toBe('default'); // Empty should default
    expect(validateTheme(null)).toBe('default'); // Null should default
  });
  
  test('invalid themes', () => {
    expect(() => validateTheme('invalid-theme')).toThrow('Theme \'invalid-theme\' not found');
    expect(() => validateTheme(123)).toThrow('Theme must be a string');
  });
});

describe('Hide/Show Validation', () => {
  test('valid hide elements', () => {
    expect(validateHide('stars,commits')).toEqual(['stars', 'commits']);
    expect(validateHide('stars')).toEqual(['stars']);
    expect(validateHide('')).toEqual([]);
    expect(validateHide(null)).toEqual([]);
  });
  
  test('invalid hide elements', () => {
    expect(() => validateHide('invalid,stars')).toThrow('Invalid hide elements: invalid');
    expect(() => validateHide('stars,invalid,commits')).toThrow('Invalid hide elements: invalid');
  });
  
  test('valid show elements', () => {
    expect(validateShow('stars,commits')).toEqual(['stars', 'commits']);
    expect(validateShow('stars')).toEqual(['stars']);
    expect(validateShow('')).toEqual([]);
    expect(validateShow(null)).toEqual([]);
  });
  
  test('invalid show elements', () => {
    expect(() => validateShow('invalid,stars')).toThrow('Invalid show elements: invalid');
  });
});

describe('Cache Seconds Validation', () => {
  test('valid cache seconds', () => {
    expect(validateCacheSeconds('3600')).toBe(3600);
    expect(validateCacheSeconds('0')).toBe(0);
    expect(validateCacheSeconds('86400')).toBe(86400);
    expect(validateCacheSeconds('')).toBe(null);
    expect(validateCacheSeconds(null)).toBe(null);
  });
  
  test('invalid cache seconds', () => {
    expect(() => validateCacheSeconds('invalid')).toThrow('cache_seconds must be a number');
    expect(() => validateCacheSeconds('-1')).toThrow('cache_seconds must be non-negative');
    expect(() => validateCacheSeconds('100000')).toThrow('cache_seconds cannot exceed 86400 (24 hours)');
  });
});

describe('Boolean Validation', () => {
  test('valid boolean values', () => {
    expect(validateBoolean('true', 'test')).toBe(true);
    expect(validateBoolean('false', 'test')).toBe(false);
    expect(validateBoolean('1', 'test')).toBe(true);
    expect(validateBoolean('0', 'test')).toBe(false);
    expect(validateBoolean('yes', 'test')).toBe(true);
    expect(validateBoolean('no', 'test')).toBe(false);
    expect(validateBoolean('', 'test')).toBe(false);
    expect(validateBoolean(null, 'test')).toBe(false);
  });
  
  test('invalid boolean values', () => {
    expect(() => validateBoolean('maybe', 'test')).toThrow('test must be true, false, 1, 0, yes, or no');
    expect(() => validateBoolean('invalid', 'test')).toThrow('test must be true, false, 1, 0, yes, or no');
  });
});

describe('Color Validation', () => {
  test('valid colors', () => {
    expect(validateColor('fff', 'test')).toBe('fff');
    expect(validateColor('ffffff', 'test')).toBe('ffffff');
    expect(validateColor('#fff', 'test')).toBe('fff'); // Should remove #
    expect(validateColor('#ffffff', 'test')).toBe('ffffff'); // Should remove #
    expect(validateColor('', 'test')).toBe(null);
    expect(validateColor(null, 'test')).toBe(null);
  });
  
  test('invalid colors', () => {
    expect(() => validateColor('ggg', 'test')).toThrow('test must be a valid hex color');
    expect(() => validateColor('ff', 'test')).toThrow('test must be a valid hex color');
    expect(() => validateColor('fffffff', 'test')).toThrow('test must be a valid hex color');
  });
});

describe('Numeric Validation', () => {
  test('valid numeric values', () => {
    expect(validateNumeric('10', 'test', 0, 100, 5)).toBe(10);
    expect(validateNumeric('0', 'test', 0, 100, 5)).toBe(0);
    expect(validateNumeric('100', 'test', 0, 100, 5)).toBe(100);
    expect(validateNumeric('', 'test', 0, 100, 5)).toBe(5); // Default value
    expect(validateNumeric(null, 'test', 0, 100, 5)).toBe(5); // Default value
  });
  
  test('invalid numeric values', () => {
    expect(() => validateNumeric('invalid', 'test', 0, 100, 5)).toThrow('test must be a number');
    expect(() => validateNumeric('-1', 'test', 0, 100, 5)).toThrow('test must be between 0 and 100');
    expect(() => validateNumeric('101', 'test', 0, 100, 5)).toThrow('test must be between 0 and 100');
  });
});

describe('Locale Validation', () => {
  test('valid locales', () => {
    expect(validateLocale('en')).toBe('en');
    expect(validateLocale('EN')).toBe('en'); // Should lowercase
    expect(validateLocale('es')).toBe('es');
    expect(validateLocale('fr')).toBe('fr');
    expect(validateLocale('')).toBe('en'); // Empty should default
    expect(validateLocale(null)).toBe('en'); // Null should default
  });
  
  test('invalid locales', () => {
    expect(() => validateLocale('invalid')).toThrow('Invalid locale \'invalid\'');
    expect(() => validateLocale('xyz')).toThrow('Invalid locale \'xyz\'');
  });
});
