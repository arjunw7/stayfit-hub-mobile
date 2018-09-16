import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import GradientHeader from '../components/GradientHeader'
import { Picker } from 'react-native-picker-dropdown'
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  ScrollView
} from 'react-native';
var width = Dimensions.get('window').width;
var url = "http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com"
export default class SuperAdminViewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: this.props.navigation.state.params.employee,
      empType: this.props.navigation.state.params.employeeType
    }
    axios.get(url+'/headTrainers')
      .then((response) => {
          this.setState({headTrainersList:response.data._embedded.headTrainers})
      })
      .catch((error) => {
          alert(error)
      })
      axios.get(url+'/fitnessCenters')
      .then((response) => {
          this.setState({fitnessCentersList:response.data._embedded.fitnessCenters})
      })
      .catch((error) => {
          console.log(error)
          alert(error)
      })
  }
  static navigationOptions = {
    title: 'Member Details',
    header:null
  };
  updateFitnessCenter(itemIndex){
    axios.get(url+'/fitnessCenter/'+itemIndex)
    .then((response) => {
        var tempEmployee = this.state.employee;
        tempEmployee.fitnessCenter = response.data
        this.setState({employee:tempEmployee})
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })
  }
  updateName(itemValue){
    var tempEmployee = this.state.employee;
    tempEmployee.name = itemValue
    this.setState({employee:tempEmployee})
  }
  updatePhone(itemValue){
    var tempEmployee = this.state.employee;
    tempEmployee.phone = itemValue
    this.setState({employee:tempEmployee})
  }
  updateEmail(itemValue){
    var tempEmployee = this.state.employee;
    tempEmployee.email = itemValue
    this.setState({employee:tempEmployee})
  }
  updateGender(itemValue){
    var tempEmployee = this.state.employee;
    tempEmployee.gender = itemValue
    this.setState({employee:tempEmployee})
  }
  updateDob(itemValue){

    var tempEmployee = this.state.employee;
    tempEmployee.dob = itemValue;
    this.setState({employee:tempEmployee})
  }
  updateHeadTrainer(itemIndex){
    axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/headTrainer/'+itemIndex)
    .then((response) => {
        var tempEmployee = this.state.employee;
        tempEmployee.headTrainer = response.data
        this.setState({employee:tempEmployee})
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })
  }
  updateEmployee(){
    if(this.state.empType=='trainer'){
      axios.put('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/trainer/'+this.state.employee.id, this.state.employee)
      .then((response) => {
          axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/trainer/'+this.state.employee.id)
          .then((response) => {
              this.setState({employee:response.data})
              alert("Trainer details updated.")
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
    } else if(this.state.empType=='headTrainer'){
      axios.put('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/headTrainer/'+this.state.employee.id, this.state.employee)
      .then((response) => {
          axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/headTrainer/'+this.state.employee.id)
          .then((response) => {
              this.setState({employee:response.data})
              alert("Head trainer details updated.")
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
    else if(this.state.empType=='frontdesk'){
      axios.put('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/frontdeskAdmin/'+this.state.employee.id, this.state.employee)
      .then((response) => {
          axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/frontdeskAdmin/'+this.state.employee.id)
          .then((response) => {
              this.setState({employee:response.data})
              alert("Frontdesk admin details updated.")
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
    
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='trainer'){
      return(
        <View style={styles.container}>
        <GradientHeader title="Employee Details" navigation={this.props.navigation}/>
        <ScrollView>
         <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter name"
                value={this.state.employee.name}
                onChangeText={(name) => this.updateName(name)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={40}
                keyboardType="email-address"
                style={styles.inputStyle1}
                placeholder="Enter email"
                value={this.state.employee.email}
                onChangeText={(email) => this.updateEmail(email)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.employee.gender}
                  style={styles.inputStyle}
                  placeholder="Select gender"
                  onValueChange={(itemValue) => this.updateGender(itemValue)}>
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
                value={this.state.employee.phone}
                onChangeText={(phone) => this.updatePhone(phone)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <DatePicker
                    style={styles.inputStyle2}
                    date={this.state.employee.dob}
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
                    onDateChange={(dob) => this.updateDob(dob)}>
              </DatePicker>
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.employee.fitnessCenter.id}
                  style={styles.inputStyle}
                  placeholder="Select center"
                  onValueChange={(itemIndex) => this.updateFitnessCenter(itemIndex)}>      
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
                  selectedValue={this.state.employee.headTrainer.id}
                  style={styles.inputStyle}
                  placeholder="Select trainer"
                  onValueChange={(itemValue) => this.updateHeadTrainer(itemValue)}>
                  {
                    this.state.headTrainersList
                    .map((item, i) => (
                      <Picker.Item key={i} label={item.name} value={item.id} />
                    ))
                  }
            </Picker>
          </View>
            <TouchableHighlight onPress={() => this.updateEmployee()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Employee Details</Text>
                </View>
            </TouchableHighlight>
         </View>
         </ScrollView>
       
      </View>
      )
    }
    else if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='headTrainer'){
      return(
        <View style={styles.container}>
        <GradientHeader title="Member Details" navigation={this.props.navigation}/>
        <ScrollView>
         <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter name"
                value={this.state.employee.name}
                onChangeText={(name) => this.updateName(name)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={40}
                keyboardType="email-address"
                style={styles.inputStyle1}
                placeholder="Enter email"
                value={this.state.employee.email}
                onChangeText={(email) => this.updateEmail(email)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.employee.gender}
                  style={styles.inputStyle}
                  placeholder="Select gender"
                  onValueChange={(itemValue) => this.updateGender(itemValue)}>
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
                value={this.state.employee.phone}
                onChangeText={(phone) => this.updatePhone(phone)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <DatePicker
                    style={styles.inputStyle2}
                    date={this.state.employee.dob}
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
                    onDateChange={(dob) => this.updateDob(dob)}>
              </DatePicker>
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.employee.fitnessCenter.id}
                  style={styles.inputStyle}
                  placeholder="Select center"
                  onValueChange={(itemIndex) => this.updateFitnessCenter(itemIndex)}>      
                  {
                    this.state.fitnessCentersList
                    .map((item, i) => (
                      <Picker.Item key={i} label={item.name + ', ' + item.location} value={item.id} />
                    ))
                  }
            </Picker>
          </View>
            <TouchableHighlight onPress={() => this.updateEmployee()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Employee Details</Text>
                </View>
            </TouchableHighlight>
         </View>
         </ScrollView>
       
      </View>
      )
    }
    else if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='frontdesk'){
      return(
        <View style={styles.container}>
        <GradientHeader title="Member Details" navigation={this.props.navigation}/>
        <ScrollView>
         <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter name"
                value={this.state.employee.name}
                onChangeText={(name) => this.updateName(name)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={40}
                keyboardType="email-address"
                style={styles.inputStyle1}
                placeholder="Enter email"
                value={this.state.employee.email}
                onChangeText={(email) => this.updateEmail(email)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.employee.gender}
                  style={styles.inputStyle}
                  placeholder="Select gender"
                  onValueChange={(itemValue) => this.updateGender(itemValue)}>
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
                value={this.state.employee.phone}
                onChangeText={(phone) => this.updatePhone(phone)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <DatePicker
                    style={styles.inputStyle2}
                    date={this.state.employee.dob}
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
                    onDateChange={(dob) => this.updateDob(dob)}>
              </DatePicker>
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.employee.fitnessCenter.id}
                  style={styles.inputStyle}
                  placeholder="Select center"
                  onValueChange={(itemIndex) => this.updateFitnessCenter(itemIndex)}>      
                  {
                    this.state.fitnessCentersList
                    .map((item, i) => (
                      <Picker.Item key={i} label={item.name + ', ' + item.location} value={item.id} />
                    ))
                  }
            </Picker>
          </View>
            <TouchableHighlight onPress={() => this.updateEmployee()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Employee Details</Text>
                </View>
            </TouchableHighlight>
         </View>
         </ScrollView>
       
      </View>
      )
    }
    return (
      <View style={styles.loader}>
      <ActivityIndicator size="large" color="black" />
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
      marginTop:'100%',
    }
});