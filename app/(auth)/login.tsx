import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { isAxiosError } from 'axios';
import { Image } from 'expo-image';
import appstyles from '@/styles/appStyles';

export default function LoginScreen() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();

  // Handle login button press
  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      setError('Please fill in both fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://www.pushandpull.app/api/login', {
        emailOrUsername,
        password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.data.token) {
        await SecureStore.setItemAsync('token', response.data.token);
        router.replace('/'); // Navigate to tabs
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
    
      if (isAxiosError(err)) {
        const backendErrors = err.response?.data?.errors;
        if (backendErrors) {
          setError(backendErrors.general || "Please check the fields.");
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={appstyles.contentWrapper}>
      <View style={appstyles.content}>
        
        {/* App Logo */}
        <Image
          style={appstyles.image}
          source={require('@/assets/images/pushAndPullLogo.svg')}
          contentFit="contain"
        />

        {/* Show error message */}
        {error ? <Text style={appstyles.errorText}>{error}</Text> : null}

        {/* Email/Username Input */}
        <TextInput
          placeholder="Email or Username"
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
          style={appstyles.input}
          placeholderTextColor="white"
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={appstyles.input}
          placeholderTextColor="white"
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          activeOpacity={1}
          style={[
            appstyles.button,
            isPressed && appstyles.buttonPressed,
          ]}
        >
          <Text style={appstyles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <Text style={appstyles.registerText}>
          Not registered yet?{' '}
          <Text style={appstyles.link} onPress={() => router.push('/register')}>
            Sign up
          </Text>
        </Text>

        {/* Show loading spinner */}
        {loading && <ActivityIndicator size="large" color="#ffffff" style={appstyles.loader} />}

      </View>
    </View>
  );
}

