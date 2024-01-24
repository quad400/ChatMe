import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserToFollow, ChatHome, Profile } from "../screens";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const Tabs = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          position: "relative",
          height: 50,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="ChatHome"
        component={ChatHome}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="chatbubble-ellipses-sharp"
                size={24}
                color={focused ? COLORS.primary : COLORS.gray40}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="UserToFollow"
        component={UserToFollow}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="connected-tv"
                size={30}
                color={focused ? COLORS.primary : COLORS.gray40}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="user-circle"
                size={24}
                color={focused ? COLORS.primary : COLORS.gray40}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavigation;
