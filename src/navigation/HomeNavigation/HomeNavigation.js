import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import Details from '../../screens/Details';
import Certification from '../../screens/Certification';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          title: 'Enroll Now',
          headerStyle: {
            backgroundColor: '#d63384',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen 
        name="Details" 
        component={Details} 
        options={{ 
          title: 'Details',
          headerStyle: {
            backgroundColor: '#d63384',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen 
        name="Certification" 
        component={Certification} 
        options={{ 
          title: 'Certification',
          headerStyle: {
            backgroundColor: '#d63384',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;