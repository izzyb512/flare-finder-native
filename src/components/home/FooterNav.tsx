import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, BarChart2, TrendingUp, Plus } from 'lucide-react-native';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';

// Updated Tab IDs based on user request
type TabId = 'home' | 'insights' | 'stats';

interface FooterNavProps {
    activeTab: TabId;
    onTabPress: (tab: TabId) => void;
    onLogPress?: () => void; // Dedicated handler for the FAB
}

/**
 * FooterNav Component
 * Redesigned layout: Home, Insights, Stats + Floating "Plus" Bubble
 */
export const FooterNav: React.FC<FooterNavProps> = ({ activeTab, onTabPress, onLogPress }) => {
    const insets = useSafeAreaInsets();
    const { width } = Dimensions.get('window');

    const navItems: { id: TabId; icon: typeof Home; label: string }[] = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'insights', icon: TrendingUp, label: 'Insights' },
        { id: 'stats', icon: BarChart2, label: 'Stats' },
    ];

    return (
        <View style={styles.wrapper}>
            {/* 
        Container for the main nav bar 
        We use a slightly transparent black glass
      */}
            <View style={styles.navBarContainer}>
                {/* Gradient Border top */}
                <LinearGradient
                    colors={['rgba(255,255,255,0.1)', 'transparent']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.borderGradient}
                >
                    <BlurView intensity={40} tint="dark" style={styles.blurContainer}>
                        <View style={[styles.navContent, { paddingBottom: Math.max(insets.bottom, 10) }]}>

                            {/* Left Side Tabs */}
                            <View style={styles.tabsContainer}>
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeTab === item.id;

                                    return (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={styles.tabButton}
                                            onPress={() => onTabPress(item.id)}
                                            activeOpacity={0.7}
                                        >
                                            <Icon
                                                size={24}
                                                strokeWidth={isActive ? 2.5 : 2}
                                                color={isActive ? colors.foreground : colors.mutedForeground}
                                            />
                                            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                                                {item.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            {/* Spacer for FAB */}
                            <View style={{ width: 80 }} />

                        </View>
                    </BlurView>
                </LinearGradient>
            </View>

            {/* 
         Right Side - Floating Plus Bubble 
         Moved OUTSIDE the navBarContainer to avoid clipping
      */}
            <TouchableOpacity
                style={[styles.fabButton, { bottom: Math.max(insets.bottom, 10) + 15 }]} // Adjust bottom to float correctly
                onPress={onLogPress}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={['#2A2A2A', '#1A1A1A']} // Dark sleek look
                    style={styles.fabGradient}
                >
                    <Plus color="#FFF" size={32} strokeWidth={2.5} />
                </LinearGradient>
                {/* Glow effect behind FAB */}
                <View style={styles.fabGlow} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    navBarContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 20,
    },
    borderGradient: {
        borderTopLeftRadius: 30, // Slightly more rounded
        borderTopRightRadius: 30,
        paddingTop: 1,
        overflow: 'hidden',
    },
    blurContainer: {
        backgroundColor: 'rgba(10, 10, 10, 0.85)', // Deep dark glass
    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
        paddingHorizontal: 30,
        height: 80,
    },
    tabsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        paddingRight: 30, // Increased to separate Stats from FAB
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        gap: 6,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: colors.mutedForeground,
    },
    tabLabelActive: {
        color: colors.foreground,
        fontWeight: '600',
    },

    // Floating Action Button
    fabButton: {
        position: 'absolute',
        right: 20,
        // bottom is set inline to account for insets
        width: 72, // Increased size
        height: 72, // Increased size
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 101, // Ensure it sits on top
    },
    fabGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)', // Slightly lighter border for pop
    },
    fabGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.05)',
        zIndex: -1,
    },
});

export default FooterNav;
