import React, { Component } from 'react';
import { Avatar, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import CodeInput from 'react-native-confirmation-code-input';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class ForgotPasswordEmailInput extends Component {
    static navigationOptions = {
        title: "FAQ's",
        header:null
      };
      constructor(props) {
        super(props);
        this.state = { 
        }
      }
      sendEmail(){
       if(this.state.email){
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(reg.test(this.state.email) === false){
                alert("Please enter a valid email address")
            }
            else{
                this.setState({showLoader:true})
                axios.get(CONFIG.base_url + 'forgot/'+this.state.email)
                .then((response) => {
                    var user = JSON.stringify(response.data)
                    const { navigate } = this.props.navigation;
                    navigate("VerifyPasswordChange", {member: JSON.stringify(response.data)})
                    this.setState({showLoader:false})
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({showLoader:false})
                    alert(error)
                }) 
            }
       }
       else{
           alert("Please enter yout email address.")
       }
      }
      showLoader(){
            if(this.state.showLoader){
                return(
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )
            }
        }
      render() {
        const { navigate } = this.props.navigation;
        return(
            <KeyboardAvoidingView style={styles.container}>
                <Avatar
                size="small"
                rounded
                icon={{name: 'arrow-back'}}
                onPress={() => navigate('Login')}
                containerStyle={{margin: 30}}
                />
                {this.showLoader()}
                <ScrollView>
                <View style={styles.innerContainer}>
                    <Text style={styles.mainText}>Please enter your registered email address.</Text>
                    <TextInput
                        maxLength={50}
                        style={styles.inputStyle}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email:email})}
                        />
                    <TouchableHighlight onPress={() => this.sendEmail()}
                        underlayColor="transparent">
                        <View style={styles.send}>
                        <Text style={styles.sendText}>Send Magic Code</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                </ScrollView>
              </KeyboardAvoidingView>
              
        )       
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
      headDesign:{
        width:width,
        height:80
      },
      mainText:{
        fontSize:16,
        fontWeight: 'bold',
        color:'grey',
        margin: 20,
        textAlign:'center'
      },
      innerContainer:{
          marginTop: 40,
      },
      inputStyle:{
        width:width-80,
        marginLeft: 40,
        height:40,
        borderBottomColor:'#E62221',
        borderBottomWidth: 1,
        textAlign:'center'
      },
      send:{
        width:width-80,
        height:50,
        backgroundColor: '#E62221',
        borderRadius: 50,
        marginLeft:40,
        alignItems: 'center',
        padding:8,
        paddingTop:15,
        marginTop: 30,
      },
      sendText:{
          color:'white'
      },
    loader:{
        flex:1,
        width:width,
        height:"100%",
        position:'absolute',
        zIndex:100,
        backgroundColor:"rgba(0,0,0,0.7)",
        paddingTop:"100%"
    }
    });