import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { colors, typography, spacing } from '../theme';
import { Button, GlassCard } from '../components/ui';

/**
 * NutritionScreen
 * Placeholder for the Nutrition page
 */
const NutritionScreen: React.FC = () => {
    const navigation = useNavigation();

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
                <Text style={styles.title}>Nutrition</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <GlassCard style={styles.card}>
                    <Text style={styles.placeholder}>
                        Weekly Macro Chart coming soon...
                    </Text>
                </GlassCard>

                <GlassCard style={styles.card}>
                    <Text style={styles.placeholder}>
                        Daily Micronutrients coming soon...
                    </Text>
                </GlassCard>
            </View>
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
    content: {
        flex: 1,
        paddingHorizontal: spacing[6],
        gap: spacing[6],
    },
    card: {
        padding: spacing[6],
    },
    placeholder: {
        color: colors.mutedForeground,
        textAlign: 'center',
    },
});

export default NutritionScreen;
