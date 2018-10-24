import React, { Component } from 'react';
import { Avatar, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import CodeInput from 'react-native-confirmation-code-input';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class EmailVerification extends Component {
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
      verifyCode(code){
          if(code==this.state.member.magicPin){
            this.setState({showLoader:true})
            var member = this.state.member
            member.isEmailVerified = true;
            axios.put(CONFIG.base_url + 'members/'+member.id, member)
            .then((response) => {
                member = JSON.stringify(response.data)
                this.saveItem('member', member)
                alert("Email address verified.")
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Dashboard',
                    params: {member: member},
                    action: NavigationActions.navigate({
                            routeName: 'Dashboard', params:{member:member}}),
                });
                this.props.navigation.dispatch(navigateAction);
            })
            .catch((error) => {
                console.log(error)
                this.setState({showLoader:false})
                alert(error)
            })    
          }
          else{
              alert("You have entered incorrect one time password.")
          }
      }
      resendCode(){
        this.setState({showLoader:true})
        axios.get(CONFIG.base_url + 'resend/'+this.state.member.email)
        .then((response) => {
            var user = JSON.stringify(response.data)
            this.setState({member: response.data, showLoader:false})
        })
        .catch((error) => {
            console.log(error)
            this.setState({showLoader:false})
            alert(error)
        })  
      }
      render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
            {this.showLoader()}
              <View style={styles.innerContainer}>
              <Icon
                name='paper-plane-o'
                type='font-awesome'
                size={48}
                color='#E62221'
                />
                <Text style={styles.mainText}>Please enter the magic code sent on your email address.</Text>
              <CodeInput
                ref="codeInputRef1"
                secureTextEntry
                className={'border-b'}
                space={5}
                size={30}
                codeLength={6}
                inputPosition='center'
                containerStyle={{ marginTop: 30, }}
                keyboardType="numeric"
                codeInputStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'grey', color:'#E62221', fontSize:22  }}
                onFulfill={(code) => this.verifyCode(code)}
                />
                <Text style={styles.mainText2} onPress = {() => this.resendCode() }>Resend</Text>
            </View>
              </View>
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
      mainText2:{
        fontSize:16,
        fontWeight: 'bold',
        color:'grey',
        margin: 20,
        textAlign:'center',
        marginTop:40,
        paddingTop: 40,
      },
      innerContainer:{
          marginTop: 40,
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