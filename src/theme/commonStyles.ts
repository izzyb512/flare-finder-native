import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from './index';

/**
 * Common styles used throughout the app
 * These mirror the CSS utility classes from the web app
 */

export const commonStyles = StyleSheet.create({
    // Containers
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing[6],
        paddingBottom: spacing[32],
    },

    // Text styles
    textPrimary: {
        color: colors.text.primary,
        fontWeight: typography.fontWeight.normal,
    },
    textSecondary: {
        color: colors.text.secondary,
        fontWeight: typography.fontWeight.normal,
    },
    textMuted: {
        color: colors.text.muted,
        fontWeight: typography.fontWeight.normal,
    },

    // Headers
    headerLarge: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
        letterSpacing: -0.5,
    },
    headerMedium: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
    },
    headerSmall: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
    },

    // Body text
    bodyLarge: {
        fontSize: typography.fontSize.lg,
        color: colors.text.primary,
        lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
    },
    bodyMedium: {
        fontSize: typography.fontSize.base,
        color: colors.text.primary,
        lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    },
    bodySmall: {
        fontSize: typography.fontSize.sm,
        color: colors.text.secondary,
        lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    },

    // Caption
    caption: {
        fontSize: typography.fontSize.xs,
        color: colors.text.muted,
    },

    // Flexbox utilities
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    column: {
        flexDirection: 'column',
    },
    columnCenter: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexGrow: {
        flex: 1,
    },

    // Spacing
    gap2: {
        gap: spacing[2],
    },
    gap3: {
        gap: spacing[3],
    },
    gap4: {
        gap: spacing[4],
    },
    gap6: {
        gap: spacing[6],
    },

    // Padding
    p4: {
        padding: spacing[4],
    },
    p6: {
        padding: spacing[6],
    },
    px4: {
        paddingHorizontal: spacing[4],
    },
    px6: {
        paddingHorizontal: spacing[6],
    },
    py4: {
        paddingVertical: spacing[4],
    },
    py6: {
        paddingVertical: spacing[6],
    },

    // Margin
    mb2: {
        marginBottom: spacing[2],
    },
    mb4: {
        marginBottom: spacing[4],
    },
    mb6: {
        marginBottom: spacing[6],
    },
    mt4: {
        marginTop: spacing[4],
    },
    mt6: {
        marginTop: spacing[6],
    },

    // Full width
    fullWidth: {
        width: '100%',
    },
});

export default commonStyles;
