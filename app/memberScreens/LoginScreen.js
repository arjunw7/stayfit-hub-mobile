import React, { Component } from 'react';
import { Avatar, FormLabel, FormInput, Icon, SocialIcon } from 'react-native-elements';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';

import CONFIG from '../config/config'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    ActivityIndicator,
    AsyncStorage,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
var width = Dimensions.get('window').width;

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state ={
            email:"",
            password:""
        }
    }
    static navigationOptions = {
        title: 'Login',
        header: null
    }
    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            alert("AsyncStorage error")
            console.error('AsyncStorage error: ' + error.message);
        }
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
    initUser(token) {
        this.setState({showLoader: true})
        axios.get('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => {
            const { navigate } = this.props.navigation;
            var login = {
                email:response.data.email,
                password:"master",
                authenticated: true
            }
            axios.post(CONFIG.base_url + 'login?email=' + login.email + "&password=", login.password + "&authenticated=" + login.authenticated)
            .then((response) => {
                if(response.data.error=="OK"){
                    alert(response.data.message)
                    this.setState({showLoader: false})
                    this.userLogout()
                }
                else{
                    var member = JSON.stringify(response.data);
                        this.saveItem('member', member)
                        this.setState({showLoader: false})
                        const navigateAction = NavigationActions.navigate({
                            routeName: 'Dashboard',
                            params: {member: member},
                            action: NavigationActions.navigate({
                                    routeName: 'Dashboard', params:{member:member}}),
                        });
                        this.props.navigation.dispatch(navigateAction);
                }
            })
            .catch((error) => {
                console.log(error)
                alert("Facebook authentication failed.")
                this.setState({showLoader: false})
                this.userLogout()
            }) 
        })
        .catch((error) => {
            alert("Facebook authentication failed.")
            this.setState({showLoader: false})
            this.userLogout()
        }) 
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
    login(){
        this.setState({showLoader: true})
        const { navigate } = this.props.navigation;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(!this.state.email || !this.state.password){
            alert("Please enter email and password.")
            this.setState({showLoader: false})
        }
        else if(reg.test(this.state.email) === false){
            alert("Please enter a valid email address")
            this.setState({showLoader: false})
        }
        else{
            var login = {
                username: this.state.email,
                password:this.state.password
            }
            axios.post(CONFIG.base_url + 'login?email='+this.state.email+"&password="+this.state.password+"&authenticated=false")
            .then((response) => {
                if(response.data.error=="OK"){
                    alert(response.data.message)
                    this.setState({showLoader: false})
                }
                else{
                    var member = JSON.stringify(response.data);
                    this.saveItem('member', member)
                    const navigateAction = NavigationActions.navigate({
                        routeName: 'Dashboard',
                        params: {member: member},
                        action: NavigationActions.navigate({
                                routeName: 'Dashboard', params:{member:member}}),
                    });
                    this.props.navigation.dispatch(navigateAction);
                    // if(response.data.isEmailVerified==true){
                    //     this.saveItem('member', member)
                    //     const navigateAction = NavigationActions.navigate({
                    //         routeName: 'Dashboard',
                    //         params: {member: member},
                    //         action: NavigationActions.navigate({
                    //                 routeName: 'Dashboard', params:{member:member}}),
                    //     });
                    //     this.props.navigation.dispatch(navigateAction);
                    // }
                    // else{
                    //     navigate("EmailVerification", {member:member})
                    // }
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
            
        }
        
    }
    render() {
        const { navigate } = this.props.navigation;
        return ( 
        <KeyboardAvoidingView style = { styles.container } >
        
        {this.showLoader()}
            <Avatar 
                size = "small"
                rounded 
                icon = {{ name: 'arrow-back' } }
                onPress = {() => navigate('Home') }
                containerStyle = {{ margin: 30 } }
            /> 
            <ScrollView>
            <View style = { styles.innerContainer } >
            <Text style = { styles.mainText } > Welcome Back </Text> 
            <Text style = { styles.subText } > It 's good to see you again.</Text> 
            <View style = { styles.facebook }>
            <LoginButton readPermissions = {['public_profile', 'email'] }
                underlayColor="transparent"
                onLoginFinished = {
                    (error, result) => {
                        if (error) {
                            alert("An error occured while logging in.");
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    AccessToken.getCurrentAccessToken().then((data) => {
                                        const { accessToken } = data
                                        this.initUser(accessToken)
                                      })
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
                }} >
                <Text style = {{
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        padding: 8,
                        color: '#b3b3b3'
                    }} >
                or </Text> 
            </View> 
                <View style = { styles.form } >
                    <FormLabel labelStyle = {{
                            color: '#E62221',
                            fontWeight: '300'}
                    }> Your email </FormLabel> 
                    <TextInput
                        maxLength={30}
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        value={this.state.email}
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
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password:password})}
                        />
                    <SocialIcon onPress = {() => this.login() }
                        title = 'Log in with Email'
                        button type = 'twitch'
                        style = { styles.signup }
                    /> 
                    <Text style = { styles.tc } onPress = {() => navigate("ForgotPasswordEmailInput") }>
                        Forgot password ?
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
        marginTop: 30
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
        padding: 20,
        backgroundColor:'transparent'
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