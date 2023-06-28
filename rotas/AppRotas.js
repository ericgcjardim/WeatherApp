import React from "react";
import Nova from '../components/Nova';
import Weather from '../components/Weather';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function AppRotas() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='weather' component={Weather} />
                <Tab.Screen name='nova' component={Nova} />
            </Tab.Navigator>

        </NavigationContainer>
    )
}