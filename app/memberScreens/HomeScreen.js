import React, { Component } from 'react';
import {StyleSheet, View, Image, TouchableHighlight, Text} from 'react-native';
export default class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Home',
    header: null
  };
  
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <Image source={require('../assets/background.png')}
                style={{width:"100%", height:"100%"}}
                resizeMode="contain">
            </Image>
            <Image source={require('../assets/mainLogo.png')}
                style={styles.mainLogo}>
            </Image>
            <View style={styles.buttonContainer}>
              <TouchableHighlight onPress={() =>navigate('GoalSelection')}
              underlayColor="transparent">
                <View style={styles.signup}>
                  <Text style={styles.signupText}>SIGN UP</Text>
                </View>
              </TouchableHighlight>
                <Text style={styles.memberText}>alreade a stayfit member?</Text>
                <TouchableHighlight onPress={() =>navigate('Login')} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>LOG IN</Text>
                </View>
              </TouchableHighlight>
            </View>
        </View> 
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    position:'absolute',
  },
  buttonContainer: {
    position:'absolute',
    zIndex:2,
    bottom:0,
    alignItems: 'center'
  },
  signup:{
    width:260,
    height:50,
    backgroundColor: '#E62221',
    borderRadius: 50,
    marginBottom: 15,
    alignItems: 'center',
    padding:8,
    paddingTop:15
  },
  login:{
    width:260,
    height:50,
    backgroundColor: 'white',
    borderRadius: 50,
    marginBottom: 30,
    alignItems: 'center',
    padding:8,
    paddingTop:15
  },
  signupText:{
    color:'white'
  },
  loginText:{
    color:'#E62221'
  },
  memberText:{
    color:'white',
    fontStyle:'italic',
    paddingBottom: 5
  }
});