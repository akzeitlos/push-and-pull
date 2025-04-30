import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Menu, Provider, TouchableRipple } from "react-native-paper";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import * as SecureStore from 'expo-secure-store';
import appstyles from "@/styles/appStyles";

export function TopNavbar() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleEditProfile = () => {
    closeMenu();
    router.push("/(auth)/editProfile");
  };

  const handleLogout = async () => {
    try {
      // Remove token from secure storage
      await SecureStore.deleteItemAsync('token');
      
      // Redirect to login page (or any other desired page)
      router.replace('/(auth)/login');
    } catch (e) {
      console.error('Error during logout:', e);
    }
  };

  return (
    <Provider>
      <View style={appstyles.containerprofile}>
        {/* Logo on the left */}
        <Image
          source={require("@/assets/images/pushAndPullLogoSmall.svg")}
          style={{ height: 15, width: 120 }}
        />

        {/* Profile icon with dropdown menu */}
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <View style={appstyles.profileIcon}>
                <Image
                  source={require("@/assets/images/profile-icon.svg")}
                  style={{ height: 18, width: 16 }}
                />
              </View>
            </TouchableOpacity>
          }
          contentStyle={appstyles.menuContent}
        >
          <TouchableRipple
            onPress={handleEditProfile}
            rippleColor="rgba(128, 0, 128, 1)" // semi-transparent purple
            style={appstyles.menuItem}
          >
            <View>
              <Menu.Item title="Edit Profile" titleStyle={{ color: "white" }} />
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={handleLogout}
            rippleColor="rgba(128, 0, 128, 1)"
            style={appstyles.menuItem}
          >
            <View>
              <Menu.Item title="Logout" titleStyle={{ color: "white" }} />
            </View>
          </TouchableRipple>
        </Menu>
      </View>
    </Provider>
  );
}
