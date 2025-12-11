import React from 'react';
import { View, StyleSheet, ViewProps, StyleProp, ViewStyle, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, shadows } from '../../theme';

interface GlassCardProps extends ViewProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary';
    style?: StyleProp<ViewStyle>;
    blurIntensity?: number;
    showHighlight?: boolean;
}

/**
 * GlassCard Component - Liquid Glass Style
 * 
 * Recreates the "Apple Maps" liquid glass feel using:
 * 1. Deep Blur (BlurView)
 * 2. Subtle translucent fill (LinearGradient)
 * 3. Crisp hairline border (View with border)
 * 4. Specular reflection (LinearGradient overlay)
 */
export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    variant = 'primary',
    style,
    blurIntensity = Platform.OS === 'ios' ? 25 : 100, // Android needs higher intensity for visible blur
    showHighlight = true,
    ...props
}) => {
    const getBorderRadius = () => {
        switch (variant) {
            case 'primary': return borderRadius['4xl'];
            case 'secondary': return borderRadius['3xl'];
            case 'tertiary': return borderRadius['2xl'];
            default: return borderRadius['4xl'];
        }
    };

    const radius = getBorderRadius();

    // Background fill opacity based on variant
    const fillColors = variant === 'primary'
        ? ['rgba(33, 33, 46, 0.85)', 'rgba(33, 33, 46, 0.65)'] as const // #21212E base
        : ['rgba(33, 33, 46, 0.6)', 'rgba(33, 33, 46, 0.4)'] as const;

    return (
        <View style={[styles.container, { borderRadius: radius }, shadows.glass, style]} {...props}>

            {/* 1. Base Blur Layer */}
            <View style={[styles.layer, { borderRadius: radius, overflow: 'hidden' }]}>
                <BlurView
                    intensity={blurIntensity}
                    tint="dark"
                    style={StyleSheet.absoluteFill}
                />
            </View>

            {/* 2. Translucent Fill Layer (Body Color) */}
            <LinearGradient
                colors={fillColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.layer, { borderRadius: radius }]}
                pointerEvents="none"
            />

            {/* 3. Specular Highlight (The "Liquid" sheen) */}
            {showHighlight && (
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.07)', 'transparent', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }}
                    style={[styles.layer, { borderRadius: radius }]}
                    pointerEvents="none"
                />
            )}

            {/* 4. Crisp Border Overlay */}
            <View
                style={[
                    styles.layer,
                    styles.borderLayer,
                    { borderRadius: radius }
                ]}
                pointerEvents="none"
            />

            {/* Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    layer: {
        ...StyleSheet.absoluteFillObject,
    },
    borderLayer: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)', // High quality subtle border
        backgroundColor: 'transparent',
    },
    content: {
        zIndex: 10,
    },
});

export default GlassCard;
