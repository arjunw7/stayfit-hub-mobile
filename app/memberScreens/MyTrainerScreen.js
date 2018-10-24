import React, { Component } from 'react';
import { Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class MyTrainerScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        done:false
      }     
  }
  componentWillMount(){
    AsyncStorage.getItem('member').then((member) => {
      var user  = JSON.parse(member)
      axios.get(CONFIG.base_url + 'members/' + user.id)
      .then((response) => {
            axios.get(response.data._links.trainer.href)
              .then((response2) => {
                  this.setState({trainer:response2.data, done:true})
              })
              .catch((error) => {
                console.log(error)
                this.setState({done:true})
              })
      })
      .catch((error) => {
        console.log(error)
        this.setState({done:true})
      })
      this.setState({user:JSON.parse(member)})
    })
  }
  componentDidMount(){
    
  }
  static navigationOptions = {
    title: 'Trainer Details',
    header:null
  };

  renderTrainer(){
    if(this.state.trainer){
      return(
        <View style={styles.inputForm}>
          <Text style={styles.label}>Name</Text>
           <TextInput
                maxLength={30}
                style={styles.inputStyle}
                value={this.state.trainer.name}
                editable={false}
              />
            <Text style={styles.label}>Email</Text>
            <TextInput
                maxLength={40}
                keyboardType="email-address"
                style={styles.inputStyle}
                value={this.state.trainer.email}
                editable={false}
              />
            <Text style={styles.label}>Gender</Text>
            <TextInput
                maxLength={10}
                style={styles.inputStyle}
                value={this.state.trainer.gender}
                editable={false}
              />
          <Text style={styles.label}>Mobile Number</Text>
            <TextInput
                maxLength={10}
                keyboardType="phone-pad"
                style={styles.inputStyle}
                value={this.state.trainer.phone}
                editable={false}
              />
          </View>
      )
    }
    return(
      <View>
          <Text style={styles.noTrainer}>Trainer not assigned yet.</Text>
      </View>
      
    )
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.done==true){
      return(
        <KeyboardAvoidingView style={styles.container}>
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
        }}>My Trainer</Text>
      </LinearGradient>
      {this.renderTrainer()}
    </KeyboardAvoidingView>
      )
    }
    else{
      return(
        <View>
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
          }}>My Trainer</Text>
          </LinearGradient>
          <View style={styles.loader}>
          <ActivityIndicator size="large" color="grey" />
          </View>
          </View>
      )
    }
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
  inputStyle:{
    width:width-80,
    height:40,
    paddingLeft: 5,
    borderBottomColor:'#E62221',
    borderBottomWidth: 1,
  },
  label:{
    color:'#E62221',
    marginTop: 15,
  },
  login:{
    width:width-60,
    height:50,
    backgroundColor: '#E62221',
    borderRadius: 50,
    marginBottom: 30,
    alignItems: 'center',
    padding:8,
    paddingTop:15,
    marginTop: 20,
  },
  loginText:{
    color:'white'
  },
  inputForm:{
    margin:20,
    padding:20,
    paddingTop:0,
    width:width-40,
    backgroundColor:'white'
  },
  noTrainer:{
    textAlign:'center',
    width:width-80,
    padding:20,
    alignSelf: 'center'
  },
  inputStyleDOB:{
    width:width-40,
    height:40,
    borderBottomColor:'#E62221',
    borderBottomWidth: 1,
  },
  loader:{
    height:"100%",
    backgroundColor:"rgba(255,255,255,0.5)",
    paddingTop:"70%"
  }
});