import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface LogMealButtonProps {
    onPress: () => void;
}

/**
 * LogMealButton Component
 * Simplified button matching the web app's collapsed state
 */
export const LogMealButton: React.FC<LogMealButtonProps> = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Log Meal</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        marginBottom: spacing[6],
    },
    button: {
        backgroundColor: 'rgba(42, 42, 42, 0.12)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        paddingHorizontal: spacing[5],
        paddingVertical: spacing[3],
        minWidth: 120,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.9)',
    },
});

export default LogMealButton;
