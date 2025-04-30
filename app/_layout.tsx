import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';  // SecureStore for checking login status
import { useRouter } from 'expo-router'; // Ensure we use useRouter for navigation

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Track login status
  const router = useRouter(); // Router instance for navigation
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
    
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
    
        // Validate token with backend
        const response = await axios.get('https://www.pushandpull.app/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        // If request succeeds, token is valid
        setIsLoggedIn(true);
      } catch (error) {
        // If error, token is likely invalid
        console.warn('Token invalid or expired:', error);
        await SecureStore.deleteItemAsync('token'); // Clear the invalid token
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus(); // Check login status when component mounts
  }, []);

  if (isLoggedIn === null) {
    // Show a loading indicator while checking login status
    return (
      <View>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!isLoggedIn) {
    // If not logged in, show the login screen
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
    );
  }

  // If logged in, show the main app screen
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
