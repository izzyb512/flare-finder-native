/**
 * Flare Finder Native - Theme System
 * Ported from web app's index.css design tokens
 */

// Color palette matching the web app's CSS variables
export const colors = {
    // Base colors
    background: '#1D1D1D',
    foreground: '#F9FAFB',

    // Card colors
    card: '#1D1D1D',
    cardForeground: '#F9FAFB',

    // Popover
    popover: '#1D1D1D',
    popoverForeground: '#F9FAFB',

    // Primary - Magenta
    primary: '#FF00FF',
    primaryForeground: '#FFFFFF',

    // Secondary
    secondary: '#292929',
    secondaryForeground: '#F9FAFB',

    // Muted
    muted: '#4A4A4A',
    mutedForeground: '#6B7280',

    // Accent - Cyan
    accent: '#00F5FF',
    accentForeground: '#1D1D1D',

    // Destructive
    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',

    // Border & Input
    border: '#333333',
    input: '#292929',
    ring: '#FF00FF',

    // Status Colors (Iridescent)
    success: '#06FFA5',
    warning: '#FFD60A',
    error: '#FF6B35',
    info: '#00F5FF',

    // Glass effect colors
    glass: {
        background: 'rgba(42, 42, 42, 0.15)',
        backgroundSecondary: 'rgba(42, 42, 42, 0.12)',
        backgroundTertiary: 'rgba(42, 42, 42, 0.10)',
        border: 'rgba(255, 255, 255, 0.08)',
        borderLight: 'rgba(255, 255, 255, 0.06)',
        highlight: 'rgba(255, 255, 255, 0.15)',
    },

    // Gradient colors for iridescent effects
    gradient: {
        magenta: '#FF00FF',
        purple: '#9D4EDD',
        cyan: '#4CC9F0',
        green: '#06FFA5',
        yellow: '#FFD60A',
    },

    // Text colors
    text: {
        primary: '#F9FAFB',
        secondary: '#9CA3AF',
        muted: '#6B7280',
        inverse: '#1D1D1D',
    },

    // White with opacity
    white: {
        100: 'rgba(255, 255, 255, 1)',
        80: 'rgba(255, 255, 255, 0.8)',
        60: 'rgba(255, 255, 255, 0.6)',
        40: 'rgba(255, 255, 255, 0.4)',
        20: 'rgba(255, 255, 255, 0.2)',
        10: 'rgba(255, 255, 255, 0.1)',
        5: 'rgba(255, 255, 255, 0.05)',
    },

    // Black with opacity
    black: {
        100: 'rgba(0, 0, 0, 1)',
        80: 'rgba(0, 0, 0, 0.8)',
        60: 'rgba(0, 0, 0, 0.6)',
        40: 'rgba(0, 0, 0, 0.4)',
        20: 'rgba(0, 0, 0, 0.2)',
    },
};

// Typography matching Inter font
export const typography = {
    fontFamily: {
        sans: 'System', // Will use SF Pro on iOS, Roboto on Android
    },
    fontSize: {
        xs: 11,
        sm: 13,
        base: 15,
        md: 15,
        lg: 17,
        xl: 20,
        '2xl': 24,
        '3xl': 28,
        '4xl': 34,
        '5xl': 40,
        '6xl': 48,
    },
    fontWeight: {
        light: '300' as const,
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
        black: '900' as const,
    },
    lineHeight: {
        tight: 1.1,
        snug: 1.25,
        normal: 1.5,
        relaxed: 1.625,
    },
};

// Spacing scale
export const spacing = {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
};

// Border radius
export const borderRadius = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    full: 9999,
};

// Shadows
export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.45,
        shadowRadius: 24,
        elevation: 12,
    },
    glass: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 32,
        elevation: 8,
    },
};

// Animation durations
export const animation = {
    fast: 150,
    normal: 300,
    slow: 500,
};

// Export theme object
export const theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    animation,
};

export default theme;
