import React, { Component } from 'react';
import { Avatar, SearchBar, ListItem, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class SuperAdminMemberHome extends Component {
    constructor(props) {
        super(props);
        this.state ={
          memberInput:''
        }
        axios.get(CONFIG.base_url + 'members')
        .then((response) => {
            this.setState({members:response.data._embedded.members})
        })
        .catch((error) => {
            alert(error)
        })
    }
    static navigationOptions = {
        title: 'Members',
        header: null
    }
    filterMembers(){
      this.setState({
        memberInput: this.search,
      })
    }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.members){
      return (
        <View style={styles.container}>
        <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
          <Avatar
            size="small"
            rounded
            icon={{name: 'arrow-back'}}
            onPress={() => navigate('SuperAdminHome')}
            containerStyle={{margin: 30}}
          />
          <Text style={{
            fontSize:24,
            color:'white',
            marginLeft:30,
            marginTop:-10
          }}>Members</Text>
        </LinearGradient>
       <Icon raised reverse name='add' color='#E62221'
            containerStyle={{
              position:'absolute', 
              bottom:10,
              zIndex:2,
              right:10,
              shadowColor: '#7f7f7f',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 5
            }}
            onPress={() => navigate('SuperAdminAddMember')}
          />
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          containerStyle={{width:width, backgroundColor:'#f7f7f7'}}
          inputStyle={{backgroundColor:'white'}}
          inputContainerStyle={{backgroundColor:'white'}}
          onChangeText={(memberInput) => this.setState({memberInput})}
          placeholder='Search member...' />
          <ScrollView>
          {
            this.state.members
            .filter(i => this.state.members === '' || i.name.includes(this.state.memberInput))
            .map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                subtitle={item.email}
                containerStyle={{width:width}}
                leftIcon={{ name: 'av-timer'}}
                titleStyle={{fontSize:14}}
                subtitleStyle={{fontSize:12}}
                onPress={() => navigate('SuperAdminViewMember', {member: JSON.stringify(item)})}
              />
            ))
          }
          </ScrollView>
     </View>
    )
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
      backgroundColor: '#F5FCFF',
      width:width
    },
    headDesign:{
      width:width,
      height:140
    },
    mainIcons:{
      width:width-40,
      margin:10,
      marginLeft: 5,
      flex:1,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    mainIcon:{
      width:width/3-20,
      margin:10,
      paddingTop:20,
      paddingBottom:20,
      borderRadius:7,
      shadowOffset:{  width: 0,  height: 0,  },
      shadowColor: 'grey',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      backgroundColor:'white',
      height:100
    },
    iconText:{
      fontSize:12,
      color:'#E62221',
      alignSelf:'center',
      alignItems:'center',
      marginTop:10
    },
    loader:{
      marginTop:'100%',
    }
  });