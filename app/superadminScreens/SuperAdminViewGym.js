import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import GradientHeader from '../components/GradientHeader'
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
export default class SuperAdminViewGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fitnessCenter: this.props.navigation.state.params.fitnessCenter
    }
  }
  static navigationOptions = {
    title: 'Fitness Center Details',
    header:null
  };
  showLoader(){
    if(this.state.showLoader){
        return(
          <View style={styles.loader}>
              <ActivityIndicator size="large" color="white" />
          </View>
        )
    }
}
  updateName(itemValue){
    var tempCenter = this.state.fitnessCenter;
    tempCenter.name = itemValue
    this.setState({fitnessCenter:tempCenter})
  }
  updateLocation(itemValue){
    var tempCenter = this.state.fitnessCenter;
    tempCenter.location = itemValue
    this.setState({fitnessCenter:tempCenter})
  }
  updateAddress(itemValue){
    var tempCenter = this.state.fitnessCenter;
    tempCenter.address = itemValue
    this.setState({fitnessCenter:tempCenter})
  }
  updateFitnessCenter(){
    this.setState({showLoader:true})
    axios.put('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/fitnessCenters/'+this.state.fitnessCenter.id, this.state.fitnessCenter)
    .then((response) => {
        axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/fitnessCenters/'+this.state.fitnessCenter.id)
        .then((response) => {
            this.setState({fitnessCenter:response.data, showLoader:false})
            alert("Fitness center details updated.")
        })
        .catch((error) => {
            this.setState({showLoader:false})
            alert(error)
        })
    })
    .catch((error) => {
      this.setState({showLoader:false})
        alert(error)
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      {this.showLoader()}
        <GradientHeader title="Fitness Center Details" navigation={this.props.navigation}/>
        <ScrollView>  
          <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter name"
                value={this.state.fitnessCenter.name}
                onChangeText={(name) => this.updateName(name)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter name"
                value={this.state.fitnessCenter.location}
                onChangeText={(location) => this.updateLocation(location)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter name"
                value={this.state.fitnessCenter.address}
                onChangeText={(address) => this.updateAddress(address)}
              />
          </View>
          <TouchableHighlight onPress={() => this.updateFitnessCenter()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Fitness Center</Text>
                </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    height:40,
    padding:5,
    paddingTop: 8,
    marginTop: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize:12
  },
  inputStyle1: {
    flex: 1,
    paddingLeft: 7,
    fontSize:12
  },
  inputStyle2: {
    marginTop: -6,
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
    padding:10,
    paddingTop:0,
    width:width-40,
    backgroundColor:'white'
  },
  inputText:{
    width:width-80,
    borderWidth:0,
    borderBottomColor: '#E62221',
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    height:30
  },
  inputLabel:{
    marginTop: 20,
  },
  loader:{
    flex:1,
    width:width,
    height:"100%",
    position:'absolute',
    zIndex:2,
    backgroundColor:"rgba(0,0,0,0.7)",
    paddingTop:"100%"
  }
});