import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  Linking,
  Vibration,
} from 'react-native';
import Camera from 'react-native-camera';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
export default class AttendanceScanner extends Component {
    static navigationOptions = {
        title: 'Attendance Scan',
        header:null
    };
    constructor(props) {
        super(props);
            this.state = {
              appointment: JSON.parse(this.props.navigation.state.params.appointment),
              scanning: true,
              cameraType: Camera.constants.Type.back
        }
        
    }
    
    
    componentDidMount(){
      AsyncStorage.getItem('member').then((member) => {
        this.setState({user: JSON.parse(member)})
      })
    }
    getInitialState() {
        return {
            scanning: true,
            cameraType: Camera.constants.Type.back
        }
    }
    _handleBarCodeRead(e) {
        this.setState({scanning: false});
        if(e.data==('http://'+this.state.appointment.fitnessCenter.name)){
          var data = {
            timeAttended:new Date(),
            date: this.state.appointment.date,
            timeSlot: this.state.appointment.timeSlot
          }
          axios.put(CONFIG.base_url + 'appointments/'+this.state.appointment.id, data)
              .then((response) => {
                 const { navigate } = this.props.navigation;
                 navigate("Plan")
                 alert("Attendance has been updated.")
              })
              .catch((error) => {
                  alert("Please scan a valid QR code.")
                  const { navigate } = this.props.navigation;
                  navigate("Plan")
              }) 
        }
        else{
          alert("Please scan a valid QR code.")
          const { navigate } = this.props.navigation;
          navigate("Plan")
        }
        return;
    }

    componentWillMount(){
        AsyncStorage.getItem('member').then((member) => {
            this.setState({user:JSON.parse(member)})
        })
    }
      render() {
        const { navigate } = this.props.navigation;
        if(this.state.scanning){
            return(
              <View style={styles.container}>
              <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
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
                marginTop:-10
              }}>Attendance Update</Text>
            </LinearGradient>
            <View style={styles.rectangleContainer}>
            <Camera style={styles.camera} type={this.state.cameraType} onBarCodeRead={this._handleBarCodeRead.bind(this)}>
                <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}/>
                </View>            
            </Camera>
            </View>
          </View>
            )
        }
          return (
            <View style={styles.container}>
                <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
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
                  marginTop:-10
                }}>Attendance Update</Text>
              </LinearGradient>
              <View style={styles.rectangleContainer}>
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
      headDesign:{
        width:width,
        height:140
      },
      submitButton:{
        width:width-60,
        height:50,
        backgroundColor: '#E62221',
        borderRadius: 60,
        marginBottom: 10,
        alignItems: 'center',
        alignSelf: 'center',
        padding:8,
        paddingTop:15,
        marginTop: 15,
        marginLeft:30,
        marginRight:30
      },
      
      submitText:{
        color:'white',
        fontSize:14
      },
      centerText: {
        flex: 1,
        width:width,
        fontSize: 12,
        padding: 32,
        color: '#777',
    },
    camera: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
    }, 
    rectangleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },

    rectangle: {
      height: 250,
      width: 250,
      borderWidth: 2,
      borderColor: '#00FF00',
      backgroundColor: 'transparent',
    },  
    });