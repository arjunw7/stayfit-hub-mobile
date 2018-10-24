import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import Moment from 'moment';
import axios from 'axios';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
export default class ActivePacksScreen extends Component {
    static navigationOptions = {
        title: 'Active Packs/Subscriptions',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
          membershipName:'',
          endDate: '',
          done:false
        }
        AsyncStorage.getItem('member').then((member) => {
          this.setState({
            user:JSON.parse(member),
          })
          var user = JSON.parse(member)
          this.setState({showLoader:true})
          axios.get(CONFIG.base_url + 'members/' + user.id + '/membership')
              .then((response) => {
                axios.get(CONFIG.base_url + 'memberships/' + response.data.id + '/membershipType')
                .then((res) => {
                  var planDetails = res.data
                  this.setState({
                    endDate: response.data.endDate,
                    membershipName: planDetails.description,
                    duration: planDetails.duration!=365?(planDetails.duration/30):12,
                    done:true,
                    showLoader:false
                  })
                })
                .catch((error) => {
                    this.setState({
                      done:true,
                      showLoader:false,
                      duration:-1
                    })
                    console.log(error)
                })
  
              })
              .catch((error) => {
                  console.log(error)
                  this.setState({
                    done:true,
                    showLoader:false,
                    duration:-1
                  })
              })
        })
    }
    showLoader(){
        if(this.state.showLoader){
            return(
              <View style={styles.ploader}>
                  <ActivityIndicator size="large" color="grey" />
              </View>
            )
        }
    }
    renderMembership(){
      if(this.state.duration==1){
        return(
          <Image source = { require('../assets/memberOption4.jpg') }
          style = { styles.optionLogo }
          resizeMode = "contain" >
          </Image> 
        )
      }
      else if(this.state.duration==3){
          return(
            <Image source = { require('../assets/memberOption1.jpg') }
            style = { styles.optionLogo }
            resizeMode = "contain" >
            </Image>
          )
      }
      else if(this.state.duration==6){
          return(
            <Image source = { require('../assets/memberOption2.jpg') }
            style = { styles.optionLogo }
            resizeMode = "contain" >
            </Image> 
          )
      }
      else if(this.state.duration==12){
          return(
            <Image source = { require('../assets/memberOption3.jpg') }
            style = { styles.optionLogo }
            resizeMode = "contain" >
            </Image> 
          )
      }
      else if(this.state.duration==-1){
        return(
          <Text style = { styles.packType }>You do not have any active membership.</Text>
        )
      }
    }
    render() {
        const { navigate } = this.props.navigation;
          return ( 
            <View style = { styles.container }>
            {this.showLoader()}
              <LinearGradient colors = {
                  ['#b24d2e', '#b23525', '#E62221'] }
              style = { styles.headDesign }>
              <Avatar 
              size = "small"
              rounded icon = {
              {name: 'arrow-back' }}
              onPress = {
                  () => navigate('Profile') }
              containerStyle = {
                  { margin: 30 } }
              /> 
              <Text style = {{
                      fontSize: 22,
                      color: 'white',
                      marginLeft: 30,
                      marginTop: -10
                  }} > Active Packs / Subscriptions 
              </Text> 
              </LinearGradient> 
              <View>
              <View style = { styles.box } >
                {this.renderMembership()}
                <Text style = { styles.packType } > {this.state.membershipName}</Text> 
                <Text style = { styles.packType } > {this.state.endDate?"Valid till: "+ Moment(this.state.endDate).format('DD MMM, YYYY'): ' '}</Text> 
              </View> 
              </View> 
              </View>
          );
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    headDesign: {
        width: width,
        height: 140
    },
    pack: {
        width: width - 40,
        margin: 20,
        borderRadius: 10,
        padding: 20,
    },
    packName: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginTop: 2
    },
    packType: {
        fontSize: 14,
        fontWeight: '300',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginLeft: 25
    },
    optionLogo: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 5,
        marginRight: width / 2 - 20,
    },
    box: {
        flexBasis: width / 2 + 100,
        height: 250,
        marginTop: 20,
        borderRadius: 12,
    },
    loader:{
      marginTop:'100%',
    },
    ploader:{
        flex:1,
        width:width,
        height:"100%",
        position:'absolute',
        zIndex:100,
        backgroundColor:"rgba(0,0,0,0)",
        paddingTop:"60%",
        marginTop:140
      }
});