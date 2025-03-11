import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import ProfileNavigation from "../ProfileNavigation/ProfileNavigation"; // Import ProfileNavigation

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#d63384', // Set active tab color to pink
        tabBarInactiveTintColor: 'gray', // Set inactive tab color to gray
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation} // Use ProfileNavigation
        options={{
          tabBarLabel: "Profile",
          headerShown: false, // Hide the header for the tab navigator
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;