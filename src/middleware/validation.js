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
} from '../validation/validators.js';

/**
 * Validation middleware for stats card
 */
export const validateStatsRequest = (req, res, next) => {
  try {
    const { query } = req;
    
    // Validate required parameters
    const username = validateUsername(query.username);
    
    // Validate optional parameters
    const theme = validateTheme(query.theme);
    const hide = validateHide(query.hide);
    const show = validateShow(query.show);
    const cacheSeconds = validateCacheSeconds(query.cache_seconds);
    const locale = validateLocale(query.locale);
    
    // Validate boolean parameters
    const showIcons = validateBoolean(query.show_icons, 'show_icons');
    const hideBorder = validateBoolean(query.hide_border, 'hide_border');
    const includeAllCommits = validateBoolean(query.include_all_commits, 'include_all_commits');
    const rankIcon = validateBoolean(query.rank_icon, 'rank_icon');
    
    // Validate color parameters
    const titleColor = validateColor(query.title_color, 'title_color');
    const iconColor = validateColor(query.icon_color, 'icon_color');
    const textColor = validateColor(query.text_color, 'text_color');
    const bgColor = validateColor(query.bg_color, 'bg_color');
    const borderColor = validateColor(query.border_color, 'border_color');
    const ringColor = validateColor(query.ring_color, 'ring_color');
    
    // Validate numeric parameters
    const lineHeight = validateNumeric(query.line_height, 'line_height', 10, 100, 25);
    const commitsYear = validateNumeric(query.commits_year, 'commits_year', 2000, new Date().getFullYear(), new Date().getFullYear());
    
    // Store validated parameters
    req.validatedQuery = {
      username,
      theme,
      hide,
      show,
      cache_seconds: cacheSeconds,
      locale,
      show_icons: showIcons,
      hide_border: hideBorder,
      include_all_commits: includeAllCommits,
      rank_icon: rankIcon,
      title_color: titleColor,
      icon_color: iconColor,
      text_color: textColor,
      bg_color: bgColor,
      border_color: borderColor,
      ring_color: ringColor,
      line_height: lineHeight,
      commits_year: commitsYear
    };
    
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message,
      status: 400
    });
  }
};

/**
 * Validation middleware for repo card
 */
export const validateRepoRequest = (req, res, next) => {
  try {
    const { query } = req;
    
    // Validate required parameters
    const username = validateUsername(query.username);
    const repo = validateUsername(query.repo); // Reuse username validation for repo name
    
    // Validate optional parameters
    const theme = validateTheme(query.theme);
    const cacheSeconds = validateCacheSeconds(query.cache_seconds);
    const locale = validateLocale(query.locale);
    
    // Validate boolean parameters
    const showOwner = validateBoolean(query.show_owner, 'show_owner');
    const hideBorder = validateBoolean(query.hide_border, 'hide_border');
    
    // Validate color parameters
    const titleColor = validateColor(query.title_color, 'title_color');
    const iconColor = validateColor(query.icon_color, 'icon_color');
    const textColor = validateColor(query.text_color, 'text_color');
    const bgColor = validateColor(query.bg_color, 'bg_color');
    const borderColor = validateColor(query.border_color, 'border_color');
    
    // Validate numeric parameters
    const descriptionLinesCount = validateNumeric(query.description_lines_count, 'description_lines_count', 1, 10, 3);
    
    // Store validated parameters
    req.validatedQuery = {
      username,
      repo,
      theme,
      cache_seconds: cacheSeconds,
      locale,
      show_owner: showOwner,
      hide_border: hideBorder,
      title_color: titleColor,
      icon_color: iconColor,
      text_color: textColor,
      bg_color: bgColor,
      border_color: borderColor,
      description_lines_count: descriptionLinesCount
    };
    
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message,
      status: 400
    });
  }
};

/**
 * Validation middleware for top languages card
 */
export const validateTopLangsRequest = (req, res, next) => {
  try {
    const { query } = req;
    
    // Validate required parameters
    const username = validateUsername(query.username);
    
    // Validate optional parameters
    const theme = validateTheme(query.theme);
    const hide = validateHide(query.hide);
    const cacheSeconds = validateCacheSeconds(query.cache_seconds);
    const locale = validateLocale(query.locale);
    
    // Validate boolean parameters
    const hideProgress = validateBoolean(query.hide_progress, 'hide_progress');
    const hideBorder = validateBoolean(query.hide_border, 'hide_border');
    
    // Validate color parameters
    const titleColor = validateColor(query.title_color, 'title_color');
    const iconColor = validateColor(query.icon_color, 'icon_color');
    const textColor = validateColor(query.text_color, 'text_color');
    const bgColor = validateColor(query.bg_color, 'bg_color');
    const borderColor = validateColor(query.border_color, 'border_color');
    
    // Validate numeric parameters
    const langsCount = validateNumeric(query.langs_count, 'langs_count', 1, 20, 5);
    const sizeWeight = validateNumeric(query.size_weight, 'size_weight', 0, 10, 1);
    const countWeight = validateNumeric(query.count_weight, 'count_weight', 0, 10, 1);
    
    // Validate layout parameter
    const validLayouts = ['normal', 'compact', 'donut', 'donut-vertical', 'pie'];
    const layout = query.layout && validLayouts.includes(query.layout) ? query.layout : 'normal';
    
    // Store validated parameters
    req.validatedQuery = {
      username,
      theme,
      hide,
      cache_seconds: cacheSeconds,
      locale,
      hide_progress: hideProgress,
      hide_border: hideBorder,
      title_color: titleColor,
      icon_color: iconColor,
      text_color: textColor,
      bg_color: bgColor,
      border_color: borderColor,
      langs_count: langsCount,
      size_weight: sizeWeight,
      count_weight: countWeight,
      layout
    };
    
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message,
      status: 400
    });
  }
};

/**
 * Validation middleware for WakaTime card
 */
export const validateWakaTimeRequest = (req, res, next) => {
  try {
    const { query } = req;
    
    // Validate required parameters
    const username = validateUsername(query.username);
    
    // Validate optional parameters
    const theme = validateTheme(query.theme);
    const hide = validateHide(query.hide);
    const cacheSeconds = validateCacheSeconds(query.cache_seconds);
    const locale = validateLocale(query.locale);
    
    // Validate boolean parameters
    const hideProgress = validateBoolean(query.hide_progress, 'hide_progress');
    const hideBorder = validateBoolean(query.hide_border, 'hide_border');
    
    // Validate color parameters
    const titleColor = validateColor(query.title_color, 'title_color');
    const iconColor = validateColor(query.icon_color, 'icon_color');
    const textColor = validateColor(query.text_color, 'text_color');
    const bgColor = validateColor(query.bg_color, 'bg_color');
    const borderColor = validateColor(query.border_color, 'border_color');
    
    // Validate numeric parameters
    const langsCount = validateNumeric(query.langs_count, 'langs_count', 1, 20, 5);
    
    // Validate layout parameter
    const validLayouts = ['normal', 'compact', 'donut', 'donut-vertical', 'pie'];
    const layout = query.layout && validLayouts.includes(query.layout) ? query.layout : 'normal';
    
    // Store validated parameters
    req.validatedQuery = {
      username,
      theme,
      hide,
      cache_seconds: cacheSeconds,
      locale,
      hide_progress: hideProgress,
      hide_border: hideBorder,
      title_color: titleColor,
      icon_color: iconColor,
      text_color: textColor,
      bg_color: bgColor,
      border_color: borderColor,
      langs_count: langsCount,
      layout
    };
    
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message,
      status: 400
    });
  }
};

/**
 * Validation middleware for gist card
 */
export const validateGistRequest = (req, res, next) => {
  try {
    const { query } = req;
    
    // Validate required parameters
    const gistId = query.id;
    if (!gistId || typeof gistId !== 'string') {
      throw new Error('Gist ID is required');
    }
    
    // Validate optional parameters
    const theme = validateTheme(query.theme);
    const cacheSeconds = validateCacheSeconds(query.cache_seconds);
    const locale = validateLocale(query.locale);
    
    // Validate boolean parameters
    const showOwner = validateBoolean(query.show_owner, 'show_owner');
    const hideBorder = validateBoolean(query.hide_border, 'hide_border');
    
    // Validate color parameters
    const titleColor = validateColor(query.title_color, 'title_color');
    const iconColor = validateColor(query.icon_color, 'icon_color');
    const textColor = validateColor(query.text_color, 'text_color');
    const bgColor = validateColor(query.bg_color, 'bg_color');
    const borderColor = validateColor(query.border_color, 'border_color');
    
    // Store validated parameters
    req.validatedQuery = {
      id: gistId,
      theme,
      cache_seconds: cacheSeconds,
      locale,
      show_owner: showOwner,
      hide_border: hideBorder,
      title_color: titleColor,
      icon_color: iconColor,
      text_color: textColor,
      bg_color: bgColor,
      border_color: borderColor
    };
    
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message,
      status: 400
    });
  }
};
