import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DepartmentItem = ({ department }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{department.departmentName}</Text>
    </View>
  );
};

export default DepartmentItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  name: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#d63384",
  },
});