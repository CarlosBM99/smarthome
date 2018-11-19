import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

class Objects extends Component {
  static navigationOptions = {
    headerTitle: 'Objects',
    headerStyle: {
      backgroundColor: '#87e5f2'
    }
  }
  render() {
    var listLabs = [
      'Lab1 (High School)',
      'Lab2 (Bachelor)',
      'Lab3 (University)',
      'Lab4 (University)',
    ]
    return (
      <View style={styles.container}>
        <View style={{ padding: 20 }}>
          <View style={{ borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 20 }}>List of labs:</Text>
          </View>
          <ScrollView style={{ margin: 30 }}>
            {
              listLabs.map((lab => {
                return (
                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('LabsDetails')}} key={lab} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10, flex: 1, borderWidth: 0.5, padding: 20 }}>
                    <Text>{lab}</Text>
                  </TouchableOpacity>
                )
              }))
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default Objects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});