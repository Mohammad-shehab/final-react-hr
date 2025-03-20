// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const DepartmentItem = ({ department }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{department.departmentName}</Text>
//     </View>
//   );
// };

// export default DepartmentItem;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     padding: 10,
//   },
//   name: {
//     textAlign: "center",
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#d63384",
//   },
// });

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DepartmentItem = ({ department }) => {
  if (!department) {
    return <Text>No Department Data</Text>; // Handle cases where department is null or undefined
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{department.departmentName}</Text>
    </View>
  );
};

export default DepartmentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#37474f", // A slightly lighter dark color for the divider
    width: "100%",
  },
  name: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "normal",
    color: "#eceff1",
  },
});

