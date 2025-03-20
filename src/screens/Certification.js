// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const Certification = ({ route }) => {
//   const { certification } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{certification.certificationName}</Text>
//       <Text style={styles.issueDate}>Issue Date: {new Date(certification.issueDate).toLocaleDateString()}</Text>
//     </View>
//   );
// };

// export default Certification;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   name: {
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#d63384",
//     marginBottom: 10,
//   },
//   issueDate: {
//     textAlign: "center",
//     fontSize: 16,
//     color: "#666",
//   },
// });


import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Certification = ({ route }) => {
  const { certification } = route.params;

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please provide a rating.');
      return;
    }

    // Handle submitting the rating and feedback (e.g., send it to an API or store locally)
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    alert('Thank you for your feedback!');
    setFeedback(''); // Clear feedback after submitting
    setRating(0); // Reset rating
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.certificationCard}>
        <Text style={styles.certificationName}>{certification.certificationName}</Text>
        <Text style={styles.issueDate}>Issue Date: {new Date(certification.issueDate).toLocaleDateString()}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Rating Section */}
        <Text style={styles.ratingTitle}>Rate this Certification</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <FontAwesome
                name={star <= rating ? 'star' : 'star-o'}
                size={30}
                color={star <= rating ? '#f1c40f' : '#bdc3c7'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Section */}
        <TextInput
          style={styles.feedbackInput}
          placeholder="Leave your feedback here..."
          placeholderTextColor="#bdc3c7"
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Certification;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#2c3e50",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  certificationCard: {
    backgroundColor: "#34495e",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    width: "90%",
    padding: 30,
    alignItems: "center",
    marginTop: 30,
  },
  certificationName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ecf0f1",
    marginBottom: 10,
    textAlign: "center",
  },
  issueDate: {
    fontSize: 16,
    color: "#95a5a6",
    marginBottom: 20,
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#7f8c8d",
    marginVertical: 10,
  },
  ratingTitle: {
    fontSize: 18,
    color: "#ecf0f1",
    fontWeight: "bold",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  feedbackInput: {
    width: "100%",
    height: 100,
    backgroundColor: "#7f8c8d",
    borderRadius: 8,
    padding: 10,
    color: "#ecf0f1",
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  submitButtonText: {
    color: "#ecf0f1",
    fontSize: 16,
    fontWeight: "bold",
  },
});
