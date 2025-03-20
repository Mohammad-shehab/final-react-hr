import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../api/users";
import { register } from "../api/auth";
import { useNavigation } from "@react-navigation/native";

const AllUsers = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    role: "",
    departmentId: 0,
  });

  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers");
      setNewEmployee({
        username: "",
        password: "",
        fullName: "",
        email: "",
        role: "",
        departmentId: 0,
      });
      setModalVisible(false);
      Alert.alert("Success", "Employee added successfully");
    },
    onError: (error) => {
      console.error("Error adding employee:", error);
      Alert.alert("Error", "Failed to add employee");
    },
  });

  const handleAddEmployee = () => {
    if (
      newEmployee.username &&
      newEmployee.password &&
      newEmployee.fullName &&
      newEmployee.email &&
      newEmployee.role &&
      newEmployee.departmentId
    ) {
      registerMutation.mutate(newEmployee);
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  if (usersLoading) {
    return <ActivityIndicator size="large" color="#abb2b9" />;
  }

  if (usersError) {
    return <Text style={styles.errorText}>Error: {usersError.message}</Text>;
  }

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailsHR", { user: item })}
    >
      <View style={styles.userItem}>
        <Text style={styles.userName}>{item.fullName}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.title}>All Employees</Text> */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Employee</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users || []}
        keyExtractor={(item) => item.id?.toString() || ""}
        renderItem={renderUserItem}
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
            <Text style={styles.modalTitle}>Add New Employee</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={newEmployee.username}
              onChangeText={(text) =>
                setNewEmployee({ ...newEmployee, username: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={newEmployee.password}
              onChangeText={(text) =>
                setNewEmployee({ ...newEmployee, password: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={newEmployee.fullName}
              onChangeText={(text) =>
                setNewEmployee({ ...newEmployee, fullName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newEmployee.email}
              onChangeText={(text) =>
                setNewEmployee({ ...newEmployee, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Role"
              value={newEmployee.role}
              onChangeText={(text) =>
                setNewEmployee({ ...newEmployee, role: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Department ID"
              value={newEmployee.departmentId.toString()}
              onChangeText={(text) =>
                setNewEmployee({ ...newEmployee, departmentId: parseInt(text) })
              }
            />
            <TouchableOpacity style={styles.button} onPress={handleAddEmployee}>
              <Text style={styles.buttonText}>Add Employee</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AllUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ecf0f1",
  },
  list: {
    width: "100%",
  },
  userItem: {
    backgroundColor: "#34495e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: "column", // Stack items vertically
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ecf0f1",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#abb2b9",
    marginBottom: 5,
  },
  userRole: {
    fontSize: 14,
    color: "#abb2b9",
  },
  addButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "50%", // Set the width to 100%
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    backgroundColor: "#34495e",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: "90%", // Adjust the width of the modal
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ecf0f1",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#abb2b9",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
    color: "#ecf0f1",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%", // Set the width to 100%
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 20,
  },
});
