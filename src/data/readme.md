/ data/fitnessData.js

// This file contains sample fitness data that can be used in your application.


export const fitnessPrograms = [
  {
    id: 1,
    title: 'Beginner Full Body Workout',
    duration: '4 weeks',
    description: 'A beginner-friendly workout program targeting all major muscle groups.',
    imageUrl: 'https://example.com/beginner-workout.jpg',
  },
  {
    id: 2,
    title: 'Advanced Cardio Challenge',
    duration: '6 weeks',
    description: 'An intense cardio program designed for advanced users to improve endurance.',
    imageUrl: 'https://example.com/advanced-cardio.jpg',
  },
  {
    id: 3,
    title: 'Yoga for Relaxation',
    duration: '3 weeks',
    description: 'A yoga program focused on relaxation, flexibility, and stress reduction.',
    imageUrl: 'https://example.com/yoga-relaxation.jpg',
  },
];

export const nutritionPlans = [
  {
    id: 1,
    title: 'Healthy Eating Guide',
    description: 'A comprehensive guide to maintaining a balanced and healthy diet.',
  },
  {
    id: 2,
    title: 'Vegan Meal Plan',
    description: 'A plant-based meal plan for individuals following a vegan lifestyle.',
  },
  {
    id: 3,
    title: 'Muscle Gain Nutrition',
    description: 'Nutritional guidelines for individuals aiming to gain muscle mass.',
  },
];

In this example, we've created a fitnessData.js file inside the data folder, containing sample fitness-related data. This data can include fitness programs, nutrition plans, or any other information relevant to your fitness application.

Now, let's explain the general usage and purpose of the data folder:

Purpose: The data folder is typically used to store static data, such as sample content, configurations, or any information that doesn't change frequently. It helps separate data concerns from the rest of your application logic.

Usage: You can import the data from these files into your components, screens, or services where you need access to this information. For example, in a fitness app, you might use the fitnessData.js file to populate a list of available fitness programs on a home screen.

Here's a simple example of how you might use the fitness data in a React Native component:

// components/FitnessProgramList.js

import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { fitnessPrograms } from '../data/fitnessData';

const FitnessProgramList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={fitnessPrograms}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemContent: {
    marginLeft: 10,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default FitnessProgramList;

In this example, the FitnessProgramList component imports the fitnessPrograms data from the fitnessData.js file and renders a list of fitness programs using a FlatList. This separation of data into the data folder makes it easier to manage and update static content.








