import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, User, Utensils, Dumbbell, Sparkles, LogOut } from 'lucide-react-native';
import { colors, typography, spacing } from '../theme';
import { Button, GlassCard } from '../components/ui';

/**
 * SettingsScreen
 * Placeholder for the Settings page
 */
const SettingsScreen: React.FC = () => {
    const navigation = useNavigation();

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'nutrition', label: 'Nutrition', icon: Utensils },
        { id: 'physique', label: 'Physique', icon: Dumbbell },
        { id: 'personality', label: 'AI Coach', icon: Sparkles },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeft size={24} color={colors.foreground} />
                </Button>
                <Text style={styles.title}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tabsContainer}
                contentContainerStyle={styles.tabsContent}
            >
                {tabs.map((tab) => (
                    <View key={tab.id} style={styles.tab}>
                        <tab.icon size={16} color={colors.mutedForeground} />
                        <Text style={styles.tabLabel}>{tab.label}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <GlassCard style={styles.card}>
                    <Text style={styles.cardTitle}>Profile Settings</Text>
                    <Text style={styles.placeholder}>
                        Settings content coming soon...
                    </Text>
                </GlassCard>

                <GlassCard style={styles.card}>
                    <Text style={styles.cardTitle}>Account</Text>
                    <View style={styles.accountInfo}>
                        <Text style={styles.label}>User ID</Text>
                        <Text style={styles.value}>mock-user-id</Text>
                    </View>
                    <Button
                        variant="destructive"
                        onPress={() => { }}
                        leftIcon={<LogOut size={16} color={colors.destructiveForeground} />}
                    >
                        Sign Out
                    </Button>
                </GlassCard>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
    },
    title: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        color: colors.foreground,
    },
    tabsContainer: {
        maxHeight: 48,
        borderBottomWidth: 1,
        borderBottomColor: colors.white[5],
    },
    tabsContent: {
        paddingHorizontal: spacing[6],
        gap: spacing[6],
        flexDirection: 'row',
        alignItems: 'center',
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[2],
        paddingVertical: spacing[3],
    },
    tabLabel: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium,
        color: colors.mutedForeground,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[6],
        gap: spacing[6],
        paddingBottom: spacing[20],
    },
    card: {
        padding: spacing[6],
        gap: spacing[4],
    },
    cardTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        color: colors.foreground,
    },
    placeholder: {
        color: colors.mutedForeground,
    },
    accountInfo: {
        gap: spacing[1],
    },
    label: {
        fontSize: typography.fontSize.xs,
        color: colors.mutedForeground,
    },
    value: {
        fontSize: typography.fontSize.sm,
        color: colors.foreground,
    },
});

export default SettingsScreen;
