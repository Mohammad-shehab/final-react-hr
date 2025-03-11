import { StyleSheet, TextInput, View, ScrollView } from "react-native";
import React, { useState } from "react";
import DepartmentList from "../components/DepartmentList";
import CourseList from "../components/CourseList";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigation = useNavigation();

  const handleCoursePress = (course) => {
    navigation.navigate("Details", { course });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Search Your Course"
        style={styles.searchInput}
        onChangeText={(text) => {
          setSearch(text);
        }}
      />

      <DepartmentList onSelectCategory={setSelectedCategory} />
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
      <CourseList
        search={search}
        selectedCategory={selectedCategory}
        onCoursePress={handleCoursePress}
      />
    </ScrollView>
  );
};

export default Home;

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
});