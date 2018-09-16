import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import GradientHeader from '../components/GradientHeader'
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown';
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
export default class SuperAdminAddMember extends Component {
  constructor(props) {
    super(props);
    this.state ={
        name:'Elon',
        email:'elon@yahoo.in',
        phone:'9943305678',
        gender:'Male',
        dob: '',
        fitnessCenter: '',
        trainer: ''
  }
  axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/trainers')
    .then((response) => {
        console.log(response)
        this.setState({trainersList:response.data._embedded.trainers})
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })
  axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/fitnessCenters')
  .then((response) => {
    console.log(response)
    this.setState({fitnessCentersList:response.data._embedded.fitnessCenters})
  })
  .catch((error) => {
    console.log(error)
    alert(error)
  })
}
static navigationOptions = {
    title: 'Workouts',
    header: null
}
addMember(){
  axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/trainers/'+this.state.trainer)
    .then((response) => {
        axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/fitnessCenters/'+this.state.fitnessCenter)
        .then((response1) => {
            var member = {
              name: this.state.name,
              email: this.state.email,
              gender: this.state.gender,
              phone: this.state.phone,
              dob: this.state.dob,
              trainer: response.data,
              fitnessCenter: response1.data,
              password: "master",
              designation:"member"
            }
            console.log("******************")
            console.log(member)
              axios.post('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/members', member)
              .then((response2) => {
                  alert("Member added successfully.")
              })
              .catch((error) => {
                  console.log(error)
                  alert(error)
              })
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        })
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })
}
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.trainersList && this.state.fitnessCentersList){
      return (
        <View style={styles.container}>
           <GradientHeader title="Add Member" navigation={this.props.navigation}/>
           <ScrollView>
           <View style={styles.inputForm}>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
              <TextInput
                  maxLength={30}
                  style={styles.inputStyle1}
                  placeholder="Enter name"
                  value={this.state.name}
                  onChangeText={(name) => this.setState({name})}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
              <TextInput
                  maxLength={40}
                  keyboardType="email-address"
                  style={styles.inputStyle1}
                  placeholder="Enter email"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email})}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <Picker
                    selectedValue={this.state.gender}
                    style={styles.inputStyle}
                    placeholder="Select gender"
                    onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                    <Picker.Item label="Select gender" value="Select gender" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
              <TextInput
                  maxLength={10}
                  keyboardType="phone-pad"
                  style={styles.inputStyle1}
                  placeholder="Enter mobile number"
                  value={this.state.phone}
                  onChangeText={(phone) => this.setState({phone})}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <DatePicker
                      style={styles.inputStyle2}
                      date={this.state.dob}
                      mode="date"
                      maxDate={new Date()}
                      confirmBtnText="Confirm"
                      placeholder="Select date of birth"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          borderWidth:0,
                          paddingLeft:7,
                          marginTop:0,
                          paddingTop:0
                        },
                        dateText:{
                          fontSize:12,
                          alignSelf: 'flex-start',
                          alignContent: 'flex-start',
                        },
                        placeholderText:{
                          fontSize:12,
                          alignSelf: 'flex-start',
                          alignContent: 'flex-start',
                        }
                      }}
                      onDateChange={(dob) => {this.setState({dob: dob})}}>
                </DatePicker>
            </View>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <Picker
                    selectedValue={this.state.fitnessCenter}
                    style={styles.inputStyle}
                    placeholder="Select center"
                    onValueChange={(itemIndex) => {this.setState({fitnessCenter: itemIndex})}}>      
                    <Picker.Item label="Select center" value="Select center" />
                    {
                      this.state.fitnessCentersList
                      .map((item, i) => (
                        <Picker.Item key={i} label={item.name + ', ' + item.location} value={item.id} />
                      ))
                    }
              </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <Picker
                    selectedValue={this.state.trainer}
                    style={styles.inputStyle}
                    placeholder="Select trainer"
                    onValueChange={(itemValue) => {this.setState({trainer: itemValue})}}>
                    <Picker.Item label="Select trainer" value="Select trainer" />
                    {
                      this.state.trainersList
                      .map((item, i) => (
                        <Picker.Item key={i} label={item.name} value={item.id} />
                      ))
                    }
              </Picker>
            </View>
              
              <TouchableHighlight onPress={() =>this.addMember()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Add Member</Text>
                  </View>
              </TouchableHighlight>
           </View>
           </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.loader}>
      <ActivityIndicator size="large" color="black" />
    </View>
    )
    
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
    marginTop:'100%',
  }

});