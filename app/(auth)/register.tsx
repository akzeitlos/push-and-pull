import React, { useState } from 'react';
import { TextInput, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import appstyles from '@/styles/appStyles';
import { Image } from 'expo-image';

export default function RegisterScreen() {
  // States for form fields
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false); // Button press feedback

  const router = useRouter();

  // Function to handle user registration
  const handleRegister = async () => {
    // Check if any field is empty
    if (!firstname || !lastname || !username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError(''); // Clear previous errors
    setLoading(true); // Show loading spinner

    try {
      const response = await axios.post('https://www.pushandpull.app/api/register', {
        firstname,
        lastname,
        username,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Handle backend validation errors
      if (response.data.errors) {
        const backendErrors = response.data.errors;
        let errorMessage = 'Please check the fields.';
        
        if (backendErrors.general) {
          errorMessage = backendErrors.general;
        }
  
        setError(errorMessage);
        return;
      }

      // Successful registration
      if (response.data.message === "Registration successful!") {
        router.replace('/login'); // Navigate to home screen
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <View style={appstyles.contentWrapper}> 
      <View style={appstyles.content}>
        
        {/* Logo */}
        <Image
          style={appstyles.image}
          source={require('@/assets/images/pushAndPullLogo.svg')}
          contentFit="contain"
        />

        {/* Error Message */}
        {error && <Text style={appstyles.errorText}>{error}</Text>}

        {/* Form Inputs */}
        <TextInput
          placeholder="First Name"
          value={firstname}
          onChangeText={setFirstname}
          style={appstyles.input}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Last Name"
          value={lastname}
          onChangeText={setLastname}
          style={appstyles.input}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={appstyles.input}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={appstyles.input}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={appstyles.input}
          placeholderTextColor="white"
        />

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleRegister}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          activeOpacity={1}
          style={[appstyles.button, isPressed && appstyles.buttonPressed]}
        >
          <Text style={appstyles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* Link to Login */}
        <Text style={appstyles.registerText}>
          Already have an account?{' '}
          <Text style={appstyles.link} onPress={() => router.push('/login')}>
            Log in
          </Text>
        </Text>

        {/* Loading Spinner */}
        {loading && <ActivityIndicator size="large" color="#0000ff" style={appstyles.loader} />}
      </View>
    </View>
  );
}
