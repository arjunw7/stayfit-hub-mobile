import React, { Component } from 'react';
import { Avatar, FormLabel, FormInput, Icon, SocialIcon } from 'react-native-elements';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { LoginManager} from 'react-native-fbsdk';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    AsyncStorage,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class ConnectEmailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            member: JSON.parse(this.props.navigation.state.params.member)
        }
    }
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
    showLoader(){
        if(this.state.showLoader){
            return(
              <View style={styles.loader}>
                  <ActivityIndicator size="large" color="white" />
              </View>
            )
        }
      }

    initUser(token) {
        this.setState({showLoader: true})
        axios.get('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => {
            const { navigate } = this.props.navigation;
            var tempMember = this.state.member;
            tempMember.email = response.data.email;
            tempMember.password = "";
            tempMember.designation = "Member"
            axios.post(CONFIG.base_url + 'signup/facebook', tempMember)
              .then((response) => {
                  if(response.data.error=="OK"){
                      alert(response.data.message)
                      console.log(response)
                  }
                  else {
                    var member = JSON.stringify(response.data);
                    this.saveItem('member', member)
                    navigate("Dashboard", {member:member})
                  }
                this.setState({showLoader: false})
              })
              .catch((error) => {
                  alert("The email is already registerd. Please login with the same email to continue.")
                  LoginManager.logOut()
                  navigate("Login")
                  this.setState({showLoader: false})
              }) 
        })
        .catch((error) => {
            alert(JSON.stringify(error))
            console.log(error)
            LoginManager.logOut()
            this.setState({showLoader: false})
        }) 
      }
    signup(){
        this.setState({showLoader: true})
        const { navigate } = this.props.navigation;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regMob = /[2-9]{2}\d{8}/
        if(!this.state.email || !this.state.password || !this.state.phone){
            alert("Please fill all the details.")
            this.setState({showLoader: false})
        }
        else if(this.state.phone.length<10){
            alert("Please enter a valid Mobile Number")
            this.setState({showLoader: false})
        }
        else if(this.state.password.length<8){
            alert("Password should be minimum 8 characters.")
            this.setState({showLoader: false})
        } 
        else if(reg.test(this.state.email) === false){
            alert("Please enter a valid email address")
            this.setState({showLoader: false})
        } 
        else{
            var tempMember = this.state.member;
            tempMember.email = this.state.email;
            tempMember.password = this.state.password;
            tempMember.phone = this.state.phone;
            tempMember.designation = "Member"
            axios.post(CONFIG.base_url + 'signup', tempMember)
              .then((response) => {
                  if(response.data.error=="OK"){
                      alert(response.data.message)
                  }
                  else {
                    var member = JSON.stringify(response.data);
                    this.saveItem('member', member)
                    navigate("Dashboard", {member:member})
                    }
                this.setState({showLoader: false})

              })
              .catch((error) => {
                  console.log(error)
                  alert(error) 
                  this.setState({showLoader: false})
              })
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return ( 
        <KeyboardAvoidingView style = {styles.container }>
            {this.showLoader()}
            <Avatar
                size="small"
                rounded
                icon={{name: 'arrow-back'}}
                onPress={() => navigate('GoalSelection')}
                containerStyle={{margin: 30}}
                />
            <ScrollView>
            <View style = { styles.innerContainer } >
                    <Text style = { styles.mainText }> Register an Email </Text>

                    <Text style = { styles.subText }>Connect an email to your account so that you can experience &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; the personalized app across all your devices. </Text>

                    <View  style = { styles.facebook }>
                        <LoginButton 
                        readPermissions = {['public_profile', 'email'] }
                            onLoginFinished = {
                                (error, result) => {
                                    if (error) {
                                        alert("An error occured while logging in.");
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {
                                        AccessToken.getCurrentAccessToken().then((data) => {
                                                const { accessToken } = data
                                                this.initUser(accessToken)
                                            }
                                        )
                                    }
                                }
                            }
                            onLogoutFinished = {
                                () => console.log("logout.") }
                            /> 
                    </View>

                    <View style = {{
                            borderBottomColor: '#e4e4e4',
                            borderBottomWidth: 1,
                            width: width,
                            alignSelf: 'center'
                        }}>
                        <Text style = {{
                                marginBottom: -10,
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                padding: 8,
                                color: '#b3b3b3'
                            }}>
                        or </Text> 
                    </View> 
                <View style = { styles.form } >
                    <FormLabel labelStyle = {{
                            color: '#E62221',
                            fontWeight: '300'
                        }}> Your email </FormLabel> 
                     <TextInput
                        maxLength={100}
                        style={styles.inputStyle}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({email:email})}
                        />
                    <FormLabel labelStyle = {{
                            color: '#E62221',
                            fontWeight: '300'
                        }}> Your password </FormLabel> 
                    <TextInput
                        maxLength={30}
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password:password})}
                        />
                    <FormLabel labelStyle = {{
                            color: '#E62221',
                            fontWeight: '300'
                        }} > Your Mobile Number </FormLabel> 
                    <TextInput
                        maxLength={10}
                        style={styles.inputStyle}
                        keyboardType="number-pad"
                        onChangeText={(phone) => this.setState({phone:phone})}
                        />
                    <SocialIcon onPress = {() => this.signup() }
                        title = 'Sign up with Email'
                        button type = 'twitch'
                        style = { styles.signup }
                    /> 
                    <Text style = { styles.tc }>
                    By continuing, you agree to Stayfit’ s Terms of Service 
                    </Text> 
                </View>
        </View>
            </ScrollView>
        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainText: {
        fontWeight: "700"
    },
    subText: {
        fontWeight: "300",
        textAlign: 'justify',
        paddingRight: 40,
        fontSize: 10,
        paddingLeft: 40,
        alignSelf: 'center',
        marginTop: 10
    },
    tc: {
        fontWeight: "300",
        textAlign: 'justify',
        paddingRight: 20,
        fontSize: 10,
        paddingLeft: 20,
        marginTop: -20,
        alignSelf: 'center'
    },
    facebook: {
        width: 300,
        height: 50,
        backgroundColor: '#4968ad',
        borderRadius: 60,
        marginBottom: 30,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        marginTop: 30,
    },
    signup: {
        width: 300,
        height: 50,
        backgroundColor: '#E62221',
        borderRadius: 60,
        marginBottom: 30,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 8,
        paddingTop: 15,
        marginTop: 30
    },
    form: {
        flex: 3,
        width: width,
        alignSelf: 'center',
        padding: 20
    },
    heightInputs: {
        width: width,
        flexWrap: 'wrap',
        flexDirection: 'row',
        flex: 1,
    },
    label: {
        color: '#E62221'
    },
    input: {
        borderColor: '#E62221'
    },
    nextButton: {
        width: 300,
        height: 50,
        backgroundColor: '#E62221',
        borderRadius: 60,
        marginBottom: 30,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 8,
        paddingTop: 15,
        marginTop: 30
    },
    inputStyle:{
        width:width-80,
        marginLeft: 20,
        height:40,
        borderBottomColor:'#E62221',
        borderBottomWidth: 1,
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