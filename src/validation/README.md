# Validation System

This directory contains the validation system for the GitHub Readme Stats API.

## Files

- `validators.js` - Core validation functions for all parameter types
- `../middleware/validation.js` - Middleware that applies validation to API endpoints

## Usage

### Basic Validation

```javascript
import { validateUsername, validateTheme, validateColor } from './validators.js';

// Validate username
const username = validateUsername('anuraghazra'); // Returns: 'anuraghazra'

// Validate theme
const theme = validateTheme('dark'); // Returns: 'dark'

// Validate color
const color = validateColor('fff', 'title_color'); // Returns: 'fff'
```

### Error Handling

```javascript
try {
  const username = validateUsername('invalid-username-format');
} catch (error) {
  console.log(error.message); // "Invalid GitHub username format. Use only letters, numbers, and hyphens"
}
```

## Available Validators

### validateUsername(username)
- Validates GitHub username format
- Length: 1-39 characters
- Format: Alphanumeric with hyphens
- Blacklist filtering
- Returns lowercase username

### validateTheme(theme)
- Validates theme against available themes
- Case insensitive
- Defaults to 'default' if empty

### validateHide(hide) / validateShow(show)
- Validates hide/show elements
- Comma-separated string input
- Returns array of valid elements

### validateCacheSeconds(cacheSeconds)
- Validates cache duration
- Range: 0 to 86400 seconds (24 hours)
- Returns number or null

### validateBoolean(value, paramName)
- Validates boolean parameters
- Accepts: 'true', 'false', '1', '0', 'yes', 'no'
- Case insensitive

### validateColor(color, paramName)
- Validates hex color format
- 3 or 6 character hex codes
- Removes '#' prefix
- Case insensitive

### validateNumeric(value, paramName, min, max, defaultValue)
- Validates numeric parameters with bounds
- Returns validated number or default value

### validateLocale(locale)
- Validates language/locale codes
- Case insensitive
- Defaults to 'en' if invalid

## Testing

Run the validation tests:

```bash
npm test tests/validation/validators.test.js
```

## Error Messages

All validators provide clear, actionable error messages:

- **Username**: "Username must be between 1 and 39 characters"
- **Theme**: "Theme 'invalid-theme' not found. Available themes: default, dark, light..."
- **Color**: "title_color must be a valid hex color (e.g., fff, ffffff)"
- **Cache**: "cache_seconds cannot exceed 86400 (24 hours)"

## Security

The validation system provides:

- **Input sanitization**: All inputs are cleaned and normalized
- **Injection prevention**: Strict format validation
- **Blacklist filtering**: Blocks known problematic inputs
- **Length limits**: Prevents buffer overflow attacks

## Contributing

When adding new validators:

1. Follow the existing pattern
2. Add comprehensive tests
3. Include clear error messages
4. Update this documentation
5. Consider security implications
