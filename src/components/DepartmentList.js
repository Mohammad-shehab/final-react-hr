// import { FlatList, StyleSheet, TouchableOpacity, View, ActivityIndicator, Text } from "react-native";
// import React, { useState } from "react";
// import DepartmentItem from "./DepartmentItem";
// import { getAllDepartments } from "../api/departments";
// import { useQuery } from "@tanstack/react-query";

// const DepartmentList = ({ onSelectCategory }) => {
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const { data, error, isLoading } = useQuery({
//     queryKey: ["departments"],
//     queryFn: () => getAllDepartments(),
//   });

//   if (isLoading) return <ActivityIndicator size="large" color="#ff69b4" />;
//   if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

//   const handleCategoryPress = (department) => {
//     const newCategory = selectedCategory === department.departmentId ? "" : department.departmentId;
//     setSelectedCategory(newCategory);
//     onSelectCategory(newCategory);
//   };

//   console.log("Selected Category:", selectedCategory); // Debugging: Log selected category

//   return (
//     <FlatList
//       data={data}
//       horizontal={true}
//       showsHorizontalScrollIndicator={false}
//       keyExtractor={(item) => item.departmentId.toString()}
//       renderItem={({ item }) => (
//         <TouchableOpacity
//           onPress={() => handleCategoryPress(item)}
//           style={[
//             styles.categoryItem,
//             selectedCategory === item.departmentId && styles.selectedCategoryItem,
//           ]}
//         >
//           <DepartmentItem department={item} />
//         </TouchableOpacity>
//       )}
//       contentContainerStyle={styles.scrollView}
//     />
//   );
// };

// export default DepartmentList;

// const styles = StyleSheet.create({
//   scrollView: {
//     marginTop: 1,
//     paddingHorizontal: 1,
//   },
//   categoryItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     marginHorizontal: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     width: 100,
//     borderWidth: 1,
//     borderColor: "#d63384",
//     marginBottom: 10,
//   },
//   selectedCategoryItem: {
//     backgroundColor: "#ff69b4",
//     borderColor: "#ff69b4",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });



import { FlatList, StyleSheet, TouchableOpacity, View, ActivityIndicator, Text } from "react-native";
import React, { useState } from "react";
import DepartmentItem from "./DepartmentItem";
import { getAllDepartments } from "../api/departments";
import { useQuery } from "@tanstack/react-query";

const DepartmentList = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getAllDepartments(),
  });

  if (isLoading) return <ActivityIndicator size="large" color="#abb2b9" />;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  const handleCategoryPress = (department) => {
    const newCategory = selectedCategory === department.departmentId ? "" : department.departmentId;
    setSelectedCategory(newCategory);
    onSelectCategory(newCategory);
  };

  console.log("Selected Category:", selectedCategory); // Debugging: Log selected category

  return (
    <FlatList
      data={data}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.departmentId.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item)}
          style={[
            styles.categoryItem,
            selectedCategory === item.departmentId && styles.selectedCategoryItem,
          ]}
        >
          <DepartmentItem department={item} />
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.scrollView}
    />
  );
};

export default DepartmentList;

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryItem: {
    backgroundColor: "#34495e",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    borderWidth: 1,
    borderColor: "#34495e",
  },
  selectedCategoryItem: {
    backgroundColor: "#ecf0f1",
    borderColor: "#ecf0f1",
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 20,
  },
});
