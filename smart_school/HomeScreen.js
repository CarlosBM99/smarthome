import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: 'tomato', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>AA</Text>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'red', width: '100%', height: '100%' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>AA</Text>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue', width: '100%', height: '100%' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>AA</Text>

          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'yellow', width: '100%', height: '100%' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>AA</Text>

          </View>
        </View>
        {/* <View style={{justifyContent: 'center', alignItems:'center', margin: 20}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Subjects')}} style={{padding: 20, borderWidth:1}}>
            <Text>Subjects</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Objects')}} style={{padding: 20, borderWidth:1}}>
            <Text>Objects</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});