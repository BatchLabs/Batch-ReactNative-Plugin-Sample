import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Article from '../screens/ArticleScreen';
import PluginTests from '../screens/PluginTestScreen';
import BottomBarNavigator from './BottomBarNavigator';
import DataCollectionScreen from '../screens/DataCollectionScreen.tsx';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  // Setup deeplink handler
  // This is how you can handle deeplink manually
  // Here commented because we use react-navigation to handle deeplinks in the App.tsx
  // const navigation = useNavigation();
  //useLinking(navigation);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomBarNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="Data Collection" component={DataCollectionScreen} />
      <Stack.Screen name="Plugin Tests" component={PluginTests} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
