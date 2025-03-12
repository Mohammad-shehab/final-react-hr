import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeApplication } from '../api/courseApplications';

const DetailsHR = ({ route }) => {
  const { user } = route.params;
  const queryClient = useQueryClient();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const completedApplications = user.courseApplications?.$values?.filter(
    (app) => app.status === "Completed"
  ) || [];
  const approvedApplications = user.courseApplications?.$values?.filter(
    (app) => app.status === "Approved"
  ) || [];
  const pendingApplications = user.courseApplications?.$values?.filter(
    (app) => app.status === "Pending"
  ) || [];
  const rejectedApplications = user.courseApplications?.$values?.filter(
    (app) => app.status === "Rejected"
  ) || [];

  const completeMutation = useMutation({
    mutationFn: completeApplication,
    onSuccess: () => {
      queryClient.invalidateQueries("nonHRUsers");
      queryClient.invalidateQueries(["userDetails", user.id]); // Invalidate the user details query
      setModalVisible(false);
      Alert.alert("Success", "Certification given successfully");
    },
    onError: (error) => {
      console.error("Error giving certification:", error);
      Alert.alert("Error", "Failed to give certification");
    },
  });

  const handleGiveCertification = () => {
    if (selectedApplication) {
      completeMutation.mutate(selectedApplication.applicationId);
    }
  };

  const handleCoursePress = (application) => {
    setSelectedApplication(application);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>User: {user.userName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed Courses</Text>
        <View style={styles.table}>
          {completedApplications.length > 0 ? (
            completedApplications.map((app) => (
              <Text key={app.applicationId} style={styles.courseName}>
                {app.course.courseName}
              </Text>
            ))
          ) : (
            <Text style={styles.noDataText}>No completed courses</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ongoing Courses</Text>
        <View style={styles.table}>
          {approvedApplications.length > 0 ? (
            approvedApplications.map((app) => (
              <TouchableOpacity key={app.applicationId} onPress={() => handleCoursePress(app)}>
                <Text style={styles.courseName}>{app.course.courseName}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>No ongoing courses</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Applications</Text>
        <View style={styles.table}>
          {pendingApplications.length > 0 ? (
            pendingApplications.map((app) => (
              <Text key={app.applicationId} style={styles.courseName}>
                {app.course.courseName}
              </Text>
            ))
          ) : (
            <Text style={styles.noDataText}>No pending applications</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rejected Applications</Text>
        <View style={styles.table}>
          {rejectedApplications.length > 0 ? (
            rejectedApplications.map((app) => (
              <Text key={app.applicationId} style={styles.courseName}>
                {app.course.courseName}
              </Text>
            ))
          ) : (
            <Text style={styles.noDataText}>No rejected applications</Text>
          )}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Give Certification</Text>
            <Text style={styles.modalText}>Course: {selectedApplication?.course.courseName}</Text>
            <Text style={styles.modalText}>Applicant: {selectedApplication?.applicant.userName}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleGiveCertification}>
                <Text style={styles.buttonText}>Give Certification</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DetailsHR;

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
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#d63384',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});