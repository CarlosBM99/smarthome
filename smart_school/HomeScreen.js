/* import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
var DOMParser = require('xmldom').DOMParser

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      val: undefined
    }
  }
  componentDidMount() {
    fetch('https://www.w3schools.com/xml/note.xml').then(response => response.text())
      .then(responseText => {
        var parser = new DOMParser()
        var doc = parser.parseFromString(responseText, "text/xml").documentElement
        var listNode = doc.getElementsByTagName("from")[0].firstChild.data
        this.setState({val: listNode})
      })
      .then(()=>{
        console.log(this.state.val)
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems:'center', margin: 20}}>
          <TouchableOpacity style={{padding: 20, borderWidth:1}}>
            <Text>Subjects</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems:'center'}}>
          <TouchableOpacity style={{padding: 20, borderWidth:1}}>
            <Text>Objects</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */

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
        <View style={{justifyContent: 'center', alignItems:'center', margin: 20}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Subjects')}} style={{padding: 20, borderWidth:1}}>
            <Text>Subjects</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Objects')}} style={{padding: 20, borderWidth:1}}>
            <Text>Objects</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor:'white'
  }
});