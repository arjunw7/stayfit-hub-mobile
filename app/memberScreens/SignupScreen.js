import React, { Component } from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import CONFIG from '../config/config'
export default class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Signup',
    header: null
    };
     async saveItem(item, selectedValue) {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        alert("AsyncStorage error")
        console.error('AsyncStorage error: ' + error.message);
    }
    }

    initUser(token) {
        axios.get('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => {
            const { navigate } = this.props.navigation;
            var login = {
                username: response.data.email,
                password: "master"
            }
            axios.post(CONFIG.base_url + 'login/', login)
            .then((response) => {
                var user = JSON.stringify(response.data)
                if(response.data.designation=='Member'){
                    this.props.navigation("Dashboard", {user: user})
                }
                else
                this.props.navigation("SuperAdminHome", {user: user})
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })  
        })
        .catch((error) => {
            alert(JSON.stringify(error))
        }) 
      }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigate('Home')}>
            <Image source={require('../assets/backButton.png')} 
                style={styles.back}>
            </Image>
        </TouchableHighlight>
        
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
        <TouchableHighlight onPress={() =>navigate('Signup')}
            underlayColor="white">
            <View style={styles.goalOption}>
                <Text style={styles.goalName}>Be Healthier</Text>
                <Text style={styles.goalText}>Eat and train for optimum health</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() =>navigate('Signup')}
            underlayColor="white">
            <View style={styles.goalOption}>
                <Text style={styles.goalName}>Loose Weight</Text>
                <Text style={styles.goalText}>Get leaner and increase your stamina</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() =>navigate('Signup')}
            underlayColor="white">
            <View style={styles.goalOption}>
                <Text style={styles.goalName}>Gain Weight</Text>
                <Text style={styles.goalText}>Build muscle strength</Text>
            </View>
        </TouchableHighlight>
            </View>
      </View>
    );
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
  }
});