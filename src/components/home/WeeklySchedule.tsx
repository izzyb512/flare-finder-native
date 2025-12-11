import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bike, Moon } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { colors, typography, spacing } from '../../theme';

interface WorkoutDay {
    day: string;
    dayLetter: string;
    workout: 'cycle' | 'rest' | null;
    isToday: boolean;
}

interface WeeklyScheduleProps {
    onPress?: () => void;
}

/**
 * WeeklySchedule Component
 * Exact replica of the web app's WeeklySchedule with day indicators
 */
export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ onPress }) => {
    // Get current day of week (0 = Sunday)
    const today = new Date().getDay();

    const schedule: WorkoutDay[] = [
        { day: 'Sunday', dayLetter: 'S', workout: 'cycle', isToday: today === 0 },
        { day: 'Monday', dayLetter: 'M', workout: 'rest', isToday: today === 1 },
        { day: 'Tuesday', dayLetter: 'T', workout: 'rest', isToday: today === 2 },
        { day: 'Wednesday', dayLetter: 'W', workout: 'cycle', isToday: today === 3 },
        { day: 'Thursday', dayLetter: 'T', workout: 'rest', isToday: today === 4 },
        { day: 'Friday', dayLetter: 'F', workout: 'cycle', isToday: today === 5 },
        { day: 'Saturday', dayLetter: 'S', workout: 'rest', isToday: today === 6 },
    ];

    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container onPress={onPress} activeOpacity={0.9}>
            <GlassCard variant="secondary" style={styles.container}>
                <View style={styles.content}>
                    {schedule.map((day, index) => (
                        <View key={index} style={styles.dayColumn}>
                            <Text
                                style={[
                                    styles.dayLetter,
                                    day.isToday && styles.dayLetterActive,
                                ]}
                            >
                                {day.dayLetter}
                            </Text>
                            <View
                                style={[
                                    styles.iconContainer,
                                    day.isToday && styles.iconContainerActive,
                                ]}
                            >
                                {day.workout === 'cycle' ? (
                                    <Bike
                                        size={16}
                                        color={day.isToday ? colors.foreground : 'rgba(107, 114, 128, 0.2)'}
                                    />
                                ) : (
                                    <Moon
                                        size={12}
                                        color={day.isToday ? colors.foreground : 'rgba(107, 114, 128, 0.2)'}
                                    />
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </GlassCard>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing[5],
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dayColumn: {
        alignItems: 'center',
        gap: spacing[3],
    },
    dayLetter: {
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 0.5,
        color: 'rgba(107, 114, 128, 0.4)',
    },
    dayLetterActive: {
        color: colors.foreground,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
    iconContainerActive: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#469FA8',
        shadowColor: '#469FA8',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        transform: [{ scale: 1.1 }],
    },
});

export default WeeklySchedule;
