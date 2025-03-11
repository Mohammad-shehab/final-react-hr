import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ApplicationDetails = ({ route }) => {
  const { application } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Details</Text>
      <Text style={styles.label}>Course Name:</Text>
      <Text style={styles.value}>{application.course.courseName}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{application.course.description}</Text>
      <Text style={styles.label}>Duration:</Text>
      <Text style={styles.value}>{application.course.duration}</Text>
      <Text style={styles.label}>Certification Name:</Text>
      <Text style={styles.value}>{application.course.certificationName}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{application.status}</Text>
      <Text style={styles.label}>Applied Date:</Text>
      <Text style={styles.value}>{new Date(application.appliedDate).toLocaleDateString()}</Text>
      <Text style={styles.label}>Reviewed Date:</Text>
      <Text style={styles.value}>{application.reviewedDate ? new Date(application.reviewedDate).toLocaleDateString() : 'N/A'}</Text>
      <Text style={styles.label}>Completion Date:</Text>
      <Text style={styles.value}>{application.completionDate ? new Date(application.completionDate).toLocaleDateString() : 'N/A'}</Text>
    </View>
  );
};

export default ApplicationDetails;

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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});