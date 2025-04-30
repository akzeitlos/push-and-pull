import { Stack } from 'expo-router';
import { Image } from 'expo-image';
import { View } from 'react-native';
import appstyles from '@/styles/appStyles';

export default function AuthLayout() {
  return (
    <View style={appstyles.container}>
      {/* Background Image */}
      <Image
        source={require('@/assets/images/login-background.jpg')}
        style={appstyles.backgroundImage}
        contentFit="cover"
      />

      {/* Content Stack */}
      <Stack
        screenOptions={{
          animation: 'fade', // Or any other transition animation
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
        initialRouteName="login"
      >
        <Stack.Screen name="login" />
      </Stack>
    </View>
  );
}
