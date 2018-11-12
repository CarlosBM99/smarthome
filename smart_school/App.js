import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen'
import Subjects from './Subjects'
import Objects from './Objects'
import SubjectDetails from './SubjectDetails'

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Subjects: {
    screen: Subjects
  },
  SubjectDetails: {
    screen: SubjectDetails
  },
  Objects: {
    screen: Objects
  }
});
