// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from "react";

// const CourseItem = ({ course, onPress }) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View style={styles.container}>
//         <Text style={styles.name}>{course.courseName}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default CourseItem;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#d63384",
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//   },
//   name: {
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#d63384",
//   },
// });

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
    backgroundColor: "#34495e",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2c3e50",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ecf0f1",
    textAlign: "center",
  },
});
