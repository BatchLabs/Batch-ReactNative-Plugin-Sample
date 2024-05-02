import React from 'react';
import CartScreen from '../screens/CartScreen';
import InboxScreen from '../screens/InboxScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Shop from '../screens/ShopScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

function BottomBarNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Shop"
        component={gestureHandlerRootHOC(Shop)}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={gestureHandlerRootHOC(CartScreen)}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={gestureHandlerRootHOC(InboxScreen)}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({color, size}) => (
            <Icon name="mail" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={gestureHandlerRootHOC(SettingsScreen)}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomBarNavigator;
