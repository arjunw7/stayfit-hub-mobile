import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import { Avatar, Icon } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  ScrollView,
  Image,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
export default class AllAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
}
componentDidMount(){
  AsyncStorage.getItem('member').then((member) => {
    this.setState({user:JSON.parse(member)})
    this.getAppointments(JSON.parse(member).id)
  })
}
getAppointments(id){
   axios.get(CONFIG.base_url + 'members/' +id + '/appointments')
    .then((response) => {
          var fcList = []
          for(var i=0; i<response.data.length; i++){
            fcList.push(response.data[i].fitnessCenter)
          }
          this.setState({appointments:response.data, fitnessCenters: fcList})
    })
    .catch((error) => {
        console.log(error)
    })
}

renderCloseButton(item){
  if(item.timeAttended==null){
    return(
      <Icon containerStyle={styles.delAppointment} color="#353535" name='close' onPress={() => this.deleteAppointment(item.id)}/>
    )
  }
}

renderAppointments(){
  const { navigate } = this.props.navigation;
  if(this.state.appointments.length>0){
    return(
        <View>
            {
                this.state.appointments
                .map((item, i) => (
                    <LinearGradient key={i} colors={['#f7f7f7', '#f7f7f7', '#f7f7f7']} style={styles.appointmentBox}>
                        <View style={{flexWrap: 'wrap',flexDirection: 'row'}}>
                          <Icon name='calendar' size={14} type='simple-line-icon' color='#353535'/>
                          <Text style={styles.appDate}>&nbsp;&nbsp;{Moment(item.date).format('DD MMM, ddd')}</Text>
                        </View>
                       <Text style={styles.appTime}>{item.timeSlot}</Text>
                       <Text style={styles.appLocation}>{this.state.fitnessCenters[i].name + ', ' + this.state.fitnessCenters[i].location} </Text>
                       {this.renderCloseButton(item)}
                    </LinearGradient>
                ))
            }
        </View>
    )
  }
  else{
      return(
        <View>
            <Text style={{marginLeft:25, fontSize:18, marginTop:10, marginBottom:10, fontWeight:'bold'}}>
                <Text>No upcoming appointments!</Text>
            </Text>
        </View>
      )
  }
}

  static navigationOptions = {
    title: 'All Appointments',
    header: null
  };

  deleteAppointment(id){
    Alert.alert(
      'Cancel appointment',
      'Are you sure you want to cancel the appointment?',
      [
        {text: 'No', onPress: () => console.log('Ask me later pressed')},
        {text: 'Yes', onPress: () => this.cancelAppointment(id)},
      ],
      { cancelable: true }
    )
  }
  cancelAppointment(id){
    axios.delete(CONFIG.base_url +'appointments/' + id)
    .then((response) => {
      alert("Appointment has been cancelled.")
      this.getAppointments(this.state.user.id)
    })
    .catch((error) => {
        alert(error)
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.appointments && this.state.fitnessCenters){
      return (
        <View style={styles.container}>
          <Image source={require('../assets/head.jpg')}
                style={{width:width, height:200, position: 'absolute', top:0, zIndex:1}}
                resizeMode="cover">
            </Image>
            <View style={styles.head}>
                <Avatar
                    size="small"
                    rounded
                    icon={{name: 'arrow-back'}}
                    onPress={() => navigate('Plan')}
                    containerStyle={{margin: 30}}
                />
                <Text style={{
                    fontSize:24,
                    color:'white',
                    marginLeft:30,
                    marginTop:30
                }}>Upcoming Appointments</Text>
            </View>
          <View style={styles.innerContainer}>
              <ScrollView>
                  {this.renderAppointments()}
              </ScrollView>
          </View>
        </View>
      );
    }
    return(
        
        <View style={styles.container}>
        <Image source={require('../assets/head.jpg')}
              style={{width:width, height:200, position: 'absolute', top:0, zIndex:1}}
              resizeMode="cover">
          </Image>
          <View style={styles.head}>
              <Avatar
                  size="small"
                  rounded
                  icon={{name: 'arrow-back'}}
                  onPress={() => navigate('Plan')}
                  containerStyle={{margin: 30}}
              />
              <Text style={{
                  fontSize:24,
                  color:'white',
                  marginLeft:30,
                  marginTop:30
              }}>Upcoming Appointments</Text>
          </View>
        <View style={styles.innerContainer}>
          <View style={styles.loader}>
              <ActivityIndicator size="large" color="black" />
          </View>
        </View>
      </View>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer:{
    justifyContent: 'center',
    marginTop: 210,
  },
  head: {
    position:'absolute',
    top:5,
    left:5,
    zIndex:100
  },
  closeButton:{
      width:30,
      height:30,
      alignSelf:'flex-end'
  },
  headDesign:{
    width:width,
    height:120
  },
  welcomeName:{
    fontSize:26,
    fontWeight: 'bold',
    color:'white',
    margin:30,
  },
  appointmentBox:{
    width:width-40,
    margin:20,
    marginTop:5,
    marginBottom:10,
    borderRadius:7,
    padding:10,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 7,
  },
  submitButton2:{
    backgroundColor:'#35991a',
    right:0,
    bottom:0,
    marginLeft: width-90,
    marginTop: -40,
  },
  appDate:{
    fontSize:16,
    color:'#353535'
  },
  appTime:{
    fontSize:14,
    color:'#353535',
    marginTop:5
  },
  appLocation:{
    fontSize:12,
    color:'#353535',
  },
  appButton:{
    backgroundColor:'transparent',
    width:"auto",
    borderRadius:5,
    marginLeft: 25
  },
  appText:{
    fontSize:14,
    color:'grey'
  },
  delAppointment:{
    position:'absolute',
    top:10,
    right:10
  },
  loader:{
    marginTop:'50%',
  }
});