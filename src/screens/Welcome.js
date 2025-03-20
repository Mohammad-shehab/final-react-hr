// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Welcome = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Our App</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Login')}
//       >
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Register')}
//       >
//         <Text style={styles.buttonText}>Create Account</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Welcome;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#d63384',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#d63384',
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

//ourcode
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const WelcomePage = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1C1C1C" : "#F5F7FA" },
      ]}
    >
      {/* Dark Mode Switch */}
      <View style={styles.topRightContainer}>
        <Text style={{ color: isDarkMode ? "#fff" : "#333", fontSize: 14 }}>
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
        />
      </View>

      {/* Image Section */}
      <Image source={require("../../assets/Darbni.jpg")} style={styles.image} />

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#333" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Social Media Links */}
      <View style={styles.socialContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://abk.eahli.com/en/")}
          style={styles.iconButton}
        >
          <FontAwesome name="globe" size={30} color="#007AFF" />
          <Text style={styles.iconText}>Website</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.instagram.com/abk_kuwait/")
          }
          style={styles.iconButton}
        >
          <FontAwesome name="instagram" size={30} color="#E1306C" />
          <Text style={styles.iconText}>Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://twitter.com/abk_kuwait")}
          style={styles.iconButton}
        >
          <FontAwesome name="twitter" size={30} color="#1DA1F2" />
          <Text style={styles.iconText}>Twitter</Text>
        </TouchableOpacity>
      </View>

      {/* Terms and Conditions */}
      <TouchableOpacity>
        <Text style={styles.termsText}>
          Terms & Conditions | Privacy Policy
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  topRightContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    width: "90%",
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 15,
    resizeMode: "cover",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  iconButton: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  termsText: {
    marginTop: 15,
    fontSize: 12,
    color: "#888",
    textDecorationLine: "underline",
  },
});
