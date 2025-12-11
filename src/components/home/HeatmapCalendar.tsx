import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GlassCard } from '../ui/GlassCard';
import { colors, spacing, typography, borderRadius } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';

// Symptom intensity Mock Data (0-4 scale)
// 0: No/Low symptoms (Cyan)
// 4: High symptoms (Deep Purple)
const MOCK_HEATMAP_DATA = Array.from({ length: 60 }, (_, i) => {
    // Generate some random intensity pattern
    const baseIntensity = Math.floor(Math.random() * 5);
    return {
        id: i,
        intensity: baseIntensity,
        date: new Date(Date.now() - (59 - i) * 24 * 60 * 60 * 1000)
    };
});

const INTENSITY_COLORS = {
    0: ['#A0F0FF', '#70E0FF'], // Cyan/Light Blue
    1: ['#60A5FA', '#3B82F6'], // Blue
    2: ['#818CF8', '#6366F1'], // Indigo
    3: ['#C084FC', '#A855F7'], // Purple
    4: ['#E879F9', '#D946EF'], // Deep Violet/Pinkish
};

// Reference image shows a darker, more "night mode" purple/blue gradient
const HEATMAP_COLORS = {
    0: '#67E8F9', // Cyan
    1: '#38BDF8', // Sky Blue
    2: '#6366F1', // Indigo
    3: '#8B5CF6', // Violet
    4: '#4C1D95', // Deep Purple (High)
};

export const HeatmapCalendar = () => {
    return (
        <GlassCard style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Symptom Overview</Text>
                <Text style={styles.subtitle}>Last 60 Days</Text>
            </View>

            {/* Heatmap Grid */}
            <View style={styles.gridContainer}>
                {MOCK_HEATMAP_DATA.map((day) => (
                    <View
                        key={day.id}
                        style={[
                            styles.daySquare,
                            { backgroundColor: HEATMAP_COLORS[day.intensity as keyof typeof HEATMAP_COLORS] }
                        ]}
                    />
                ))}
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
                <Text style={styles.legendText}>Low Symptoms</Text>
                <View style={styles.legendGradient}>
                    {Object.values(HEATMAP_COLORS).map((color, index) => (
                        <View key={index} style={[styles.legendDot, { backgroundColor: color }]} />
                    ))}
                </View>
                <Text style={styles.legendText}>High Symptoms</Text>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing[7], // Match StatsCard padding
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: spacing[2],
    },
    title: {
        fontSize: typography.fontSize.md,
        fontWeight: '600',
        color: colors.foreground,
    },
    subtitle: {
        fontSize: typography.fontSize.xs,
        color: colors.mutedForeground,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5, // Increased padding between squares
        justifyContent: 'center',
        marginBottom: spacing[2],
    },
    daySquare: {
        width: '7%', // Slightly smaller squares
        aspectRatio: 1,
        borderRadius: 6, // More rounded corners
        opacity: 0.8,
    },
    legendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing[1],
        paddingTop: spacing[2],
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    legendText: {
        fontSize: typography.fontSize.xs,
        color: colors.mutedForeground,
        fontWeight: '500',
    },
    legendGradient: {
        flexDirection: 'row',
        gap: 4,
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});
