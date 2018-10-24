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
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class VerifyPasswordChange extends Component {
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
      verifyCode(code){
        if(code==this.state.member.magicPin){
          var member = this.state.member
          console.log(member)
          const { navigate } = this.props.navigation;
          navigate("ForgotPasswordInput", {member:JSON.stringify(member)})    
        }
        else{
            alert("You have entered incorrect one time password.")
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
                    onPress={() => navigate('ForgotPasswordEmailInput')}
                    containerStyle={{margin: 30}}
                    />
                    {this.showLoader()}
                    <ScrollView>
                <View style={styles.innerContainer}>
                <Icon
                    name='paper-plane-o'
                    type='font-awesome'
                    size={48}
                    color='#E62221'
                    />
                <Text style={styles.mainText}>Please enter the one time password sent on your email address.</Text>
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