// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const ApplicationDetails = ({ route }) => {
//   const { application } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Course Details</Text>
//       <Text style={styles.label}>Course Name:</Text>
//       <Text style={styles.value}>{application.course.courseName}</Text>
//       <Text style={styles.label}>Description:</Text>
//       <Text style={styles.value}>{application.course.description}</Text>
//       <Text style={styles.label}>Duration:</Text>
//       <Text style={styles.value}>{application.course.duration}</Text>
//       <Text style={styles.label}>Certification Name:</Text>
//       <Text style={styles.value}>{application.course.certificationName}</Text>
//       <Text style={styles.label}>Status:</Text>
//       <Text style={styles.value}>{application.status}</Text>
//       <Text style={styles.label}>Applied Date:</Text>
//       <Text style={styles.value}>{new Date(application.appliedDate).toLocaleDateString()}</Text>
//       <Text style={styles.label}>Reviewed Date:</Text>
//       <Text style={styles.value}>{application.reviewedDate ? new Date(application.reviewedDate).toLocaleDateString() : 'N/A'}</Text>
//       <Text style={styles.label}>Completion Date:</Text>
//       <Text style={styles.value}>{application.completionDate ? new Date(application.completionDate).toLocaleDateString() : 'N/A'}</Text>
//     </View>
//   );
// };

// export default ApplicationDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#d63384',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#666',
//     marginTop: 10,
//   },
//   value: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 10,
//   },
// });




import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const ApplicationDetails = ({ route }) => {
  const { application } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Course Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Course Name:</Text>
          <Text style={styles.value}>{application.course.courseName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{application.course.description}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>{application.course.duration}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Certification Name:</Text>
          <Text style={styles.value}>{application.course.certificationName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{application.status}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Applied Date:</Text>
          <Text style={styles.value}>{new Date(application.appliedDate).toLocaleDateString()}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Reviewed Date:</Text>
          <Text style={styles.value}>
            {application.reviewedDate ? new Date(application.reviewedDate).toLocaleDateString() : 'N/A'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Completion Date:</Text>
          <Text style={styles.value}>
            {application.completionDate ? new Date(application.completionDate).toLocaleDateString() : 'N/A'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ApplicationDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2c3e50', // Use the dark background color
    padding: 20,
  },
  card: {
    backgroundColor: '#34495e',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1', // Light color for title
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#bdc3c7', // Lighter color for labels
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#ecf0f1', // Light text color for values
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 15,
  },
});
