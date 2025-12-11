import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GlassCard } from '../ui/GlassCard';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface FutureSelfCardProps {
    message: string;
    imageUrl?: string;
}

/**
 * FutureSelfCard Component
 * Displays a motivational message from "Future Self" with an image
 */
export const FutureSelfCard: React.FC<FutureSelfCardProps> = ({
    message,
    imageUrl = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60',
}) => {
    return (
        <GlassCard style={styles.container}>
            {/* Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {/* FUTURE SELF label overlay */}
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>FUTURE SELF</Text>
                </View>
            </View>

            {/* Message */}
            <View style={styles.messageContainer}>
                <Text style={styles.message}>{message}</Text>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    imageContainer: {
        height: 180,
        position: 'relative',
        borderTopLeftRadius: borderRadius['4xl'],
        borderTopRightRadius: borderRadius['4xl'],
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    labelContainer: {
        position: 'absolute',
        bottom: spacing[3],
        left: spacing[3],
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[1],
        borderRadius: borderRadius.sm,
    },
    label: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.foreground,
        letterSpacing: 1,
    },
    messageContainer: {
        padding: spacing[4],
    },
    message: {
        fontSize: typography.fontSize.base,
        color: colors.foreground,
        lineHeight: typography.fontSize.base * 1.5,
    },
});

export default FutureSelfCard;
