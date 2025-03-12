import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useContext } from "react";
  import { useQuery } from "@tanstack/react-query";
  import { getProfile } from "../../api/auth";
  import { deleteToken } from "../../api/storage";
  import { useNavigation } from "@react-navigation/native";
  import UserContext from "../../contexts/UserContext";
  
  const ProfileHR = () => {
    const { setIsAuth } = useContext(UserContext);
    const navigation = useNavigation();
  
    const { data: profile, error, isLoading } = useQuery({
      queryKey: ["profile"],
      queryFn: getProfile,
    });
  
    const handleLogout = async () => {
      await deleteToken();
      setIsAuth(false);
      navigation.navigate("Login");
    };
  
    if (isLoading) {
      return <ActivityIndicator size="large" color="#d63384" />;
    }
  
    if (error) {
      return <Text style={styles.errorText}>Error: {error.message}</Text>;
    }
  
    if (!profile) {
      return <Text style={styles.errorText}>Profile not found</Text>;
    }
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Welcome, {profile.userName}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
  export default ProfileHR;
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "white",
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    profileContainer: {
      backgroundColor: "#ffffff",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#d63384",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "#d63384",
    },
    logoutButton: {
      backgroundColor: "#d63384",
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      alignItems: "center",
    },
    logoutButtonText: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 16,
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginTop: 20,
    },
  });