import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface LabelProps extends TextProps {
    children: React.ReactNode;
    required?: boolean;
    size?: 'sm' | 'default';
}

/**
 * Label Component
 * Used for form field labels
 */
export const Label: React.FC<LabelProps> = ({
    children,
    required = false,
    size = 'default',
    style,
    ...props
}) => {
    return (
        <Text
            style={[
                styles.label,
                size === 'sm' && styles.labelSmall,
                style,
            ]}
            {...props}
        >
            {children}
            {required && <Text style={styles.required}> *</Text>}
        </Text>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium,
        color: colors.text.primary,
        marginBottom: spacing[2],
    },
    labelSmall: {
        fontSize: typography.fontSize.xs,
        color: colors.mutedForeground,
    },
    required: {
        color: colors.error,
    },
});

export default Label;
