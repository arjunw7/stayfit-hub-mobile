import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from 'react-native';
import axios from 'axios';
import CONFIG from '../config/config'
import { LoginManager} from 'react-native-fbsdk';
var width = Dimensions.get('window').width;
import { Avatar, Header, ListItem } from 'react-native-elements';

const list = [
  {
    title: 'Account Details',
    icon: 'settings',
    route: 'AccountDetails',
    member: global.member
  },
  {
    title: 'My trainer',
    icon: 'supervisor-account',
    route: 'MyTrainer',
    member: global.member
  },
  {
    title: 'Active Packs/Subscriptions',
    icon: 'subscriptions',
    route: 'ActivePacks',
    member: global.member
  },
  {
    title: 'Feedback',
    icon: 'feedback',
    route: 'Feedback',
    member: global.member
  },
  {
    title: "FAQ's",
    icon: 'question-answer',
    route: 'FAQ',
    member: global.member
  },
  {
    title: "Support",
    icon: 'message',
    route: 'Support',
    member: global.member
  }

]
export default class ProfileScreen extends Component {
  constructor(props) {
        super(props);
        this.state ={
        }
        this.props.navigation.addListener('didFocus', () => this.updatePage())
    }
    async userLogout() {
      try {
        await AsyncStorage.removeItem('member');
        const { navigate } = this.props.navigation;
        LoginManager.logOut()
        navigate("Home")
        
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }
componentWillMount(){
  AsyncStorage.getItem('member').then((member) => {
    this.setState({member:JSON.parse(member)})
  })
}
updatePage(){
  AsyncStorage.getItem('member').then((member) => {
    this.getUser(JSON.parse(member).id)
  })
}
getUser(id){
  axios.get(CONFIG.base_url + 'members/' +id)
   .then((response) => {
         this.setState({user:response.data, showLoader: false}) 
   })
   .catch((error) => {
     console.log(error)
   })
}
  static navigationOptions = {
    title: 'Profile',
    header: null
  };
  
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.member){
      return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
              <View style={styles.profileHead}>
                <Text style={{alignSelf:'flex-start', fontSize:14}}>{this.state.member.name}</Text>
                <Text style={{color:'#E62221'}} onPress={() =>navigate('HealthProfile', {user: this.state.member})}>MY HEALTH PROFILE ></Text>
              </View>
              <View style={{
                        borderBottomColor: '#e4e4e4',
                        borderBottomWidth: 1,
                        width:width,
                        alignSelf:'center',
                        marginTop:10
                      }}
                    />
              <View style={styles.profileList}>
                <Text style={{color:'#E62221'}}>Account</Text>
                <View>
                {
                  list.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.title}
                      titleStyle={{fontSize:12, color:'black', padding:5}}
                      leftIcon={{ name: item.icon }}
                      containerStyle={{width:width-40, borderBottomColor:'#f1f1f1'}}
                      topDivider="false"
                      onPress={() =>navigate(item.route, {user: this.state.memberString})}
                    />
                  ))
                }
                <ListItem
                      title={'Logout'}
                      titleStyle={{fontSize:12, color:'black', padding:5}}
                      leftIcon={{ name: 'rotate-right' }}
                      containerStyle={{width:width-40, borderBottomColor:'#f1f1f1'}}
                      topDivider="false"
                      onPress={() => this.userLogout()}
                    />
              </View>
              </View>             
          </View>
        </View>
      );
    }
    else{
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer:{
    flex: 1,
  },
  profileHead:{
    alignSelf:'flex-start',
    marginLeft:30,
    marginTop:40
  },
  profileList:{
    margin:30
  },

  loader:{
    marginTop:'100%',
  }, 
});