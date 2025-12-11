import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { GlassCard } from '../ui/GlassCard';
import { colors, typography, spacing } from '../../theme';

interface StatsCardProps {
    caloriesConsumed?: number;
    proteinConsumed?: number;
    carbsConsumed?: number;
    fatsConsumed?: number;
    caloriesTarget?: number;
    proteinTarget?: number;
    fatsTarget?: number;
    carbsTarget?: number;
}

/**
 * StatsCard Component
 * Exact replica of the web app's StatsCard with calorie ring and macro bars
 */
export const StatsCard: React.FC<StatsCardProps> = ({
    caloriesConsumed = 0,
    proteinConsumed = 0,
    carbsConsumed = 0,
    fatsConsumed = 0,
    caloriesTarget = 2500,
    proteinTarget = 180,
    fatsTarget = 80,
    carbsTarget = 250,
}) => {
    // Calculate progress percentage for the ring
    const progressPercentage = Math.min((caloriesConsumed / caloriesTarget) * 100, 100);

    // SVG circle parameters - matching web version
    const size = 140;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progressPercentage / 100) * circumference;

    const macros = [
        {
            label: 'Protein',
            current: proteinConsumed,
            target: proteinTarget,
            color: '#CE0ABE',
        },
        {
            label: 'Fat',
            current: fatsConsumed,
            target: fatsTarget,
            color: '#469FA8',
        },
        {
            label: 'Carbs',
            current: carbsConsumed,
            target: carbsTarget,
            color: '#BD8F31',
        },
    ];

    return (
        <GlassCard style={styles.container}>
            <View style={styles.content}>
                {/* Left: Circular Progress Ring */}
                <View style={styles.ringContainer}>
                    <Svg width={size} height={size} style={styles.svg}>
                        <Defs>
                            <LinearGradient id="caloriesGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <Stop offset="0%" stopColor="#BD8F31" />
                                <Stop offset="15%" stopColor="#BD8F31" />
                                <Stop offset="18%" stopColor="#469FA8" />
                                <Stop offset="45%" stopColor="#469FA8" />
                                <Stop offset="50%" stopColor="#469FA8" />
                                <Stop offset="55%" stopColor="#CE0ABE" />
                                <Stop offset="100%" stopColor="#CE0ABE" />
                            </LinearGradient>
                        </Defs>

                        {/* Background circle */}
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth={strokeWidth}
                            fill="none"
                        />

                        {/* Progress circle */}
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="url(#caloriesGradient)"
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={`${circumference}`}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            rotation={-90}
                            origin={`${size / 2}, ${size / 2}`}
                        />
                    </Svg>

                    {/* Center content */}
                    <View style={styles.ringCenter}>
                        <Text style={[
                            styles.calorieNumber,
                            caloriesConsumed >= 1000 && styles.calorieNumberSmall
                        ]}>
                            {caloriesConsumed}
                        </Text>
                        <Text style={styles.calorieTarget}>/ {caloriesTarget}</Text>
                        <Text style={styles.kcalLabel}>KCAL</Text>
                    </View>
                </View>

                {/* Right: Macro Bars */}
                <View style={styles.macrosContainer}>
                    {macros.map((macro) => {
                        const percentage = Math.min((macro.current / macro.target) * 100, 100);

                        return (
                            <View key={macro.label} style={styles.macroRow}>
                                <View style={styles.macroHeader}>
                                    <View style={styles.macroLabelContainer}>
                                        <View style={[styles.macroDot, { backgroundColor: macro.color }]} />
                                        <Text style={styles.macroLabel}>{macro.label}</Text>
                                    </View>
                                    <Text style={styles.macroValue}>
                                        <Text style={styles.macroValueCurrent}>{macro.current}</Text>
                                        {' '}/ {macro.target}g
                                    </Text>
                                </View>
                                <View style={styles.macroBarBackground}>
                                    <View
                                        style={[
                                            styles.macroBarFill,
                                            {
                                                width: `${percentage}%`,
                                                backgroundColor: macro.color,
                                                shadowColor: macro.color,
                                            },
                                        ]}
                                    />
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        </GlassCard>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing[7],
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[8],
    },
    ringContainer: {
        width: 140,
        height: 140,
        position: 'relative',
    },
    svg: {
        transform: [{ rotate: '-90deg' }],
    },
    ringCenter: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calorieNumber: {
        fontSize: 48,
        fontWeight: '700',
        color: colors.foreground,
        lineHeight: 48,
    },
    calorieNumberSmall: {
        fontSize: 42,
    },
    calorieTarget: {
        fontSize: typography.fontSize.xs,
        color: colors.mutedForeground,
        marginTop: 4,
        fontWeight: '500',
    },
    kcalLabel: {
        fontSize: 10,
        color: 'rgba(107, 114, 128, 0.7)',
        fontWeight: '600',
        letterSpacing: 1,
        marginTop: 2,
    },
    macrosContainer: {
        flex: 1,
        gap: spacing[5],
    },
    macroRow: {
        gap: spacing[2],
    },
    macroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    macroLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[2],
    },
    macroDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    macroLabel: {
        fontSize: typography.fontSize.sm,
        fontWeight: '500',
        color: '#E5E5E5',
    },
    macroValue: {
        fontSize: typography.fontSize.xs,
        color: colors.mutedForeground,
        fontWeight: '500',
    },
    macroValueCurrent: {
        color: colors.foreground,
        fontWeight: '600',
    },
    macroBarBackground: {
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    macroBarFill: {
        height: '100%',
        borderRadius: 5,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
    },
});

export default StatsCard;
