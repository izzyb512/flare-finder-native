import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import NutritionScreen from '../screens/NutritionScreen';
import ScanScreen from '../screens/ScanScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export type RootStackParamList = {
    Home: undefined;
    Nutrition: undefined;
    Scan: undefined;
    Settings: undefined;
    Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * App Navigator
 * Main navigation structure for the app
 */
export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Nutrition" component={NutritionScreen} />
                <Stack.Screen name="Scan" component={ScanScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                    options={{ animation: 'fade' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
