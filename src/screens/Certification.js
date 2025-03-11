import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Certification = ({ route }) => {
  const { certification } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{certification.certificationName}</Text>
      <Text style={styles.issueDate}>Issue Date: {new Date(certification.issueDate).toLocaleDateString()}</Text>
    </View>
  );
};

export default Certification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#d63384",
    marginBottom: 10,
  },
  issueDate: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});