import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Input Component
 * Styled text input matching web app's glass-input styling
 */
export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    style,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    error && styles.inputError,
                    style,
                ]}
                placeholderTextColor={colors.mutedForeground}
                selectionColor={colors.primary}
                {...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        color: colors.text.primary,
        marginBottom: spacing[2],
    },
    input: {
        height: 44,
        backgroundColor: colors.glass.backgroundTertiary,
        borderWidth: 1,
        borderColor: colors.glass.borderLight,
        borderRadius: borderRadius['2xl'],
        paddingHorizontal: spacing[4],
        fontSize: typography.fontSize.base,
        color: colors.text.primary,
    },
    inputError: {
        borderColor: colors.error,
    },
    error: {
        fontSize: typography.fontSize.xs,
        color: colors.error,
        marginTop: spacing[1],
    },
});

export default Input;
