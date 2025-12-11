import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    disabled?: boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

/**
 * Button Component
 * Matches the web app's button styles with iOS press feedback
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    variant = 'default',
    size = 'default',
    disabled = false,
    loading = false,
    style,
    textStyle,
    leftIcon,
    rightIcon,
}) => {
    const isDisabled = disabled || loading;

    const getButtonStyle = (): ViewStyle => {
        switch (variant) {
            case 'default':
                return {
                    backgroundColor: colors.primary,
                };
            case 'destructive':
                return {
                    backgroundColor: colors.destructive,
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: colors.border,
                };
            case 'secondary':
                return {
                    backgroundColor: colors.secondary,
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                };
            case 'link':
                return {
                    backgroundColor: 'transparent',
                    paddingHorizontal: 0,
                };
            default:
                return {
                    backgroundColor: colors.primary,
                };
        }
    };

    const getTextColor = (): string => {
        switch (variant) {
            case 'default':
                return colors.primaryForeground;
            case 'destructive':
                return colors.destructiveForeground;
            case 'outline':
            case 'secondary':
            case 'ghost':
                return colors.foreground;
            case 'link':
                return colors.primary;
            default:
                return colors.primaryForeground;
        }
    };

    const getSizeStyle = (): ViewStyle => {
        switch (size) {
            case 'sm':
                return {
                    height: 36,
                    paddingHorizontal: spacing[3],
                    borderRadius: borderRadius.md,
                };
            case 'lg':
                return {
                    height: 48,
                    paddingHorizontal: spacing[8],
                    borderRadius: borderRadius.lg,
                };
            case 'icon':
                return {
                    height: 40,
                    width: 40,
                    paddingHorizontal: 0,
                    borderRadius: borderRadius.md,
                };
            default:
                return {
                    height: 44,
                    paddingHorizontal: spacing[4],
                    borderRadius: borderRadius.md,
                };
        }
    };

    const getTextSize = (): number => {
        switch (size) {
            case 'sm':
                return typography.fontSize.sm;
            case 'lg':
                return typography.fontSize.lg;
            default:
                return typography.fontSize.base;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.8}
            style={[
                styles.base,
                getButtonStyle(),
                getSizeStyle(),
                isDisabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} size="small" />
            ) : (
                <>
                    {leftIcon}
                    {typeof children === 'string' ? (
                        <Text
                            style={[
                                styles.text,
                                { color: getTextColor(), fontSize: getTextSize() },
                                leftIcon && { marginLeft: spacing[2] },
                                rightIcon && { marginRight: spacing[2] },
                                textStyle,
                            ]}
                        >
                            {children}
                        </Text>
                    ) : (
                        children
                    )}
                    {rightIcon}
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: typography.fontWeight.medium,
    },
    disabled: {
        opacity: 0.5,
    },
});

export default Button;
