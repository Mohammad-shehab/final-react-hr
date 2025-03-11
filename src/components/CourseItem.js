import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CourseItem = ({ course, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.name}>{course.courseName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#d63384",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  name: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#d63384",
  },
});