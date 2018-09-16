import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
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
  },
  {
    title: "Logout",
    icon: 'rotate-right',
    route: 'Home',
    member: global.member
  }

]
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
        email:"arjunw7@gmail.com",
        password:"13bcb0062", 
        member:JSON.parse(global.member),
        memberString: global.member
    }
    AsyncStorage.getItem('member').then((value) => this.setState({ 'memberID': value })).done();
}
  componentDidMount(){
     
  }
  static navigationOptions = {
    title: 'Profile',
    header: null
  };
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
            <View style={styles.profileHead}>
              <Text style={{alignSelf:'flex-start', fontSize:14}}>{this.state.member.name}</Text>
              <Text style={{color:'#E62221'}} onPress={() =>navigate('HealthProfile', {user: this.state.memberString})}>MY HEALTH PROFILE ></Text>
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
            </View>
            </View>             
        </View>
      </View>
    );
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
  }
});