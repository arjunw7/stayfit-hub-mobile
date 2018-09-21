import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import CONFIG from '../config/config'
export default class GoalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       
    }      
    axios.get(CONFIG.base_url +'goals')
    .then((response) => {
        console.log(response.data)
        this.setState({goals:response.data._embedded.goals})
    })
    .catch((error) => {
        console.log(error)
        alert(error)
        const { navigate } = this.props.navigation;
        navigate("HomeScreen")
    })
    }
  static navigationOptions = {
    title: 'GoalSelection',
    header: null
    };
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.goals){
      return (
        <View style={styles.container}>
           <Avatar
            size="small"
            rounded
            icon={{name: 'arrow-back'}}
            onPress={() => navigate('Home')}
            containerStyle={{margin: 30}}
          />
          <View style={styles.innerContainer}>
            <Text style={styles.hi}>
              Hi!
            </Text>
            <Text style={styles.mainText}>
              Let's start with the basics
            </Text>
            <Text style={styles.mainText}>
              What's your goal?
            </Text>
            {
                this.state.goals
                .map((item, i) => (
                  <TouchableHighlight key={i} onPress={() => navigate('MemberDetails', {goalId: item.id, goalName: item.name, goalText: item.description})}
                      underlayColor="transparent">
                      <View style={styles.goalOption}>
                          <Text style={styles.goalName}>{item.name}</Text>
                          <Text style={styles.goalText}>{item.description}</Text>
                      </View>
                  </TouchableHighlight>
                ))
            }
          </View>
        </View>
      );
    }
    return (
      <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
      </View>
  )

    
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E62221'
  },
  innerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back:{
      position:'absolute',
      top:30,
      left:15
  },
  hi:{
      color:'white',
      fontSize:26,
      fontWeight:"300",
      paddingBottom:12
  },
  mainText:{
      color:'white',
      fontSize:16,
      fontWeight:"300",
      paddingBottom:10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  goalOption:{
    width:300,
    height:65,
    backgroundColor: 'white',
    borderRadius: 60,
    marginBottom: 30,
    alignItems: 'center',
    padding:8,
    paddingTop:15
  },
  goalName:{
    color:'#E62221',
    fontSize:18,
    fontWeight:'100'
  },
  goalText:{
      color:'grey'
  },
  loader:{
    marginTop:'100%',
  }
});