// import {
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import React, { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getProfile } from "../../api/auth";
// import { deleteToken } from "../../api/storage";
// import { useNavigation } from "@react-navigation/native";
// import UserContext from "../../contexts/UserContext";

// const ProfileHR = () => {
//   const { setIsAuth } = useContext(UserContext);
//   const navigation = useNavigation();

//   const {
//     data: profile,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["profile"],
//     queryFn: getProfile,
//   });

//   const handleLogout = async () => {
//     await deleteToken();
//     setIsAuth(false);
//     navigation.navigate("Login");
//   };

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="#d63384" />;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>Error: {error.message}</Text>;
//   }

//   if (!profile) {
//     return <Text style={styles.errorText}>Profile not found</Text>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.profileContainer}>
//         <Text style={styles.title}>Welcome, {profile.userName}</Text>
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default ProfileHR;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "white",
//     padding: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profileContainer: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#d63384",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#d63384",
//   },
//   logoutButton: {
//     backgroundColor: "#d63384",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//     alignItems: "center",
//   },
//   logoutButtonText: {
//     color: "#ffffff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });
import React, { useContext, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/auth";
import { deleteToken } from "../../api/storage";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../contexts/UserContext";
import { FontAwesome } from "@expo/vector-icons";

const Profile = () => {
  const { setIsAuth } = useContext(UserContext);
  const navigation = useNavigation();

  // Change Header Background to Match Screen Background
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#2c3e50", // Set header background to match the screen
      },
      headerTintColor: "#ecf0f1", // Set text color
      headerTitleStyle: { fontWeight: "bold" },
    });
  }, [navigation]);

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const handleLogout = async () => {
    await deleteToken();
    setIsAuth(false);
    navigation.navigate("Login");
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#abb2b9" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error.message}</Text>;
  }

  if (!profile) {
    return <Text style={styles.errorText}>Profile not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        {/* Profile Icon */}
        <FontAwesome name="user-circle" size={60} color="#ecf0f1" style={styles.profileIcon} />
        
        {/* User Info */}
        <Text style={styles.userName}>{profile.fullName}</Text>
        <Text style={styles.userEmail}>{profile.email}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* User Details */}
        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              <FontAwesome name="id-card" size={16} color="#bdc3c7" /> Username:
            </Text>
            <Text style={styles.detailValue}>{profile.userName}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              <FontAwesome name="building" size={16} color="#bdc3c7" /> Department ID:
            </Text>
            <Text style={styles.detailValue}>{profile.departmentId}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              <FontAwesome name="briefcase" size={16} color="#bdc3c7" /> Role:
            </Text>
            <Text style={styles.detailValue}>{profile.role}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              <FontAwesome name="phone" size={16} color="#bdc3c7" /> Phone:
            </Text>
            <Text style={styles.detailValue}>{profile.phone || "N/A"}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              <FontAwesome name="calendar" size={16} color="#bdc3c7" /> Joined:
            </Text>
            <Text style={styles.detailValue}>{profile.joinDate || "N/A"}</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#2c3e50",
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileCard: {
    backgroundColor: "#34495e",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
    width: "90%",
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
  },
  profileIcon: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ecf0f1",
    marginBottom: 8,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 16,
    color: "#95a5a6",
    marginBottom: 20,
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7f8c8d",
    marginVertical: 10,
  },
  detailContainer: {
    width: "100%",
    marginTop: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#bdc3c7",
    fontWeight: "bold",
    marginRight: 5,
  },
  detailValue: {
    fontSize: 14,
    color: "#ecf0f1",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#ecf0f1",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Profile;
