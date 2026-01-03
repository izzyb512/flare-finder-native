import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Dimensions
const ITEM_WIDTH = 60;
const ACTIVE_ITEM_WIDTH = 80; // Wider active card
const ITEM_HEIGHT = 85;
const ACTIVE_ITEM_HEIGHT = 110;
const GAP = 10;

interface WeeklyDateSelectorProps {
    onDateSelect?: (date: Date) => void;
}

export const WeeklyDateSelector: React.FC<WeeklyDateSelectorProps> = ({ onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const scrollViewRef = useRef<ScrollView>(null);

    // Generate dates synchronously to ensure they render immediately
    const weekDates = useMemo(() => {
        const today = new Date();
        const dates: Date[] = [];
        for (let i = -3; i <= 3; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    }, []);

    const normalizeDate = (d: Date) => {
        const newDate = new Date(d);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return normalizeDate(d1).getTime() === normalizeDate(d2).getTime();
    };

    // Scroll to center on mount
    useEffect(() => {
        if (scrollViewRef.current) {
            // Index 3 is the center "Today" item
            // Calculate offset to center the 4th item (index 3)
            // 3 items * regular width + 3 gaps
            // Roughly: Items before it + half screen centering

            // Just strictly centering the middle element of the array for initial view
            // The array is fixed -3 to +3, so index 3 is always the middle.
            const x = (3 * ITEM_WIDTH) + (3 * GAP) - (SCREEN_WIDTH / 2) + (ACTIVE_ITEM_WIDTH / 2);

            setTimeout(() => {
                scrollViewRef.current?.scrollTo({ x: Math.max(0, x), animated: false });
            }, 100);
        }
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
                snapToInterval={ITEM_WIDTH + GAP} // Optional: snap effect
            >
                {weekDates.map((date, index) => {
                    const isSelected = isSameDay(date, selectedDate);
                    const isPast = normalizeDate(date) < normalizeDate(new Date());

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateItem,
                                isSelected && styles.activeDateItem,
                            ]}
                            onPress={() => {
                                setSelectedDate(date);
                                if (onDateSelect) onDateSelect(date);
                            }}
                            activeOpacity={0.7}
                        >
                            {/* Background Layer */}
                            {isSelected ? (
                                <LinearGradient
                                    colors={['#3B82F6', '#2563EB']} // Blue Gradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[styles.layer, { borderRadius: borderRadius['3xl'] }]}
                                />
                            ) : (
                                <View style={[styles.layer, { borderRadius: borderRadius['3xl'], overflow: 'hidden', backgroundColor: 'rgba(33, 33, 46, 0.5)' }]}>
                                    <BlurView
                                        intensity={30}
                                        tint="dark"
                                        style={StyleSheet.absoluteFill}
                                    />
                                </View>
                            )}

                            {/* Border Overlay - Shown if NOT Past (Future or Today) */}
                            {!isPast && (
                                <View
                                    style={[
                                        styles.layer,
                                        styles.borderLayer,
                                        { borderRadius: borderRadius['3xl'] }
                                    ]}
                                />
                            )}

                            {/* Content */}
                            <View style={styles.contentParams}>
                                {/* Checkmark Icon (Past) OR Spacer (Future/Today) */}
                                {isPast ? (
                                    <Check
                                        size={16}
                                        color="#FFFFFF"
                                        strokeWidth={3}
                                        style={{ marginBottom: 4 }}
                                    />
                                ) : (
                                    <View style={{ height: 20, marginBottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            borderWidth: 1.5,
                                            borderColor: '#FFFFFF',
                                            opacity: 0.7
                                        }} />
                                    </View>
                                )}

                                <Text style={[
                                    styles.dayText,
                                    isSelected && styles.activeText
                                ]}>
                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </Text>
                                <Text style={[
                                    styles.dateNumber,
                                    isSelected && styles.activeText,
                                    isSelected && styles.largeDateText
                                ]}>
                                    {date.getDate()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: spacing[4],
        marginBottom: spacing[2],
    },
    scrollContent: {
        paddingHorizontal: spacing[4], // Initial padding
        gap: GAP,
        alignItems: 'flex-start', // Align items to top
    },
    dateItem: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: borderRadius['3xl'],
        position: 'relative',
    },
    activeDateItem: {
        width: ACTIVE_ITEM_WIDTH,
        height: ACTIVE_ITEM_HEIGHT,
    },
    layer: {
        ...StyleSheet.absoluteFillObject,
    },
    borderLayer: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    contentParams: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2, // Tighter gap
        zIndex: 10,
    },
    dayText: {
        fontSize: typography.fontSize.xs,
        color: colors.mutedForeground,
        fontWeight: '500',
    },
    dateNumber: {
        fontSize: typography.fontSize.lg,
        color: colors.foreground,
        fontWeight: '700',
    },
    activeText: {
        color: '#FFFFFF',
    },
    largeDateText: {
        fontSize: 28, // Sleek large
    },
});
