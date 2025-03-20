// import { StyleSheet, TextInput, View, ScrollView } from "react-native";
// import React, { useState } from "react";
// import DepartmentList from "../components/DepartmentList";
// import CourseList from "../components/CourseList";
// import { useNavigation } from "@react-navigation/native";

// const Home = () => {
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const navigation = useNavigation();

//   const handleCoursePress = (course) => {
//     navigation.navigate("Details", { course });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TextInput
//         placeholder="Search Your Course"
//         style={styles.searchInput}
//         onChangeText={(text) => {
//           setSearch(text);
//         }}
//       />

//       <DepartmentList onSelectCategory={setSelectedCategory} />
//       <View style={styles.dividerContainer}>
//         <View style={styles.divider} />
//       </View>
//       <CourseList
//         search={search}
//         selectedCategory={selectedCategory}
//         onCoursePress={handleCoursePress}
//       />
//     </ScrollView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingTop: 10,
//     paddingHorizontal: 10,
//     paddingBottom: 10,
//   },
//   dividerContainer: {
//     width: "100%",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   divider: {
//     width: "100%",
//     height: 5,
//     backgroundColor: "#d63384",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: "#d63384",
//     width: "100%",
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 15,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
// });

// import { StyleSheet, TextInput, View, ScrollView } from "react-native";
// import React, { useState } from "react";
// import DepartmentList from "../components/DepartmentList";
// import CourseList from "../components/CourseList";
// import { useNavigation } from "@react-navigation/native";

// const Home = () => {
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const navigation = useNavigation();

//   const handleCoursePress = (course) => {
//     navigation.navigate("Details", { course });
//   };

//   return (
//     <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
//       <View style={styles.card}>
//         <TextInput
//           placeholder="Search Your Course"
//           placeholderTextColor="#777"
//           style={styles.searchInput}
//           onChangeText={(text) => {
//             setSearch(text);
//           }}
//         />
//       </View>

//       <View style={styles.card}>
//         <DepartmentList onSelectCategory={setSelectedCategory} />
//       </View>

//       <View style={styles.dividerContainer}>
//         <View style={styles.divider} />
//       </View>

//       <View style={styles.card}>
//         <CourseList
//           search={search}
//           selectedCategory={selectedCategory}
//           onCoursePress={handleCoursePress}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: "#121212",
//   },
//   container: {
//     flexGrow: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 20,
//     width: "100%",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   dividerContainer: {
//     width: "100%",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   divider: {
//     width: "90%",
//     height: 2,
//     backgroundColor: "#444",
//     borderRadius: 1,
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: "#DDD",
//     width: "100%",
//     padding: 12,
//     borderRadius: 10,
//     color: "#000",
//     backgroundColor: "#FFF",
//     fontSize: 16,
//   },
// });

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchCard}>
          <TextInput
            placeholder="Search something"
            placeholderTextColor="#B0B0B0"
            style={styles.searchInput}
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
        </View>

        {/* Departments List */}
        <View style={styles.card}>
          <DepartmentList onSelectCategory={setSelectedCategory} />
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>

        {/* Courses List */}
        <View style={styles.card}>
          <CourseList
            search={search}
            selectedCategory={selectedCategory}
            onCoursePress={handleCoursePress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  searchCard: {
    backgroundColor: "#1A1A1A", // Dark gray background
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#FFF", // Soft white glow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    backgroundColor: "#1A1A1A", // Dark gray background
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#fff", // Subtle white glow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dividerContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    width: "90%",
    height: 2,
    backgroundColor: "#333", // Darker gray divider
    borderRadius: 1,
  },
  searchInput: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    color: "#FFF", // White text
    backgroundColor: "#2A2A2A", // Dark gray input background
    fontSize: 16,
  },
});
