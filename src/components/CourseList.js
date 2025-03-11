import { FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import React from "react";
import CourseItem from "./CourseItem";
import { getAllCourses } from "../api/courses";
import { useQuery } from "@tanstack/react-query";

const CourseList = ({ search, selectedCategory, onCoursePress }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
  });

  if (isLoading) return <ActivityIndicator size="large" color="#ff69b4" />;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  const filteredCourses = data.filter((course) => {
    const matchesCategory = selectedCategory ? course.departmentId === selectedCategory : true;
    const matchesSearch = course.courseName.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  console.log("Filtered Courses:", filteredCourses); // Debugging: Log filtered courses

  return (
    <FlatList
      data={filteredCourses}
      keyExtractor={(item) => item.courseId.toString()}
      renderItem={({ item }) => <CourseItem course={item} onPress={() => onCoursePress(item)} />}
      contentContainerStyle={styles.scrollView}
    />
  );
};

export default CourseList;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});