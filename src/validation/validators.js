import { themes } from '../../themes/index.js';

/**
 * Validates GitHub username format
 * @param {string} username - Username to validate
 * @returns {string} - Sanitized username
 * @throws {Error} - If username is invalid
 */
export const validateUsername = (username) => {
  // Check if username exists
  if (!username || typeof username !== 'string') {
    throw new Error('Username is required');
  }

  // Trim whitespace
  const trimmed = username.trim();
  
  // Check length (GitHub usernames are 1-39 characters)
  if (trimmed.length < 1 || trimmed.length > 39) {
    throw new Error('Username must be between 1 and 39 characters');
  }

  // Check format (alphanumeric, hyphens, but not starting/ending with hyphen)
  const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
  if (!usernameRegex.test(trimmed)) {
    throw new Error('Invalid GitHub username format. Use only letters, numbers, and hyphens');
  }

  // Check against blacklist
  const blacklist = ['renovate-bot', 'technote-space', 'sw-yx', 'YourUsername', '[YourUsername]'];
  if (blacklist.includes(trimmed.toLowerCase())) {
    throw new Error('This username is not allowed');
  }

  return trimmed.toLowerCase();
};

/**
 * Validates theme parameter
 * @param {string} theme - Theme name to validate
 * @returns {string} - Valid theme name
 */
export const validateTheme = (theme) => {
  if (!theme) return 'default';
  
  if (typeof theme !== 'string') {
    throw new Error('Theme must be a string');
  }

  const trimmed = theme.trim().toLowerCase();
  
  if (!themes[trimmed]) {
    const availableThemes = Object.keys(themes).slice(0, 10).join(', ');
    throw new Error(`Theme '${theme}' not found. Available themes: ${availableThemes}...`);
  }

  return trimmed;
};

/**
 * Validates hide parameter
 * @param {string} hide - Comma-separated string of elements to hide
 * @returns {string[]} - Array of valid hide elements
 */
export const validateHide = (hide) => {
  if (!hide) return [];
  
  const validElements = ['stars', 'commits', 'prs', 'issues', 'contribs', 'prs_merged', 'discussions_started', 'discussions_answered', 'rank', 'reviews'];
  const hideArray = hide.split(',').map(item => item.trim().toLowerCase());
  
  const invalidElements = hideArray.filter(item => !validElements.includes(item));
  if (invalidElements.length > 0) {
    throw new Error(`Invalid hide elements: ${invalidElements.join(', ')}. Valid elements: ${validElements.join(', ')}`);
  }
  
  return hideArray;
};

/**
 * Validates show parameter
 * @param {string} show - Comma-separated string of elements to show
 * @returns {string[]} - Array of valid show elements
 */
export const validateShow = (show) => {
  if (!show) return [];
  
  const validElements = ['stars', 'commits', 'prs', 'issues', 'contribs', 'prs_merged', 'discussions_started', 'discussions_answered', 'rank', 'reviews'];
  const showArray = show.split(',').map(item => item.trim().toLowerCase());
  
  const invalidElements = showArray.filter(item => !validElements.includes(item));
  if (invalidElements.length > 0) {
    throw new Error(`Invalid show elements: ${invalidElements.join(', ')}. Valid elements: ${validElements.join(', ')}`);
  }
  
  return showArray;
};

/**
 * Validates cache_seconds parameter
 * @param {string} cacheSeconds - Cache duration in seconds
 * @returns {number} - Valid cache duration
 */
export const validateCacheSeconds = (cacheSeconds) => {
  if (!cacheSeconds) return null;
  
  const parsed = parseInt(cacheSeconds, 10);
  
  if (isNaN(parsed)) {
    throw new Error('cache_seconds must be a number');
  }
  
  if (parsed < 0) {
    throw new Error('cache_seconds must be non-negative');
  }
  
  if (parsed > 86400) { // 24 hours max
    throw new Error('cache_seconds cannot exceed 86400 (24 hours)');
  }
  
  return parsed;
};

/**
 * Validates boolean parameters
 * @param {string} value - Value to validate
 * @param {string} paramName - Name of the parameter for error messages
 * @returns {boolean} - Valid boolean value
 */
export const validateBoolean = (value, paramName) => {
  if (!value) return false;
  
  const lowerValue = value.toLowerCase();
  if (lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes') {
    return true;
  }
  if (lowerValue === 'false' || lowerValue === '0' || lowerValue === 'no') {
    return false;
  }
  
  throw new Error(`${paramName} must be true, false, 1, 0, yes, or no`);
};

/**
 * Validates color parameters
 * @param {string} color - Color value to validate
 * @param {string} paramName - Name of the parameter for error messages
 * @returns {string} - Valid color value
 */
export const validateColor = (color, paramName) => {
  if (!color) return null;
  
  // Remove # if present
  const cleanColor = color.replace('#', '');
  
  // Check hex color format
  if (!/^[0-9A-Fa-f]{3,6}$/.test(cleanColor)) {
    throw new Error(`${paramName} must be a valid hex color (e.g., fff, ffffff)`);
  }
  
  return cleanColor;
};

/**
 * Validates numeric parameters with min/max bounds
 * @param {string} value - Value to validate
 * @param {string} paramName - Name of the parameter for error messages
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @param {number} defaultValue - Default value if validation fails
 * @returns {number} - Valid numeric value
 */
export const validateNumeric = (value, paramName, min = 0, max = 1000, defaultValue = 0) => {
  if (!value) return defaultValue;
  
  const parsed = parseInt(value, 10);
  
  if (isNaN(parsed)) {
    throw new Error(`${paramName} must be a number`);
  }
  
  if (parsed < min || parsed > max) {
    throw new Error(`${paramName} must be between ${min} and ${max}`);
  }
  
  return parsed;
};

/**
 * Validates locale parameter
 * @param {string} locale - Locale to validate
 * @returns {string} - Valid locale
 */
export const validateLocale = (locale) => {
  if (!locale) return 'en';
  
  const validLocales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'zh-tw', 'hi', 'ar', 'tr', 'pl', 'nl', 'sv', 'da', 'no', 'fi'];
  
  if (!validLocales.includes(locale.toLowerCase())) {
    throw new Error(`Invalid locale '${locale}'. Supported locales: ${validLocales.join(', ')}`);
  }
  
  return locale.toLowerCase();
};
