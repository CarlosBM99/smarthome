import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

var { height, width } = Dimensions.get('window');

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: '#f79e51', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 0.3 * width, height: 0.3 * width, borderRadius: ((0.3 * width) / 2), borderWidth: 7, borderColor: 'white', marginTop: 0.07 * width }}>
              <Image source={require('./assets/icon_tech.png')} style={{ width: 0.23 * width, height: 0.23 * width, borderRadius: ((0.23 * width) / 2), tintColor: 'white' }} />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Subjects')}} style={{ flex: 1, backgroundColor: '#f78cb7', width: '100%', height: '100%', flexDirection: 'row' }}>
          <View style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', padding: 30 }}>
            <Image source={require('./assets/icon_class.png')} style={{ width: 0.25 * width,resizeMode: 'contain', height: 0.25 * width, tintColor: 'white' }} />
            <Text style={{ fontSize: 0.06 * width, paddingLeft: 0.06 * width, color: 'white', fontWeight: '700' }}>SUBJECTS</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="ios-arrow-forward" color="white" size={0.09 * width} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Objects')}} style={{ flex: 1, backgroundColor: '#87e5f2', width: '100%', height: '100%', flexDirection: 'row' }}>
          <View style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', padding: 30 }}>
            <Image source={require('./assets/logo.png')} style={{ width: 0.25 * width,resizeMode: 'contain', height: 0.25 * width, tintColor: 'white' }} />
            <Text style={{ fontSize: 0.06 * width, paddingLeft: 0.06 * width, color: 'white', fontWeight: '700' }}>LABORATORIES</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="ios-arrow-forward" color="white" size={0.09 * width} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Information')}} style={{ flex: 1, backgroundColor: '#b0f96b', width: '100%', height: '100%', flexDirection: 'row' }}>
          <View style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', padding: 30 }}>
            <Image source={require('./assets/info_icon.png')} style={{ width: 0.25 * width,resizeMode: 'contain', height: 0.25 * width, tintColor: 'white' }} />
            <Text style={{ fontSize: 0.06 * width, paddingLeft: 0.06 * width, color: 'white', fontWeight: '700' }}>INFORMATION</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="ios-arrow-forward" color="white" size={0.09 * width} />
          </View>
        </TouchableOpacity>
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