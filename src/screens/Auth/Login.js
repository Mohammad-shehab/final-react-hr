// import {
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
//   } from "react-native";
//   import React, { useContext, useState } from "react";
//   import { useNavigation } from "@react-navigation/native";
//   import { useMutation } from "@tanstack/react-query";
//   import { login } from "../../api/auth";
//   import UserContext from "../../contexts/UserContext";
//   const Login = () => {
//     const navigation = useNavigation();
//     const [userInfo, setUserInfo] = useState({});
//     const { setIsAuth } = useContext(UserContext);

//     const { mutate } = useMutation({
//       mutationKey: ["login"],
//       mutationFn: () => login(userInfo),
//       onSuccess: () => {
//         alert("Welcome");
//         setIsAuth(true);
//       },
//       onError: (error) => {
//         console.error("Login error:", error);
//         alert("Something went wrong. Please check your credentials and try again.");
//       },
//     });

//     return (
//       <View style={styles.container}>
//         <View style={styles.form}>
//           <Text style={styles.title}>Welcome Back</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Username"
//             onChangeText={(value) => {
//               setUserInfo({ ...userInfo, username: value });
//             }}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             onChangeText={(value) => {
//               setUserInfo({ ...userInfo, password: value });
//             }}
//           />

//           <TouchableOpacity style={styles.button} onPress={() => mutate()}>
//             <Text style={styles.buttonText}>Login</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Register")}>
//             <Text style={styles.linkText}>
//               Don't have an account? <Text style={styles.linkTextBold}>Join us today</Text>
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   export default Login;

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "white",
//       padding: 20,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     form: {
//       width: "100%",
//       padding: 20,
//       backgroundColor: "#ffffff",
//       borderRadius: 10,
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 5,
//       elevation: 5,
//       borderWidth: 1,
//       borderColor: "#d63384",
//     },
//     title: {
//       color: "#d63384",
//       fontSize: 24,
//       fontWeight: "bold",
//       marginBottom: 10,
//       textAlign: "center",
//     },
//     subtitle: {
//       color: "#666666",
//       fontSize: 16,
//       marginBottom: 20,
//       textAlign: "center",
//     },
//     input: {
//       backgroundColor: "#fff",
//       padding: 10,
//       borderRadius: 5,
//       marginTop: 10,
//       color: "#d63384",
//       borderWidth: 1,
//       borderColor: "#d63384",
//     },
//     button: {
//       backgroundColor: "#d63384",
//       padding: 10,
//       borderRadius: 5,
//       marginTop: 20,
//       alignItems: "center",
//     },
//     buttonText: {
//       color: "#ffffff",
//       fontWeight: "bold",
//       fontSize: 16,
//     },
//     link: {
//       marginTop: 20,
//       alignItems: "center",
//     },
//     linkText: {
//       color: "#d63384",
//       fontSize: 16,
//     },
//     linkTextBold: {
//       fontWeight: "bold",
//     },
//   });

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { login, getProfile } from "../../api/auth";
import UserContext from "../../contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const { setIsAuth, setRole } = useContext(UserContext);

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: async () => {
      alert("Welcome");
      setIsAuth(true);
      const profile = await getProfile(); // Fetch profile to get the role
      console.log("User role:", profile.role); // Add logging to debug
      setRole(profile.role); // Set the role in context
      if (profile.role === "HR") {
        navigation.reset({
          index: 0,
          routes: [{ name: "HR" }], // Navigate to HR tab navigator
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }], // Navigate to regular home tab navigator
        });
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      alert(
        "Something went wrong. Please check your credentials and try again."
      );
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome to Darbeni</Text>
        <Text style={styles.subtitle}>Login in to continue</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={24}
            color="#B0B0B0"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#B0B0B0"
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, username: value });
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color="#B0B0B0"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#B0B0B0"
            secureTextEntry
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, password: value });
            }}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => mutate()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>
            Don't have an account? <Text style={styles.linkTextBold}>Join us today</Text>
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loginContainer: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#d63384",
    fontSize: 16,
  },
  linkTextBold: {
    fontWeight: "bold",
  },
});
