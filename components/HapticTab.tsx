import React from 'react';
import { Pressable } from 'react-native';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export function HapticTab({ children, onPress, accessibilityState }: BottomTabBarButtonProps) {
  const focused = accessibilityState?.selected;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: focused ? 'purple' : 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Pressable>
  );
}
