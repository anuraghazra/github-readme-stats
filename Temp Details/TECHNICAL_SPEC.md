# Technical Specification: Request Validation System

## Architecture Overview

The validation system follows a middleware pattern with centralized validation functions. It's designed to be modular, testable, and maintainable.

## Component Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Request   │───▶│ Validation       │───▶│   Processed     │
│                 │    │ Middleware       │    │   Request       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │ Validation       │
                       │ Functions        │
                       └──────────────────┘
```

## Data Flow

1. **Request arrives** at API endpoint
2. **Validation middleware** intercepts request
3. **Validation functions** check each parameter
4. **Valid request** continues to processing
5. **Invalid request** returns 400 error with details

## Validation Functions Specification

### validateUsername(username: string): string

**Purpose**: Validates GitHub username format and security

**Input**: 
- `username`: Raw username string from query parameter

**Output**: 
- Sanitized username (lowercase, trimmed)
- Throws error if invalid

**Validation Rules**:
```javascript
// Length validation
if (trimmed.length < 1 || trimmed.length > 39) {
  throw new Error('Username must be between 1 and 39 characters');
}

// Format validation (GitHub username regex)
const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
if (!usernameRegex.test(trimmed)) {
  throw new Error('Invalid GitHub username format. Use only letters, numbers, and hyphens');
}

// Blacklist validation
const blacklist = ['renovate-bot', 'technote-space', 'sw-yx', 'YourUsername', '[YourUsername]'];
if (blacklist.includes(trimmed.toLowerCase())) {
  throw new Error('This username is not allowed');
}
```

**Error Cases**:
- Empty or null input
- Invalid format (special characters, starts/ends with hyphen)
- Too long (>39 characters)
- Blacklisted username

### validateTheme(theme: string): string

**Purpose**: Validates theme parameter against available themes

**Input**: 
- `theme`: Theme name string

**Output**: 
- Valid theme name (lowercase)
- Defaults to 'default' if empty

**Validation Rules**:
```javascript
// Type validation
if (typeof theme !== 'string') {
  throw new Error('Theme must be a string');
}

// Existence validation
if (!themes[trimmed]) {
  const availableThemes = Object.keys(themes).slice(0, 10).join(', ');
  throw new Error(`Theme '${theme}' not found. Available themes: ${availableThemes}...`);
}
```

### validateHide(hide: string): string[]

**Purpose**: Validates hide parameter elements

**Input**: 
- `hide`: Comma-separated string of elements to hide

**Output**: 
- Array of valid hide elements

**Validation Rules**:
```javascript
const validElements = ['stars', 'commits', 'prs', 'issues', 'contribs', 'prs_merged', 'discussions_started', 'discussions_answered', 'rank', 'reviews'];
const hideArray = hide.split(',').map(item => item.trim().toLowerCase());

const invalidElements = hideArray.filter(item => !validElements.includes(item));
if (invalidElements.length > 0) {
  throw new Error(`Invalid hide elements: ${invalidElements.join(', ')}. Valid elements: ${validElements.join(', ')}`);
}
```

### validateCacheSeconds(cacheSeconds: string): number

**Purpose**: Validates cache duration parameter

**Input**: 
- `cacheSeconds`: Cache duration string

**Output**: 
- Valid cache duration number
- null if empty

**Validation Rules**:
```javascript
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
```

### validateBoolean(value: string, paramName: string): boolean

**Purpose**: Validates boolean parameters

**Input**: 
- `value`: Boolean value string
- `paramName`: Parameter name for error messages

**Output**: 
- Boolean value

**Validation Rules**:
```javascript
const lowerValue = value.toLowerCase();
if (lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes') {
  return true;
}
if (lowerValue === 'false' || lowerValue === '0' || lowerValue === 'no') {
  return false;
}

throw new Error(`${paramName} must be true, false, 1, 0, yes, or no`);
```

### validateColor(color: string, paramName: string): string

**Purpose**: Validates hex color parameters

**Input**: 
- `color`: Color value string

**Output**: 
- Valid color value (without #)

**Validation Rules**:
```javascript
const cleanColor = color.replace('#', '');

if (!/^[0-9A-Fa-f]{3,6}$/.test(cleanColor)) {
  throw new Error(`${paramName} must be a valid hex color (e.g., fff, ffffff)`);
}
```

## Middleware Specification

### validateStatsRequest(req, res, next)

**Purpose**: Validates all parameters for stats card endpoint

**Parameters Validated**:
- `username` (required)
- `theme`, `hide`, `show`, `cache_seconds`
- `show_icons`, `hide_border`, `include_all_commits`, `rank_icon`
- `title_color`, `icon_color`, `text_color`, `bg_color`, `border_color`, `ring_color`
- `line_height`, `commits_year`
- `locale`

**Error Response**:
```javascript
res.status(400).json({
  error: 'Validation Error',
  message: error.message,
  status: 400
});
```

### validateRepoRequest(req, res, next)

**Purpose**: Validates all parameters for repo card endpoint

**Parameters Validated**:
- `username`, `repo` (required)
- `theme`, `cache_seconds`, `locale`
- `show_owner`, `hide_border`
- `title_color`, `icon_color`, `text_color`, `bg_color`, `border_color`
- `description_lines_count`

## Error Handling

### Error Types

1. **Validation Errors**: Parameter validation failures
2. **Type Errors**: Wrong data types
3. **Format Errors**: Invalid formats (colors, usernames)
4. **Range Errors**: Values outside allowed ranges
5. **Security Errors**: Blacklisted inputs

### Error Response Format

```javascript
{
  error: 'Validation Error',
  message: 'Specific error description',
  status: 400
}
```

### Error Message Guidelines

- **Clear and specific**: Tell user exactly what's wrong
- **Actionable**: Suggest how to fix the issue
- **Consistent**: Same format across all validators
- **Helpful**: Include valid alternatives when possible

## Security Considerations

### Input Sanitization

1. **String trimming**: Remove leading/trailing whitespace
2. **Case normalization**: Convert to lowercase where appropriate
3. **Format cleaning**: Remove unwanted characters (e.g., # from colors)
4. **Length limits**: Prevent buffer overflow attacks

### Injection Prevention

1. **Strict format validation**: Only allow expected formats
2. **Type checking**: Ensure correct data types
3. **Range validation**: Limit numeric values to safe ranges
4. **Blacklist filtering**: Block known problematic inputs

### Access Control

1. **Username blacklist**: Block known problematic usernames
2. **Parameter validation**: Prevent unauthorized access patterns
3. **Rate limiting**: (Future enhancement)

## Performance Considerations

### Fail Fast

- Validation happens before any expensive operations
- Invalid requests are rejected immediately
- No unnecessary API calls for invalid requests

### Caching

- Valid requests get proper cache headers
- Invalid requests get no-cache headers
- Validation results could be cached (future enhancement)

### Memory Usage

- Validation functions are stateless
- No persistent storage of validation results
- Minimal memory footprint

## Testing Strategy

### Unit Tests

- **Function coverage**: 100% coverage for all validation functions
- **Edge cases**: Test boundary conditions and edge cases
- **Error cases**: Test all error conditions
- **Security tests**: Test injection attempts and malicious inputs

### Integration Tests

- **API endpoint tests**: Test validation with actual API calls
- **Middleware tests**: Test middleware integration
- **Error response tests**: Verify error response format

### Performance Tests

- **Load testing**: Test validation under load
- **Memory testing**: Monitor memory usage
- **Response time testing**: Measure validation overhead

## Deployment Strategy

### Incremental Rollout

1. **Phase 1**: Deploy validation functions and middleware
2. **Phase 2**: Enable validation on stats endpoint
3. **Phase 3**: Enable validation on repo endpoint
4. **Phase 4**: Enable validation on remaining endpoints

### Rollback Plan

- **Feature flag**: Can disable validation if needed
- **Graceful fallback**: Falls back to original behavior
- **Monitoring**: Track error rates and performance

### Monitoring

- **Error rates**: Track validation error frequency
- **Performance**: Monitor validation overhead
- **User feedback**: Watch for user complaints
- **Security**: Monitor for attack attempts

## Future Enhancements

### Potential Improvements

1. **Rate limiting**: Add per-user rate limiting
2. **Advanced validation**: More sophisticated input validation
3. **Caching**: Cache validation results for better performance
4. **Metrics**: Add validation metrics and monitoring
5. **Documentation**: Auto-generate API documentation

### Extensibility

- **New validators**: Easy to add new validation functions
- **New endpoints**: Simple to extend to new endpoints
- **Custom rules**: Allow custom validation rules
- **Configuration**: Make validation rules configurable

## Conclusion

This validation system provides a solid foundation for secure, reliable API endpoints. It's designed to be:

- **Secure**: Prevents common attack vectors
- **User-friendly**: Provides clear error messages
- **Maintainable**: Well-structured and documented
- **Performant**: Minimal overhead, fail-fast design
- **Extensible**: Easy to add new features

The implementation follows best practices for API validation and serves as a template for future enhancements.
