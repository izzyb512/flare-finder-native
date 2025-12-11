import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Camera } from 'lucide-react-native';
import { colors, typography, spacing } from '../theme';
import { Button, GlassCard } from '../components/ui';

/**
 * ScanScreen
 * Placeholder for the food scanning page
 */
const ScanScreen: React.FC = () => {
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
                <Text style={styles.title}>Scan Food</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <GlassCard style={styles.cameraPlaceholder}>
                    <Camera size={64} color={colors.mutedForeground} />
                    <Text style={styles.placeholder}>
                        Camera will appear here
                    </Text>
                </GlassCard>

                <View style={styles.actions}>
                    <Button onPress={() => { }}>
                        Take Photo
                    </Button>
                    <Button variant="outline" onPress={() => { }}>
                        Enter Manually
                    </Button>
                </View>
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
    cameraPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[4],
    },
    placeholder: {
        color: colors.mutedForeground,
        textAlign: 'center',
        marginTop: spacing[4],
    },
    actions: {
        gap: spacing[3],
        paddingBottom: spacing[6],
    },
});

export default ScanScreen;
