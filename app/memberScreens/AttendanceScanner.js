import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  TouchableOpacity,
  Linking
} from 'react-native';
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
        }
    }
    onSuccess(e) {
        Linking
        .openURL(e.data)
        .catch(err => console.error('An error occured', err));
    }

    componentWillMount(){
        AsyncStorage.getItem('member').then((member) => {
            this.setState({user:JSON.parse(member)})
        })
    }
      render() {
        const { navigate } = this.props.navigation;
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
            <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                topContent={
                <Text style={styles.centerText}>
                   Scan the QR code at the branch to update your sttendance.
                </Text>
                }
            />
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
    }
    });