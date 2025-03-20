// import React, { useContext } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Profile from "../../screens/Auth/Profile";
// import Certification from "../../screens/Certification";
// import ApplicationDetails from "../../screens/ApplicationDetails";
// import UserContext from "../../contexts/UserContext";
// import { useNavigation } from "@react-navigation/native";
// import { deleteToken } from "../../api/storage";

// const Stack = createNativeStackNavigator();

// const ProfileNavigation = () => {
//   const { setIsAuth } = useContext(UserContext);
//   const navigation = useNavigation();

//   const handleLogout = async () => {
//     await deleteToken();
//     setIsAuth(false);
//     navigation.navigate("Login");
//   };

//   return (
//     <Stack.Navigator initialRouteName="Profile">
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           title: "Profile",
//           headerStyle: {
//             backgroundColor: "#d63384",
//           },
//           headerTintColor: "#fff",
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//           headerTitleAlign: "center",
//           headerRight: () => (
//             <TouchableOpacity
//               onPress={handleLogout}
//               style={{ marginRight: 10 }}
//             >
//               <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
//             </TouchableOpacity>
//           ),
//           headerShadowVisible: true,
//           headerShown: true,
//         }}
//       />
//       <Stack.Screen
//         name="Certification"
//         component={Certification}
//         options={{
//           title: "Certification",
//           headerStyle: {
//             backgroundColor: "#d63384",
//           },
//           headerTintColor: "#fff",
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//           headerTitleAlign: "center",
//         }}
//       />
//       <Stack.Screen
//         name="ApplicationDetails"
//         component={ApplicationDetails}
//         options={{
//           title: "Application Details",
//           headerStyle: {
//             backgroundColor: "#d63384",
//           },
//           headerTintColor: "#fff",
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//           headerTitleAlign: "center",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default ProfileNavigation;


import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../../screens/Auth/Profile";
import Certification from "../../screens/Certification";
import ApplicationDetails from "../../screens/ApplicationDetails";
import UserContext from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { deleteToken } from "../../api/storage";

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  const { setIsAuth } = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await deleteToken();
    setIsAuth(false);
    navigation.navigate("Login");
  };

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: "#2c3e50", // Header background color black
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{ marginRight: 10 }}
            >
              <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
          headerShadowVisible: true,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Certification"
        component={Certification}
        options={{
          title: "Certification",
          headerStyle: {
            backgroundColor: "#2c3e50", // Header background color black
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ApplicationDetails"
        component={ApplicationDetails}
        options={{
          title: "Application Details",
          headerStyle: {
            backgroundColor: "#2c3e50", // Header background color black
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;