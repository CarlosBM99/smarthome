import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";

var DOMParser = require('xmldom').DOMParser
import Icon from 'react-native-vector-icons/Ionicons'
var { height, width } = Dimensions.get('window');

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAPII-nQbiaYMFfEvMsRq_NCktWN9dHO5I",
  authDomain: "iot-first-project-28e6a.firebaseapp.com",
  databaseURL: "https://iot-first-project-28e6a.firebaseio.com",
  projectId: "iot-first-project-28e6a",
  storageBucket: "iot-first-project-28e6a.appspot.com",
  messagingSenderId: "906289230462"
};

const Firebase = firebase.initializeApp(config);

export { Firebase }

class SubjectDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
      val: undefined,
      studentsList: [],
      allInClass: false
    }
    this._isMounted = false
  }
  static navigationOptions = {
    headerTitle: 'Details'
  }
  checkExisting(name) {
    let list = this.state.list
    list.forEach(student => {
      if (student.id === name) {
        return true
      }
    })
    return false
  }
  async getVal() {
    let th = this
    var db = Firebase.database()
    var list = []
    let studentsList = []
    var listOfEPC = []
    //console.log('st')
    await db.ref().child('demo').once('value', function (snapshot) {
      snapshot.forEach(student => {
        //console.log(student.val().name, student.val().id)
        studentsList.push(student)
      })
      list = studentsList
    })
    //console.log('List ->>>>>>', list)
    return list
  }
  componentWillMount() {
    this._isMounted = true
    let th = this
    var db = Firebase.database()
    var list = []
    let studentsList = []
    var listOfEPC = []
    db.ref().child('demo').once('value', function (snapshot) {
      snapshot.forEach(student => {
        studentsList.push(student)
      })
      th.setState({ studentsList: studentsList, list: studentsList })
    })
    db.ref().child('currentState').on('value', async function (snapshot) {
      if (th._isMounted) {
        list = await th.getVal()
        th.setState({ loading: true })
        //console.log('List!!!!!! ')
        //console.log(list)
        snapshot.forEach(child => {
          th.state.studentsList.forEach((student, index) => {
            if (student.val().id === child.val().name) {
              delete list[index]
            }
          })
        });
        for(let index=0; index < list.length ; index++){
          if(list[index] === undefined){
            list.splice(index, 1)
          }
        }
        //console.log('After Listt!!')
        //console.log(list)
        th.setState({ list: list, loading: false })
      }
    })
    this.interval = setInterval(function () {
      fetch('http://192.168.2.160:3161/devices/AdvanPay-m1-eu-160/inventory').then(response => response.text())
        .then(responseText => {
          listOfEPC = []
          var parser = new DOMParser()
          var doc = parser.parseFromString(responseText, "text/xml").documentElement
          var x = doc.getElementsByTagName("epc")
          for (i = 0; i < x.length; i++) {
            let getCorrectName =
              listOfEPC.push({
                name: x[i].childNodes[0].nodeValue
              })
          }
          th.setState({ val: listOfEPC })
          db.ref().child('currentState').set(listOfEPC)
        })
        .then(() => {
          //console.log(th.state.val)
        })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
    this._isMounted = false
  }
  penalties() {
    let th = this
    var db = Firebase.database()
    clearInterval(this.interval)
    let cont = 0
    console.log(this.state.list)
    this.state.list.forEach(student =>{
      cont= cont + 1
    })
    for(let index=0; index < this.state.list.length ; index++){
      if(this.state.list[index] === undefined){
        this.state.list.splice(index, 1)
      }
    }
    console.log(cont)
    if(cont === 0){
      console.log('EMPTY')
      this.setState({ allInClass: true })
    }
    this.state.list.forEach(student => {
      db.ref().child('demo/' + student.val().key + '/penalties').once('value', function(snapshot){
        db.ref().child('demo/' + student.val().key + '/penalties').set(snapshot.val() + 1)
      })
    })
  }
  render() {
    var listLabs = [
      'Carlos Bertomeu Marin',
      'Borja Javierre',
      'Roger Caritj',
    ]
    return (
      <View style={styles.container}>
        <View style={{ flex: 5 }}>
          {
            !this.state.allInClass ?
              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20 }}>Missings:</Text>
                {!this.state.loading ? <ScrollView style={{ margin: 30 }}>
                  {
                    this.state.list.map((lab => {
                      return (
                        <TouchableOpacity key={lab.val().id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10, flex: 1, borderWidth: 0.5, padding: 20, borderColor: 'tomato' }}>
                          <Text>{lab.val().name}</Text>
                        </TouchableOpacity>
                      )
                    }))
                  }
                </ScrollView> : <Text>Loading</Text>}
              </View>
              :
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 0.4*width }}>
                <View style={{ padding: 20, borderRadius: 20, flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
                  <Text style={{fontSize: 0.07*width, fontWeight: '700', marginBottom: 30}}>All students in class</Text>
                  <View style={{ width: 0.2 * width, height: 0.2 * width, borderRadius: ((0.2 * width) / 2), backgroundColor: '#82fc79', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="ios-checkmark" color="white" size={0.15 * width} />
                  </View>
                </View>
              </View>
          }
        </View>
        {
          !this.state.allInClass ?
            <View style={{ flex: 1, margin: 30 }}>
              <TouchableOpacity onPress={() => { this.penalties() }} style={{ flex: 1, padding: 20, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>Start</Text>
              </TouchableOpacity>
            </View> :
            null
        }
      </View>
    );
  }
}
export default SubjectDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});