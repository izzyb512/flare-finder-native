import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, ChartBar, Scan, Settings } from 'lucide-react-native';
import { colors, spacing, shadows } from '../../theme';

interface FooterNavProps {
    activeTab: 'home' | 'nutrition' | 'scan' | 'settings';
    onTabPress: (tab: 'home' | 'nutrition' | 'scan' | 'settings') => void;
}

/**
 * FooterNav Component
 * Bottom navigation bar matching the web app's glass pill design
 */
export const FooterNav: React.FC<FooterNavProps> = ({ activeTab, onTabPress }) => {
    const insets = useSafeAreaInsets();

    const tabs = [
        { id: 'home' as const, icon: Home, label: 'Home' },
        { id: 'nutrition' as const, icon: ChartBar, label: 'Nutrition' },
        { id: 'scan' as const, icon: Scan, label: 'Scan' },
        { id: 'settings' as const, icon: Settings, label: 'Settings' },
    ];

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing[4]) }]}>
            <BlurView intensity={40} tint="dark" style={styles.blurContainer}>
                <View style={styles.pillContainer}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const IconComponent = tab.icon;

                        return (
                            <TouchableOpacity
                                key={tab.id}
                                style={styles.tabButton}
                                onPress={() => onTabPress(tab.id)}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.iconContainer,
                                        isActive && styles.iconContainerActive,
                                    ]}
                                >
                                    <IconComponent
                                        size={24}
                                        color={isActive ? colors.primary : colors.white[40]}
                                        strokeWidth={2}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: spacing[6],
    },
    blurContainer: {
        borderRadius: 32,
        overflow: 'hidden',
        ...shadows.lg,
    },
    pillContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: colors.glass.border,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[2],
        gap: spacing[2],
    },
    tabButton: {
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[2],
    },
    iconContainer: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
    },
    iconContainerActive: {
        backgroundColor: 'rgba(255, 0, 255, 0.1)',
    },
});

export default FooterNav;
