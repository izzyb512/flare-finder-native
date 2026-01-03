import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    cancelAnimation,
    runOnJS
} from 'react-native-reanimated';

interface SpriteSheetProps {
    source: ImageSourcePropType;
    columns: number;
    rows: number;
    frameWidth: number;
    frameHeight: number;
    totalFrames?: number; // Optional, defaults to columns * rows
    fps?: number;
    loop?: boolean;
    overlayColor?: string;
    overlayOpacity?: number;
}

export const SpriteSheet: React.FC<SpriteSheetProps> = ({
    source,
    columns,
    rows,
    frameWidth,
    frameHeight,
    totalFrames,
    fps = 24,
    loop = true,
    overlayColor,
    overlayOpacity = 0.25,
}) => {
    const frameCount = totalFrames || columns * rows;
    const progress = useSharedValue(0);

    useEffect(() => {
        const duration = (frameCount / fps) * 1000;

        progress.value = withRepeat(
            withTiming(frameCount, {
                duration: duration,
                easing: Easing.linear,
            }),
            loop ? -1 : 1,
            false // no reverse
        );

        return () => {
            cancelAnimation(progress);
        };
    }, [frameCount, fps, loop]);

    const animatedStyle = useAnimatedStyle(() => {
        const currentFrame = Math.floor(progress.value) % frameCount;
        const col = currentFrame % columns;
        const row = Math.floor(currentFrame / columns);

        return {
            transform: [
                { translateX: -col * frameWidth },
                { translateY: -row * frameHeight },
            ],
        };
    });

    return (
        <View style={{ width: frameWidth, height: frameHeight, overflow: 'hidden' }}>
            <Animated.Image
                source={source}
                style={[
                    {
                        width: frameWidth * columns,
                        height: frameHeight * rows,
                    },
                    animatedStyle,
                ]}
                resizeMode="stretch" // Ensure the sprite sheet fills the calculated dimensions exactly
            />
            {overlayColor && (
                <Animated.Image
                    source={source}
                    style={[
                        {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: frameWidth * columns,
                            height: frameHeight * rows,
                            tintColor: overlayColor,
                            opacity: overlayOpacity,
                        },
                        animatedStyle,
                    ]}
                    resizeMode="stretch"
                />
            )}
        </View>
    );
};
