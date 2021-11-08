import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Article from '../screens/ArticleScreen';
import PluginTests from '../screens/PluginTestScreen';
import BottomBarNavigator from './BottomBarNavigator';
import { useLinking } from './useLinking';
import { useNavigation } from '@react-navigation/core';

const Stack = createNativeStackNavigator();

function StackNavigator() {

    const navigation = useNavigation();

    // Setup deeplink handler
    useLinking(navigation);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={BottomBarNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Article" component={Article} />
            <Stack.Screen name="Plugin Tests" component={PluginTests} />
        </Stack.Navigator>
    );
}

export default StackNavigator;