import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useVideoPlayer, VideoView } from 'expo-video';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StatsCard, FooterNav, LogMealButton, FutureSelfCard, HeatmapCalendar, WeeklyDateSelector } from '../components/home';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Settings } from 'lucide-react-native';

// Video source for background
const videoSource = require('../../assets/LOOPED BACKGROUND.mp4');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type TabId = 'home' | 'insights' | 'stats';

/**
 * HomeScreen
 * Exact replica of the web app's Home page design
 */
const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<TabId>('home');

    // Create video player
    const player = useVideoPlayer(videoSource);

    // Enforce playback settings on mount/player change
    useEffect(() => {
        if (player) {
            player.loop = true;
            player.muted = true;
            player.play();
        }
    }, [player]);

    // Mock data matching original screenshot
    const userName = 'Guest';
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });

    const handleLogPress = () => {
        // TODO: Open log meal modal
        console.log('Log button pressed');
    };

    // Web-specific style to force full viewport coverage
    const videoStyle = Platform.select({
        web: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0, // Ensure it's behind content but visible
        } as any,
        default: {
            ...StyleSheet.absoluteFillObject,
        },
    });

    return (
        <View style={styles.rootContainer}>
            <View style={StyleSheet.absoluteFill}>
                <VideoView
                    player={player}
                    style={videoStyle}
                    contentFit="cover"
                    nativeControls={false}
                />
            </View>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {activeTab === 'home' && (
                        <>
                            {/* Home Header */}
                            <View style={styles.header}>
                                <View>
                                    <Text style={styles.greetingTitle}>Hi, {userName}</Text>
                                    <Text style={styles.dateText}>{formattedDate}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.settingsButton}
                                    onPress={() => navigation.navigate('Settings')}
                                >
                                    <Settings color={colors.foreground} size={24} />
                                </TouchableOpacity>
                            </View>

                            {/* Weekly Date Selector */}
                            <WeeklyDateSelector />
                        </>
                    )}

                    {activeTab === 'stats' && (
                        <>
                            {/* Stats Header */}
                            <View style={styles.header}>
                                <View>
                                    <Text style={styles.greetingTitle}>Your Stats</Text>
                                    <Text style={styles.dateText}>Overview</Text>
                                </View>
                            </View>

                            {/* Stats Card */}
                            <View style={styles.statsContainer}>
                                <StatsCard
                                    caloriesConsumed={1850}
                                    caloriesTarget={2500}
                                    proteinConsumed={120}
                                    proteinTarget={180}
                                    fatsConsumed={45}
                                    fatsTarget={80}
                                    carbsConsumed={160}
                                    carbsTarget={250}
                                />
                            </View>

                            {/* Weighted Heatmap */}
                            <View style={styles.section}>
                                <HeatmapCalendar />
                            </View>
                        </>
                    )}

                    {activeTab === 'insights' && (
                        <View style={[styles.section, { paddingTop: 40, alignItems: 'center' }]}>
                            <Text style={{ color: colors.mutedForeground }}>Insights coming soon...</Text>
                        </View>
                    )}
                </ScrollView>

                {/* Floating Footer Nav */}
                <FooterNav
                    activeTab={activeTab}
                    onTabPress={setActiveTab}
                    onLogPress={handleLogPress}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    safeArea: {
        flex: 1,
        // Make sure usage of zIndex doesn't hide content
        zIndex: 1,
    },
    contentContainer: {
        paddingBottom: 100, // Space for the floating footer
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing[6],
        marginTop: spacing[8], // Adjusted top margin
        paddingHorizontal: spacing[6],
    },
    settingsButton: {
        padding: spacing[2],
        backgroundColor: colors.glass.backgroundSecondary,
        borderRadius: borderRadius.full,
        overflow: 'hidden',
    },
    greetingTitle: {
        color: colors.foreground,
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 2,
        letterSpacing: -0.5,
    },
    dateText: {
        color: colors.mutedForeground,
        fontSize: 15,
        fontWeight: '500',
    },
    statsContainer: {
        marginBottom: spacing[8],
        paddingHorizontal: spacing[6], // Fix width alignment
    },
    section: {
        marginBottom: spacing[6],
        paddingHorizontal: spacing[6],
    },
    sectionTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: '600',
        color: 'rgba(249, 250, 251, 0.7)',
        marginBottom: spacing[4],
        paddingLeft: spacing[1],
    },
    pillContainer: {
        alignItems: 'center',
        marginBottom: spacing[4],
    },
    pillText: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[1],
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        fontSize: 11,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 1.5,
    },
});

export default HomeScreen;
