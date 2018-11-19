import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen'
import Subjects from './Subjects'
import Objects from './Objects'
import SubjectDetails from './SubjectDetails'
import Information from './Information'
import LabsDetails from './LabsDetails'

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
  },
  Information: {
    screen: Information
  },
  LabsDetails: {
    screen: LabsDetails
  }
});
