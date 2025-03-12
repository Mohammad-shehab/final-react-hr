import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers } from '../api/users';
import { approveApplication, rejectApplication } from '../api/courseApplications';
import { useNavigation } from '@react-navigation/native';

const HRHome = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: users, error: usersError, isLoading: usersLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const approveMutation = useMutation({
    mutationFn: approveApplication,
    onSuccess: () => {
      console.log("Application approved successfully");
      queryClient.invalidateQueries("allUsers");
      setModalVisible(false);
    },
    onError: (error) => {
      console.error("Error approving application:", error);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectApplication,
    onSuccess: () => {
      console.log("Application rejected successfully");
      queryClient.invalidateQueries("allUsers");
      setModalVisible(false);
    },
    onError: (error) => {
      console.error("Error rejecting application:", error);
    },
  });

  if (usersLoading) {
    return <ActivityIndicator size="large" color="#d63384" />;
  }

  if (usersError) {
    return <Text style={styles.errorText}>Error: {usersError.message}</Text>;
  }

  const pendingApplications = users?.flatMap(user =>
    user.courseApplications?.$values?.filter(application => application.status === "Pending").map(application => ({
      ...application,
      applicant: user,
    })) || []
  ) || [];

  const handleApprove = () => {
    if (selectedApplication) {
      console.log("Approving application:", selectedApplication.applicationId);
      approveMutation.mutate(selectedApplication.applicationId);
    }
  };

  const handleReject = () => {
    if (selectedApplication) {
      console.log("Rejecting application:", selectedApplication.applicationId);
      rejectMutation.mutate(selectedApplication.applicationId);
    }
  };

  const renderApplicationItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setSelectedApplication(item); setModalVisible(true); }}>
      <View style={styles.applicationItem}>
        <Text style={styles.courseName}>{item.course.courseName}</Text>
        <Text style={styles.applicantName}>Applicant: {item.applicant.userName}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Applications</Text>
      <FlatList
        data={pendingApplications}
        keyExtractor={(item) => item.applicationId.toString()}
        renderItem={renderApplicationItem}
        contentContainerStyle={styles.list}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Approve or Reject Application</Text>
            <Text style={styles.modalText}>Course: {selectedApplication?.course.courseName}</Text>
            <Text style={styles.modalText}>Applicant: {selectedApplication?.applicant.userName}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleApprove}>
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleReject}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HRHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  applicationItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d63384',
  },
  applicantName: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
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