import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StatsCard, FooterNav, LogMealButton, FutureSelfCard, HeatmapCalendar } from '../components/home';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Settings } from 'lucide-react-native';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type TabId = 'home' | 'insights' | 'stats';

/**
 * HomeScreen
 * Exact replica of the web app's Home page design
 */
const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<TabId>('home');

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

    return (
        <ImageBackground
            source={require('../../assets/background.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
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

                    {/* Weighted Heatmap (Replaces WeeklySchedule) */}
                    <View style={styles.section}>
                        <HeatmapCalendar />
                    </View>

                    {/* Messages Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Messages</Text>

                        {/* Log Meal Button */}
                        <LogMealButton onPress={handleLogPress} />
                    </View>

                    {/* Future Self / Today */}
                    <View style={styles.section}>
                        <View style={styles.pillContainer}>
                            <Text style={styles.pillText}>TODAY</Text>
                        </View>
                        <FutureSelfCard
                            message="Great start to the week! Keep hitting those protein targets and you'll see progress in no time."
                            imageUrl="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        />
                    </View>

                </ScrollView>

                {/* Floating Footer Nav */}
                <FooterNav
                    activeTab={activeTab}
                    onTabPress={setActiveTab}
                    onLogPress={handleLogPress}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1d1d1d', // Dark mask color
        opacity: 0.85, // Adjust opacity to make image fainter/stronger
    },
    container: {
        flex: 1,
        // Removed backgroundColor to let image show through
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
