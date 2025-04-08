import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

import '../global.css';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100 h-full">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#9900ff',
          tabBarInactiveTintColor: '#95a5a6',
          tabBarStyle: {
            flex: .1,
            backgroundColor: '#262526',
            borderTopWidth: 1,
            borderTopColor: '#49484a',
            flexDirection: 'row',
            paddingTop: 10,
            alignItems: 'center'
          },
          headerStyle: {
            backgroundColor: '#3498db',
            marginLeft: 10,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 20,
            paddingLeft: 10
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarPosition: 'bottom',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Ionicons
              name='call-outline'
              size={30}
              color='#ffffff'
              style={{ marginLeft: 15 }}
            />
          ),
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
        <Tabs.Screen
          name="kereso"
          options={{
            title: 'Keresés',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>



    </SafeAreaView>
  );
}

