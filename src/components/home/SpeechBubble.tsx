import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, spacing, borderRadius, typography } from '../../theme';

interface SpeechBubbleProps {
    text: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.bubbleContainer}>
                <BlurView intensity={30} tint="dark" style={styles.blur}>
                    <Text style={styles.text}>{text}</Text>
                </BlurView>
                {/* Border layer for cleaner glass look */}
                <View style={[styles.border, StyleSheet.absoluteFill]} />
            </View>

            {/* Tail */}
            <View style={styles.tailContainer}>
                <View style={styles.tail} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: spacing[4],
        width: '100%', // Full width
    },
    bubbleContainer: {
        width: '100%', // Full width
        borderRadius: borderRadius['2xl'],
        overflow: 'hidden',
        backgroundColor: 'rgba(30, 30, 40, 0.6)', // Semi-transparent dark base
    },
    blur: {
        paddingVertical: spacing[5], // Increased padding
        paddingHorizontal: spacing[5],
    },
    border: {
        borderRadius: borderRadius['2xl'],
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    text: {
        color: colors.foreground,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: '500',
    },
    tailContainer: {
        marginTop: -3, // Overlap slightly
    },
    tail: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderTopWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'rgba(30, 30, 40, 0.6)', // Match bubble background
    }
    // Ideally we'd blur the tail too but that's hard with triangle hack.
    // Solid color matching the base is usually good enough for glass tails.
});
