import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

class Subjects extends Component {
  static navigationOptions= {
    headerTitle: 'Subjects'
  }
  render() {
    var subjectsList = [
      'Maths',
      'Fisica',
      'Spanish',
      'English',
    ]
    return (
      <View style={styles.container}>
        <View style={{ padding: 20 }}>
          <View style={{ borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 20 }}>List of labs:</Text>
          </View>
          <ScrollView style={{ margin: 30 }}>
            {
              subjectsList.map((subject => {
                return (
                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SubjectDetails')}} key={subject} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10, flex: 1, borderWidth: 0.5, padding: 20 }}>
                    <Text>{subject}</Text>
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
export default Subjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});