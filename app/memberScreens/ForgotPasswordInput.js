import React, { Component } from 'react';
import { Avatar, FormLabel } from 'react-native-elements';
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
export default class ForgotPasswordInput extends Component {
    static navigationOptions = {
        title: "FAQ's",
        header:null
      };
      constructor(props) {
        super(props);
        this.state = { 
            member: JSON.parse(this.props.navigation.state.params.member)
        }
      }
      updatePassword(){
        this.setState({showLoader: true})
        if(!this.state.password1 || !this.state.password2){
            alert("Please enter the password twice to verify.")
            this.setState({showLoader:false})
        }
        else if(this.state.password1 != this.state.password2){
            alert("Passwords are not matching.")
            this.setState({showLoader:false})
        }
        else if(this.state.password1.length<8){
            alert("Password length must be atleast 8 characters.")
            this.setState({showLoader:false})
        }
        else{
            var member = this.state.member
            member.password = this.state.password1;
            axios.put(CONFIG.base_url + 'members/'+member.id, member)
            .then((response) => {
                var user = JSON.stringify(response.data)
                alert("Password changed successfully.")
                this.setState({showLoader:false})
                const { navigate } = this.props.navigation;
                navigate("Login")
            })
            .catch((error) => {
                console.log(error)
                this.setState({showLoader:false})
                alert(error)
            }) 
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
                    <FormLabel labelStyle = {{
                            color: '#E62221',
                            fontWeight: '300',
                            marginLeft:40}
                    }> Enter new password </FormLabel> 
                    <TextInput
                        maxLength={50}
                        style={styles.inputStyle}
                        value={this.state.password1}
                        secureTextEntry={true}
                        onChangeText={(password1) => this.setState({password1:password1})}
                        />
                        <FormLabel labelStyle = {{
                            color: '#E62221',
                            fontWeight: '300',
                        marginLeft:40}
                    }> Enter new password again </FormLabel> 
                    <TextInput
                        maxLength={50}
                        style={styles.inputStyle}
                        value={this.state.password2}
                        secureTextEntry={true}
                        onChangeText={(password2) => this.setState({password2:password2})}
                        />
                    <TouchableHighlight onPress={() => this.updatePassword()}
                        underlayColor="transparent">
                        <View style={styles.send}>
                        <Text style={styles.sendText}>Update password</Text>
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