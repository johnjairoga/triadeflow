/**
 * Design token definitions for the TriadeFlow Dashboard.
 * These tokens are overridable per client via the branding_theme config.
 */

export interface ThemeTokens {
  // Core colors (hex format)
  colors: {
    primary: string; // Main brand color
    secondary: string; // Supporting brand color
    accent: string; // Call-to-action / alerts
    background: string; // Page background
    surface: string; // Card/surface background
    border: string; // Borders
    text: string; // Primary text
    textSecondary: string; // Secondary text
    success: string;
    warning: string;
    error: string;
    info: string;
  };

  // Typography
  typography: {
    fontFamily: string; // CSS font-family
    fontSize: {
      xs: string; // 12px
      sm: string; // 14px
      base: string; // 16px
      lg: string; // 18px
      xl: string; // 20px
      '2xl': string; // 24px
      '3xl': string; // 30px
    };
    fontWeight: {
      light: number; // 300
      normal: number; // 400
      semibold: number; // 600
      bold: number; // 700
    };
    lineHeight: {
      tight: number; // 1.2
      normal: number; // 1.5
      relaxed: number; // 1.75
    };
  };

  // Spacing (pixels)
  spacing: {
    xs: string; // 4px
    sm: string; // 8px
    md: string; // 12px
    lg: string; // 16px
    xl: string; // 24px
    '2xl': string; // 32px
  };

  // Border radius
  borderRadius: {
    sm: string; // 4px
    md: string; // 8px
    lg: string; // 12px
    full: string; // 9999px
  };

  // Shadow
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
}

/**
 * Default theme tokens (TriadeFlow brand defaults).
 * Overridden by per-client branding_theme config at runtime.
 */
export const DEFAULT_THEME: ThemeTokens = {
  colors: {
    primary: '#4F46E5', // Indigo-600
    secondary: '#06B6D4', // Cyan-500
    accent: '#EC4899', // Pink-500
    background: '#FFFFFF',
    surface: '#F9FAFB',
    border: '#E5E7EB',
    text: '#111827',
    textSecondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },

  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },

  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
};

/**
 * Generate CSS variables from theme tokens.
 * Used in Next.js app to apply theme at runtime.
 */
export function generateCSSVariables(theme: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    vars[`--color-${camelToKebab(key)}`] = value;
  });

  // Typography
  vars['--font-family'] = theme.typography.fontFamily;
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    vars[`--font-size-${key}`] = value;
  });
  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    vars[`--font-weight-${key}`] = String(value);
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    vars[`--spacing-${key}`] = value;
  });

  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    vars[`--radius-${key}`] = value;
  });

  // Shadow
  Object.entries(theme.shadow).forEach(([key, value]) => {
    vars[`--shadow-${key}`] = value;
  });

  return vars;
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
