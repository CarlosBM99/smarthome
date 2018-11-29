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
var { height, width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons'

import { Firebase } from './SubjectDetails'

class LabsDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
      val: undefined,
      studentsList: []
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
    await db.ref().child('lab').once('value', function (snapshot) {
      snapshot.forEach(student => {
        //console.log(student.val().name, student.val().id)
        studentsList.push(student)
      })
      list = studentsList
    })
    return list
  }
  componentWillMount() {
    this._isMounted = true
    let th = this
    var db = Firebase.database()
    var list = []
    let studentsList = []
    var listOfEPC = []
    db.ref().child('lab').once('value', function (snapshot) {
      snapshot.forEach(student => {
        studentsList.push(student)
      })
      th.setState({ studentsList: studentsList, list: studentsList })
    })
    db.ref().child('currentState').on('value', async function (snapshot) {
      if (th._isMounted) {
        list = await th.getVal()
        th.setState({ loading: true })
        snapshot.forEach(function (child) {
          th.state.studentsList.forEach((student, index) => {
            if (student.val().id === child.val().name) {
              delete list[index]
            }
          })
        })
        for(let index=0; index < list.length ; index++){
          if(list[index] === undefined){
            list.splice(index, 1)
          }
        }
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
          // set in firebase
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
  render() {
    var listLabs = [
      'Carlos Bertomeu Marin',
      'Borja Javierre',
      'Roger Caritj',
    ]
    return (
      <View style={styles.container}>
        <View style={{ flex: 5 }}>
          <View style={{ padding: 20 }}>
            {
              this.state.list[0] === undefined ? 
                <View style={{ padding: 20, borderRadius: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 0.05 * width, fontWeight: '700', marginBottom: 30, color: 'black' }}>There are no missing objects</Text>
                  <View style={{ width: 0.2 * width, height: 0.2 * width, borderRadius: ((0.2 * width) / 2), backgroundColor: '#82fc79', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="ios-checkmark" color="white" size={0.15 * width} />
                  </View>
              </View> :
                <View>
                  <Text style={{ fontSize: 20 }}>Missings:</Text>
                  {
                    !this.state.loading ? <ScrollView style={{ margin: 30 }}>
                      {
                        this.state.list.map((lab => {
                          return (
                            <TouchableOpacity key={lab.val().id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10, flex: 1, borderWidth: 0.5, padding: 20, borderColor: 'tomato' }}>
                              <Text>{lab.val().name}</Text>
                            </TouchableOpacity>
                          )
                        }))
                      }
                    </ScrollView> : <Text>Loading</Text>
                  }
                </View>
            }

          </View>
        </View>
      </View>
    );
  }
}
export default LabsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});