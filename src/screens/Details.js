import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyForCourse } from '../api/courses';

const Details = ({ route }) => {
  const { course } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['applyForCourse', course.courseId],
    mutationFn: () => applyForCourse(course.courseId),
    onSuccess: () => {
      Alert.alert('Success', 'You have successfully applied for the course.');
      queryClient.invalidateQueries('profile'); // Invalidate the profile query to refresh data
      navigation.goBack();
    },
    onError: (error) => {
      console.error('Error applying for course:', error);
      Alert.alert('Error', 'Failed to apply for the course.');
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{course.courseName}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.duration}>Duration: {course.duration}</Text>
      <Text style={styles.certification}>Certification: {course.certificationName}</Text>
      <TouchableOpacity style={styles.applyButton} onPress={() => mutate()}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  name: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  duration: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  certification: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#d63384',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});