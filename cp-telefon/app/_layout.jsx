import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

import '../global.css';

export default function App() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9900ff',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarStyle: {
          backgroundColor: '#262526',
          borderTopWidth: 1,
          borderTopColor: '#49484a',
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
        },
        headerStyle: {
          backgroundColor: '#3498db',
          marginLeft: 10,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 20,
        },
        tabBarLabelStyle: {
          fontWeight: 500,
        },
        headerLeft: () => (
          <Ionicons
            name='call-outline'
            size={30}
            color='#ffffff'
          />
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Főoldal',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ), headerShown: false
        }}
      />
      <Tabs.Screen
        name="telefonok"
        options={{
          title: 'Telefonlista',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

