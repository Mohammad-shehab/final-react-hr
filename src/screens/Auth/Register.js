import {
    
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, {  useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { useMutation } from "@tanstack/react-query";
  import { register } from "../../api/auth";
  
  const Register = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({});
  
    const { mutate } = useMutation({
      mutationKey: ["register"],
      mutationFn: () => register(userInfo, image),
      onSuccess: () => {
        alert("Account created");
      },
      onError: (error) => {
        console.error("Registration error:", error.response ? error.response.data : error.message);
        alert(`Error in creating account: ${error.response ? error.response.data.message : error.message}`);
      },
    });
  
   
  
      console.log(result);
  
     
 
  
  
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>add employee</Text>
  
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, username: value });
            }}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, password: value });
            }}
          />

            <TextInput
            style={styles.input}
            placeholder="Email"
            secureTextEntry
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, email: value });
            }}
          />

            <TextInput
            style={styles.input}
            placeholder="Role"
            secureTextEntry
            onChangeText={(value) => {
              setUserInfo({ ...userInfo, role: value });
            }}
          />
  
         
  
          <TouchableOpacity style={styles.button} onPress={() => mutate()}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
  
         
        </View>
      </View>
    );

  };
  
  export default Register;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      width: "100%",
      padding: 20,
      backgroundColor: "#ffffff",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      borderWidth: 1,
      borderColor: "#d63384",
  
    },
    title: {
      color: "#d63384",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    subtitle: {
      color: "#666666",
      fontSize: 16,
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      color: "#d63384",
      borderWidth: 1,
      borderColor: "#d63384",
    },
    uploadButton: {
      marginTop: 20,
      backgroundColor: "#d63384",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    uploadButtonText: {
      color: "#ffffff",
      fontSize: 16,
    },
    profileImage: {
      width: 200,
      height: 200,
      marginTop: 20,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "#ff69b4",
    },
    button: {
      backgroundColor: "#d63384",
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      alignItems: "center",
    },
    buttonText: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 16,
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