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

// const Profile = () => {
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

//   const handleCertificationPress = (certification) => {
//     navigation.navigate("Certification", { certification });
//   };

//   const handleCoursePress = (course) => {
//     navigation.navigate("Details", { course });
//   };

//   const handleApplicationPress = (application) => {
//     navigation.navigate("ApplicationDetails", { application });
//   };

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="#ff69b4" />;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>Error: {error.message}</Text>;
//   }

//   if (!profile) {
//     return <Text style={styles.errorText}>Profile not found</Text>;
//   }

//   const completedApplications = profile.courseApplications.$values.filter(
//     (app) => app.status === "Completed"
//   );
//   const approvedApplications = profile.courseApplications.$values.filter(
//     (app) => app.status === "Approved"
//   );
//   const pendingApplications = profile.courseApplications.$values.filter(
//     (app) => app.status === "Pending"
//   );
//   const rejectedApplications = profile.courseApplications.$values.filter(
//     (app) => app.status === "Rejected"
//   );

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.profileContainer}>
//         <Text style={styles.title}>Welcome, {profile.userName}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Completed Courses</Text>
//         <View style={styles.table}>
//           {completedApplications.map((app) => (
//             <TouchableOpacity
//               key={app.applicationId}
//               onPress={() =>
//                 handleCertificationPress(app.course.certifications.$values[0])
//               }
//             >
//               <Text style={styles.courseName}>{app.course.courseName}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Ongoing Courses</Text>
//         <View style={styles.table}>
//           {approvedApplications.map((app) => (
//             <TouchableOpacity
//               key={app.applicationId}
//               onPress={() => handleApplicationPress(app)}
//             >
//               <Text style={styles.courseName}>{app.course.courseName}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Pending Applications</Text>
//         <View style={styles.table}>
//           {pendingApplications.map((app) => (
//             <Text key={app.applicationId} style={styles.courseName}>
//               {app.course.courseName}
//             </Text>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Rejected Applications</Text>
//         <View style={styles.table}>
//           {rejectedApplications.map((app) => (
//             <Text key={app.applicationId} style={styles.courseName}>
//               {app.course.courseName}
//             </Text>
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Profile;

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
//   section: {
//     width: "100%",
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#d63384",
//     marginBottom: 10,
//   },
//   table: {
//     backgroundColor: "#f9f9f9",
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   courseName: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 5,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
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
// });

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
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
        backgroundColor: "#2c3e50",
      },
      headerTintColor: "#ecf0f1",
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

  const handleCertificationPress = (certification) => {
    navigation.navigate("Certification", { certification });
  };

  const handleCoursePress = (course) => {
    navigation.navigate("Details", { course });
  };

  const handleApplicationPress = (application) => {
    navigation.navigate("ApplicationDetails", { application });
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

  const completedApplications = profile.courseApplications.$values.filter(
    (app) => app.status === "Completed"
  );
  const approvedApplications = profile.courseApplications.$values.filter(
    (app) => app.status === "Approved"
  );
  const pendingApplications = profile.courseApplications.$values.filter(
    (app) => app.status === "Pending"
  );
  const rejectedApplications = profile.courseApplications.$values.filter(
    (app) => app.status === "Rejected"
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FontAwesome
        name="user-circle"
        size={60}
        color="#ecf0f1"
        style={styles.profileIcon}
      />
      <Text style={styles.userName}>{profile.userName}</Text>

      {/* Completed Courses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed Courses</Text>
        <View style={styles.table}>
          {completedApplications.map((app) => (
            <TouchableOpacity
              key={app.applicationId}
              onPress={() =>
                handleCertificationPress(app.course.certifications.$values[0])
              }
            >
              <View style={[styles.courseCard, styles.completedBox]}>
                <Text style={[styles.courseName, styles.completedCourseName]}>
                  {app.course.courseName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Ongoing Courses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ongoing Courses</Text>
        <View style={styles.table}>
          {approvedApplications.map((app) => (
            <TouchableOpacity
              key={app.applicationId}
              onPress={() => handleApplicationPress(app)}
            >
              <View style={[styles.courseCard, styles.ongoingBox]}>
                <Text style={[styles.courseName, styles.ongoingCourseName]}>
                  {app.course.courseName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Pending Applications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Applications</Text>
        <View style={styles.table}>
          {pendingApplications.map((app) => (
            <View
              key={app.applicationId}
              style={[styles.courseCard, styles.pendingBox]}
            >
              <Text style={[styles.courseName, styles.pendingCourseName]}>
                {app.course.courseName}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Rejected Applications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rejected Applications</Text>
        <View style={styles.table}>
          {rejectedApplications.map((app) => (
            <View
              key={app.applicationId}
              style={[styles.courseCard, styles.rejectedBox]}
            >
              <Text style={[styles.courseName, styles.rejectedCourseName]}>
                {app.course.courseName}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#2c3e50",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
  section: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ecf0f1",
    marginBottom: 10,
  },
  table: {
    backgroundColor: "#7f8c8d",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  courseCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  completedBox: {
    backgroundColor: "#2ecc71", // Green for completed courses
  },
  ongoingBox: {
    backgroundColor: "#3498db", // Blue for ongoing courses
  },
  pendingBox: {
    backgroundColor: "#f39c12", // Orange for pending courses
    borderWidth: 1,
    borderColor: "#e67e22", // Darker orange border for pending
  },
  rejectedBox: {
    backgroundColor: "#e74c3c", // Red for rejected courses
    borderWidth: 1,
    borderColor: "#c0392b", // Darker red border for rejected
  },
  courseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text for better readability
  },
  completedCourseName: {
    color: "#fff", // White text color
  },
  ongoingCourseName: {
    color: "#fff", // White text color
  },
  pendingCourseName: {
    color: "#fff", // White text for better readability
  },
  rejectedCourseName: {
    color: "#fff", // White text for better readability
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  logoutButtonText: {
    color: "#ecf0f1",
    fontSize: 16,
    fontWeight: "bold",
  },
});
