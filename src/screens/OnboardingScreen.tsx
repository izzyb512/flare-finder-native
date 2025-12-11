import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../theme';
import { Button, GlassCard } from '../components/ui';

/**
 * OnboardingScreen
 * Placeholder for the multi-step onboarding flow
 */
const OnboardingScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <GlassCard style={styles.card}>
                    <Text style={styles.title}>Welcome to Flare Finder</Text>
                    <Text style={styles.subtitle}>
                        Your personal nutrition and fitness companion
                    </Text>
                    <Text style={styles.placeholder}>
                        Onboarding flow coming soon...
                    </Text>
                </GlassCard>

                <Button onPress={() => { }}>
                    Get Started
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing[6],
        justifyContent: 'center',
        gap: spacing[6],
    },
    card: {
        padding: spacing[8],
        alignItems: 'center',
        gap: spacing[4],
    },
    title: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.foreground,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: typography.fontSize.base,
        color: colors.mutedForeground,
        textAlign: 'center',
    },
    placeholder: {
        color: colors.mutedForeground,
        textAlign: 'center',
        marginTop: spacing[4],
    },
});

export default OnboardingScreen;
