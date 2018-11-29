import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
var { height, width } = Dimensions.get('window');

import { Firebase } from './SubjectDetails'

class Information extends Component {
    static navigationOptions = {
        headerTitle: 'Information',
        headerStyle: {
            backgroundColor: '#b0f96b'
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            studentsList: [],
            loading: false
        }
        this._isMounted = false
    }
    componentWillMount() {
        this._isMounted = true
        let th = this
        th.setState({loading: true})
        var db = Firebase.database()
        db.ref().child('demo').on('value', function (snapshot) {
            if(th._isMounted){
                let studentsList = []
                snapshot.forEach(student => {
                    studentsList.push(student)
                })
                th.setState({ studentsList: studentsList, loading: false })
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render() {
        if(this.state.loading){
            return(
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center', alignItems:'center' }}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
                <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                    <Text style={{ marginBottom: 20, marginTop: 20, fontWeight: '700', fontSize: 0.07 * width }}>Students</Text>
                    {
                        this.state.studentsList.map(student => {
                            return (
                                <Text key={student.val().id} style={{ padding: 5 }}>{student.val().name}</Text>
                            )
                        })
                    }
                </View>
                <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ marginBottom: 20, marginTop: 20, fontWeight: '700', fontSize: 0.07 * width }}>Penalties</Text>
                    {
                        this.state.studentsList.map(student => {
                            return (
                                <Text key={student.val().id} style={{ padding: 5 }}>{student.val().penalties}</Text>
                            )
                        })
                    }
                </View>
            </View>
        );
    }
}
export default Information;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});