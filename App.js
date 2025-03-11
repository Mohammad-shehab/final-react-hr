import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation/MainNavigation';
import AuthNavigation from './src/navigation/AuthNavigation/AuthNavigation';
import { getToken, deleteToken } from "./src/api/storage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppState } from 'react-native';
import UserContext from "./src/contexts/UserContext";

const queryClient = new QueryClient();

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    checkToken();

    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        await deleteToken();
        setIsAuth(false);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <UserContext.Provider value={{ isAuth, setIsAuth }}>
            {isAuth ? <MainNavigation /> : <AuthNavigation />}
          </UserContext.Provider>
        </QueryClientProvider>
      </NavigationContainer>
  );
}