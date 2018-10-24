import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
export default class SupportScreen extends Component {
    static navigationOptions = {
        title: 'Support',
        header:null
      };
      constructor(props) {
        super(props);
        this.state = {
          subject: '',
          message: ''
        }
      }
      componentWillMount(){
        AsyncStorage.getItem('member').then((member) => {
          this.setState({user:JSON.parse(member)})
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
      submit(){
        this.setState({showLoader: true})
        if(!this.state.subject || !this.state.message){
          alert("Please enter all the details.")
          this.setState({showLoader: false})
        }
        else if(this.state.message.length<10){
          alert("Message too short")
          this.setState({showLoader: false})
        }
        else{
          var support = {
            subject:this.state.subject,
            message:this.state.message
          }
          axios.post(CONFIG.base_url + 'supports/', support)
          .then((response) => {
              alert("Query submitted successfully. Our team will get back to you ASAP.")
              const { navigate } = this.props.navigation;
              navigate("Dashboard")
              this.setState({showLoader: false})
          })
          .catch((error) => {
              alert("Your query could not be submitted. Please try again later.")
              this.setState({showLoader: false})
          })
        }
      }
      render() {
        const { navigate } = this.props.navigation;
        return (
          <KeyboardAvoidingView style={styles.container}>
              {this.showLoader()}
              <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
              <Avatar
                size="small"
                rounded
                icon={{name: 'arrow-back'}}
                onPress={() => navigate('Profile')}
                containerStyle={{margin: 30}}
              />
              <Text style={{
                fontSize:24,
                color:'white',
                marginLeft:30,
                marginTop:-10
              }}>Get in touch with us</Text>
            </LinearGradient>
            <ScrollView>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                    style={styles.inputStyle}
                    value={this.state.subject}
                    onChangeText={(subject) => this.setState({subject:subject})}
                  />
              <Text style={styles.label}>Your Message</Text>
              <TextInput
                    style={styles.inputStyle}
                    value={this.state.message}
                    onChangeText={(message) => this.setState({message:message})}
                  />
            </View>
            <TouchableHighlight onPress={() => this.submit()}
                underlayColor="transparent">
                <View style={styles.submitButton}>
                    <Text style={styles.submitText}>Send</Text>
                </View>
            </TouchableHighlight>
            <Text style={{
              textAlign:'center',
              marginTop:20
            }}>Follow us for latest updates.</Text>
            <View style={styles.socialMedia}>
              <Icon
                reverse
                name='facebook'
                type='zocial'
                color='white'
                containerStyle={{
                  backgroundColor: '#E62221'
                }}
                />
                <Icon
                  reverse
                  name='instagram'
                  type='zocial'
                  color='white'
                  containerStyle={{
                  backgroundColor: '#E62221'
                }}
                />
                <Icon
                  reverse
                  name='twitter'
                  type='zocial'
                  color='white'
                  containerStyle={{
                  backgroundColor: '#E62221'
                }}
                />
            </View>
            <View style={styles.contact}>
             <Icon
                  name='phone'
                  type='font-awesome'
                  color='grey'/>
                <Text>
                &nbsp;&nbsp;+91 (080) - 4121 3333</Text>
            </View>
            <View style={styles.address}>
              <Text style={styles.addresstext}>Stayfit Towers</Text>
              <Text style={styles.addresstext}># 580, Ground Floor, 11th Main</Text>
              <Text style={styles.addresstext}>36th Cross, 5th Block, Jayanagar</Text>
              <Text style={styles.addresstext}>Bangalore - 560 041, INDIA.</Text>
            </View>
            <Text style={styles.disclaimer}>All queies will be answerd directly through mail.</Text>
            </ScrollView>
          </KeyboardAvoidingView>
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
        marginLeft:30,
        marginRight:30
      },
      formContainer:{
        width:width-60,
        margin:30,
        marginTop: 10,
      },
      label:{
        fontSize:16,
        marginBottom:5,
        marginTop: 20,
      },
      inputStyle:{
        borderBottomColor: '#E62221',
        borderBottomWidth: 1,
        backgroundColor:'transparent',
        fontSize: 16,
        color:'grey',
        padding:10
      },
      submitText:{
        color:'white',
        fontSize:14
      },
      disclaimer:{
        width:width,
        color:'grey',
        fontStyle:'italic',
        paddingBottom: 5,
        fontSize:10,
        alignSelf: 'center',
        alignItems:'center',
        textAlign:'center'
      },
      socialMedia:{
        flex:1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      },
      address:{
        marginLeft:10,
        marginBottom:20
      },
      addresstext:{
        fontSize:10,
        color:'grey',
        textAlign:'center'
      },
      contact:{
        flex:1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      },
      ploader:{
        flex:1,
        width:width,
        height:"100%",
        position:'absolute',
        zIndex:100,
        backgroundColor:"rgba(255,255,255,0.7)",
        paddingTop:"70%",
        marginTop:140
      }
    });