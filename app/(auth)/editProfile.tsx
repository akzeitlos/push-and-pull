import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { Image } from "expo-image";
import appstyles from "@/styles/appStyles";
import * as SecureStore from "expo-secure-store";

export default function EditProfileScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const response = await axios.get(
          "https://www.pushandpull.app/api/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 401 || status === 400) {
            await SecureStore.deleteItemAsync("token");
            router.replace("/(auth)/login");
          } else {
            setErrors({ general: "Failed to load profile information." });
          }
        }
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    if (!firstname || !lastname || !username || !email) {
      setErrors({ general: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.put(
        "https://www.pushandpull.app/api/user/update",
        {
          firstname,
          lastname,
          username,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      router.replace("/(tabs)");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401 || status === 400) {
          await SecureStore.deleteItemAsync("token");
          router.replace("/(auth)/login");
          return;
        }

        const backendErrors = err.response?.data?.errors;
        if (backendErrors) {
          if (!backendErrors.general) {
            backendErrors.general = "Please check the fields.";
          }
          setErrors(backendErrors);
        } else {
          setErrors({ general: "Something went wrong. Please try again." });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={appstyles.contentWrapper}>
      <View style={appstyles.content}>
        <Image
          style={appstyles.image}
          source={require("@/assets/images/pushAndPullLogo.svg")}
          contentFit="contain"
        />

        {errors?.general && (
          <Text style={appstyles.errorText}>{errors?.general}</Text>
        )}

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
          placeholder="New Password (empty to keep)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={appstyles.input}
          placeholderTextColor="white"
        />

        <TouchableOpacity
          onPress={handleUpdate}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          activeOpacity={1}
          style={[appstyles.button, isPressed && appstyles.buttonPressed]}
        >
          <Text style={appstyles.buttonText}>Save Profile</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={appstyles.loader}
          />
        )}
      </View>
    </View>
  );
}
