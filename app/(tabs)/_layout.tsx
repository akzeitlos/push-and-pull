import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import appstyles from '@/styles/appStyles';


import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TopNavbar } from '@/components/TopNavbar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    <TopNavbar />

    <Tabs
    screenOptions={{
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarStyle: appstyles.tabBarStyle,
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',   // Horizontally center the text
      },
      tabBarIconStyle: {
        height: 0
      },

      tabBarBackground: () => (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }} />
      ),
    }}
  >
  
        <Tabs.Screen
          name="index"
          options={{
            title: 'Pushups',
            tabBarIcon: () => null,
            tabBarActiveBackgroundColor: 'purple', // <-- Hintergrund lila, wenn aktiv!
          }}
        />
        <Tabs.Screen
          name="pullups"
          options={{
            title: 'Pullups',
            tabBarIcon: () => null,
            tabBarActiveBackgroundColor: 'purple', // <-- Hintergrund lila, wenn aktiv!
          }}
        />
      </Tabs>
      </>
  );
}
