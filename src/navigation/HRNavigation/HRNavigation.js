import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import HRHome from '../../screens/HRHome';
import AllUsers from '../../screens/AllUsers';
import Courses from '../../screens/Courses'; // Import Courses
import ProfileHR from '../../screens/Auth/ProfileHR'; // Import ProfileHR
import UserContext from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { deleteToken } from '../../api/storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsHR from '../../screens/DetailsHR';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HRHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HRHome"
      component={HRHome}
      options={{
        title: 'HR Home',
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
      name="DetailsHR"
      component={DetailsHR}
      options={{
        title: 'User Details',
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

const AllUsersStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AllUsers"
      component={AllUsers}
      options={{
        title: 'All Users',
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
      name="DetailsHR"
      component={DetailsHR}
      options={{
        title: 'User Details',
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

const ProfileHRStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileHR"
      component={ProfileHR}
      options={{
        title: 'Profile',
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

const CoursesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Courses"
      component={Courses}
      options={{
        title: 'Courses',
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

const HRNavigation = () => {
  const { setIsAuth, setRole } = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await deleteToken();
    setIsAuth(false);
    setRole(null);
    navigation.navigate("Login");
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "HRHomeStack") {
            iconName = "home";
          } else if (route.name === "AllUsersStack") {
            iconName = "people";
          } else if (route.name === "CoursesStack") {
            iconName = "book";
          } else if (route.name === "ProfileHRStack") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#d63384',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HRHomeStack"
        component={HRHomeStack}
        options={{
          headerShown: false,
          title: 'HR Home',
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
              <Ionicons name="log-out-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="AllUsersStack"
        component={AllUsersStack}
        options={{
          headerShown: false,
          title: 'All Users',
        }}
      />
      <Tab.Screen
        name="CoursesStack"
        component={CoursesStack}
        options={{
          headerShown: false,
          title: 'Courses',
        }}
      />
      <Tab.Screen
        name="ProfileHRStack"
        component={ProfileHRStack}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HRNavigation;