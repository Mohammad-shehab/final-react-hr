import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addCourse, deleteCourse, getAllCourses } from '../api/courses';
import DepartmentList from '../components/DepartmentList';
import CourseList from '../components/CourseList';
import { useNavigation } from '@react-navigation/native';

const Courses = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    courseId: 0,
    courseName: '',
    description: '',
    departmentId: 0,
    duration: '',
    certificationName: ''
  });

  const { data: courses, error: coursesError, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  const addCourseMutation = useMutation({
    mutationFn: addCourse,
    onSuccess: () => {
      queryClient.invalidateQueries("courses");
      setNewCourse({
        courseId: 0,
        courseName: '',
        description: '',
        departmentId: 0,
        duration: '',
        certificationName: ''
      });
      setModalVisible(false);
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries("courses");
      setModalVisible(false);
    },
  });

  const handleAddCourse = () => {
    if (newCourse.courseName && newCourse.description && newCourse.departmentId && newCourse.duration && newCourse.certificationName) {
      addCourseMutation.mutate(newCourse);
    }
  };

  const handleDeleteCourse = () => {
    if (selectedCourse) {
      deleteCourseMutation.mutate(selectedCourse.courseId);
    }
  };

  const handleCoursePress = (course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  if (coursesLoading) {
    return <ActivityIndicator size="large" color="#d63384" />;
  }

  if (coursesError) {
    return <Text style={styles.errorText}>Error: {coursesError.message}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Search Your Course"
        style={styles.searchInput}
        onChangeText={(text) => setSearch(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => { setSelectedCourse(null); setModalVisible(true); }}>
        <Text style={styles.addButtonText}>Add Course</Text>
      </TouchableOpacity>
      <DepartmentList onSelectCategory={setSelectedCategory} />
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
      <CourseList
        search={search}
        selectedCategory={selectedCategory}
        onCoursePress={handleCoursePress}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCourse ? (
              <>
                <Text style={styles.modalTitle}>{selectedCourse.courseName}</Text>
                <Text style={styles.modalText}>Description: {selectedCourse.description}</Text>
                <Text style={styles.modalText}>Department ID: {selectedCourse.departmentId}</Text>
                <Text style={styles.modalText}>Duration: {selectedCourse.duration}</Text>
                <Text style={styles.modalText}>Certification Name: {selectedCourse.certificationName}</Text>
                <TouchableOpacity style={styles.button} onPress={handleDeleteCourse}>
                  <Text style={styles.buttonText}>Delete Course</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Add New Course</Text>
               
                <TextInput
                  style={styles.input}
                  placeholder="Course Name"
                  value={newCourse.courseName}
                  onChangeText={(text) => setNewCourse({ ...newCourse, courseName: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={newCourse.description}
                  onChangeText={(text) => setNewCourse({ ...newCourse, description: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Department ID"
                  value={newCourse.departmentId.toString()}
                  onChangeText={(text) => setNewCourse({ ...newCourse, departmentId: parseInt(text) })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Duration"
                  value={newCourse.duration}
                  onChangeText={(text) => setNewCourse({ ...newCourse, duration: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Certification Name"
                  value={newCourse.certificationName}
                  onChangeText={(text) => setNewCourse({ ...newCourse, certificationName: text })}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddCourse}>
                  <Text style={styles.buttonText}>Add Course</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  dividerContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    width: "100%",
    height: 5,
    backgroundColor: "#d63384",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#d63384",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  addButton: {
    backgroundColor: "#d63384",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
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
  input: {
    height: 40,
    borderColor: '#d63384',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#d63384',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    marginTop: 10,
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