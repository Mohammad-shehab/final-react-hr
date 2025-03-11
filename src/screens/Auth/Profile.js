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

const Profile = () => {
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
    return <ActivityIndicator size="large" color="#ff69b4" />;
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
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Welcome, {profile.userName}</Text>
       
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed Courses</Text>
        <View style={styles.table}>
          {completedApplications.map((app) => (
            <TouchableOpacity
              key={app.applicationId}
              onPress={() => handleCertificationPress(app.course.certifications.$values[0])}
            >
              <Text style={styles.courseName}>{app.course.courseName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ongoing Courses</Text>
        <View style={styles.table}>
          {approvedApplications.map((app) => (
            <TouchableOpacity
              key={app.applicationId}
              onPress={() => handleApplicationPress(app)}
            >
              <Text style={styles.courseName}>{app.course.courseName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Applications</Text>
        <View style={styles.table}>
          {pendingApplications.map((app) => (
            <Text key={app.applicationId} style={styles.courseName}>
              {app.course.courseName}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rejected Applications</Text>
        <View style={styles.table}>
          {rejectedApplications.map((app) => (
            <Text key={app.applicationId} style={styles.courseName}>
              {app.course.courseName}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

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
  section: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d63384",
    marginBottom: 10,
  },
  table: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  courseName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
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
});