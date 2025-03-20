

// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert, Animated } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { applyForCourse } from '../api/courses';

// const Details = ({ route }) => {
//   const { course } = route.params;
//   const navigation = useNavigation();
//   const queryClient = useQueryClient();
//   const fadeAnim = React.useRef(new Animated.Value(0)).current;

//   React.useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const { mutate } = useMutation({
//     mutationKey: ['applyForCourse', course.courseId],
//     mutationFn: () => applyForCourse(course.courseId),
//     onSuccess: () => {
//       Alert.alert('Success', 'You have successfully applied for the course.');
//       queryClient.invalidateQueries('profile');
//       navigation.goBack();
//     },
//     onError: (error) => {
//       console.error('Error applying for course:', error);
//       Alert.alert('Error', 'Failed to apply for the course.');
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
//         <Text style={styles.name}>{course.courseName}</Text>
//         <Text style={styles.description}>{course.description}</Text>
//         <Text style={styles.info}>Duration: {course.duration}</Text>
//         <Text style={styles.info}>Certification: {course.certificationName}</Text>
//         <TouchableOpacity style={styles.applyButton} onPress={() => mutate()}>
//           <Text style={styles.applyButtonText}>Apply Now</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// export default Details;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#121212', // Dark background
//     padding: 20,
//   },
//   card: {
//     backgroundColor: '#1E1E1E', // Darker card background
//     borderRadius: 20,
//     padding: 25,
//     width: '95%',
//     alignItems: 'stretch',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF', // White text color
//     marginBottom: 15,
//   },
//   description: {
//     fontSize: 16,
//     color: '#B0B0B0', // Light gray text color
//     marginBottom: 20,
//     lineHeight: 24,
//   },
//   info: {
//     fontSize: 16,
//     color: '#E0E0E0', // Lighter gray text color
//     marginBottom: 10,
//   },
//   applyButton: {
//     backgroundColor: '#4CAF50', // Green button background
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   applyButtonText: {
//     color: '#FFFFFF', // White button text color
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });



import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Animated, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyForCourse } from '../api/courses';

const Details = ({ route }) => {
  const { course } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const { mutate } = useMutation({
    mutationKey: ['applyForCourse', course.courseId],
    mutationFn: () => applyForCourse(course.courseId),
    onSuccess: () => {
      setLoading(false);
      Alert.alert('Success', 'You have successfully applied for the course.');
      queryClient.invalidateQueries('profile');
      navigation.goBack();
    },
    onError: (error) => {
      setLoading(false);
      console.error('Error applying for course:', error);
      Alert.alert('Error', 'Failed to apply for the course.');
    },
  });

  const handleApplyPress = () => {
    setLoading(true);
    mutate();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.name}>{course.courseName}</Text>
        <Text style={styles.description}>{course.description}</Text>
        <Text style={styles.info}>Duration: {course.duration}</Text>
        <Text style={styles.info}>Certification: {course.certificationName}</Text>
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.applyButtonText}>Apply Now</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark background
    padding: 20,
  },
  card: {
    backgroundColor: '#1E1E1E', // Darker card background
    borderRadius: 20,
    padding: 25,
    width: '95%',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#B0B0B0', // Light gray text color
    marginBottom: 20,
    lineHeight: 24,
  },
  info: {
    fontSize: 16,
    color: '#E0E0E0', // Lighter gray text color
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#4CAF50', // Green button background
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#FFFFFF', // White button text color
    fontWeight: 'bold',
    fontSize: 18,
  },
  backButton: {
    backgroundColor: '#FFFFFF', // White button background
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#000000', // Black button text color
    fontWeight: 'bold',
    fontSize: 16,
  },
});






