import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigation from "./src/navigation/MainNavigation/MainNavigation";
import AuthNavigation from "./src/navigation/AuthNavigation/AuthNavigation";
import HRNavigation from "./src/navigation/HRNavigation/HRNavigation"; // Import HRNavigation
import { getToken, deleteToken } from "./src/api/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppState } from "react-native";
import UserContext from "./src/contexts/UserContext";
import { getProfile } from "./src/api/auth"; // Import getProfile


const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null); // Add state for role

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setIsAuth(true);
      const profile = await getProfile(); // Fetch profile to get the role
      console.log("User role:", profile.role); // Add logging to debug
      setRole(profile.role); // Set the role
    } else {
      console.log("No token found");
      setRole(null); // Set role to null if no token is found
    }
  };

  useEffect(() => {
    checkToken();

    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        await deleteToken();
        setIsAuth(false);
        setRole(null); // Set role to null when app goes to background or inactive
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log("isAuth:", isAuth);
    console.log("role:", role);
  }, [isAuth, role]);

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ isAuth, setIsAuth, role, setRole }}>
          <Stack.Navigator>
            {isAuth ? (
              role === "HR" ? (
                <Stack.Screen
                  name="HR"
                  component={HRNavigation}
                  options={{ headerShown: false }}
                />
              ) : (
                <Stack.Screen
                  name="Main"
                  component={MainNavigation}
                  options={{ headerShown: false }}
                />
              )
            ) : (
              <Stack.Screen
                name="Auth"
                component={AuthNavigation}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </UserContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
