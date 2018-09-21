import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
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
import CONFIG from '../config/config'

export default class SuperAdminViewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: this.props.navigation.state.params.employee,
      empType: this.props.navigation.state.params.employeeType
    }
    axios.get(CONFIG.base_url+'headTrainers')
      .then((response) => {
          this.setState({headTrainersList:response.data._embedded.headTrainers})
      })
      .catch((error) => {
          alert(error)
      })
    axios.get(CONFIG.base_url+'fitnessCenters')
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
  componentDidMount(){
    this.getHeadTrainer();
    this.getFitnessCenter();
  }
  getHeadTrainer(){
    if(this.state.employee._links.headTrainer){
      var headTrainersUrl = this.state.employee._links.headTrainer.href
    axios.get(headTrainersUrl)
    .then((response) => {
        this.setState({headTrainer:response.data})
    })
    .catch((error) => {
        console.log(error)
    })
    }
  }
  getFitnessCenter(){
    var fitnessCentersUrl = this.state.employee._links.fitnessCenter.href
    axios.get(fitnessCentersUrl)
    .then((response) => {
        this.setState({fitnessCenter:response.data})
    })
    .catch((error) => {
        console.log(error)
    })
  }
  updateFitnessCenter(itemIndex){
    axios.get(CONFIG.base_url + 'fitnessCenters/'+itemIndex)
    .then((response) => {
        var updatedCenter = response.data._links.self.href
        var centerURL = this.state.employee._links.fitnessCenter.href
        axios({ 
          method: 'PUT', 
          url: centerURL,
          headers: {
            "Content-Type": "text/uri-list"},
          data: updatedCenter
         })
        .then((response) => {
           this.getFitnessCenter()
        })
        .catch((error) => {
            console.log(error)
            alert(JSON.stringify(error))
        })
    })
    .catch((error) => {
        console.log(error)
        alert(JSON.stringify(error))
    })
  }
  updateHeadTrainer(itemIndex){
    axios.get(CONFIG.base_url + 'headTrainers/'+itemIndex)
    .then((response) => {
        var updatedHT = response.data._links.self.href
        var empHeadTrainerURL = this.state.employee._links.headTrainer.href
        axios({ 
          method: 'PUT', 
          url: empHeadTrainerURL,
          headers: {
            "Content-Type": "text/uri-list"},
          data: updatedHT
         })
        .then((response) => {
           this.getHeadTrainer()
        })
        .catch((error) => {
            console.log(error)
            alert(JSON.stringify(error))
        })
    })
    .catch((error) => {
        console.log(error)
        alert(JSON.stringify(error))
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
  updateEmployee(){
    if(this.state.empType=='trainer'){
      axios.put(CONFIG.base_url + 'trainers/'+this.state.employee.id, this.state.employee)
      .then((response) => {
          axios.get(CONFIG.base_url + 'trainers/'+this.state.employee.id)
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
      axios.put(CONFIG.base_url + 'headTrainers/'+this.state.employee.id, this.state.employee)
      .then((response) => {
          axios.get(CONFIG.base_url + 'headTrainers/'+this.state.employee.id)
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
      axios.put(CONFIG.base_url +'frontdeskAdmins/'+this.state.employee.id, this.state.employee)
      .then((response) => {
          axios.get(CONFIG.base_url + 'frontdeskAdmins/'+this.state.employee.id)
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
  renderFitnessCenter(){
    if(this.state.fitnessCenter){
      return(
        <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.fitnessCenter.id}
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
      )
    }
    else{
      return(
        <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
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
      )
    }
  }
  renderHeadTrainer(){
    if(this.state.headTrainer){
      return(
        <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.headTrainer.id}
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
      )
    }
    else{
      return(
        <View style={styles.inputContainer}>
        <Icon name='rename-box' type='material-community' color="#595959"/>
        <Picker
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
      )
    }
  }
  renderHeader(empType){
    const {navigate} = this.props.navigation;
    return(
            <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
                <Avatar
                    size="small"
                    rounded
                    icon={{name: 'arrow-back'}}
                    onPress={() => navigate('SuperAdminHome')}
                    containerStyle={{margin: 30}}
                />
                <Text style={{
                    fontSize:24,
                    color:'white',
                    marginLeft:30,
                    marginTop:-10
                }}>Add {empType}</Text>
            </LinearGradient>
        )
}
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='trainer'){
      return(
        <View style={styles.container}>
        {this.renderHeader("Trainer Details")}
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
                        paddingLeft:12,
                        marginTop:6,
                        paddingTop:0
                      },
                      dateText:{
                        fontSize:16,
                        alignSelf: 'flex-start',
                        alignContent: 'flex-start',
                      },
                      placeholderText:{
                        fontSize:16,
                        alignSelf: 'flex-start',
                        alignContent: 'flex-start',
                      }
                    }}
                    onDateChange={(dob) => this.updateDob(dob)}>
              </DatePicker>
          </View>
          {this.renderFitnessCenter()}
          {this.renderHeadTrainer()}
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
        {this.renderHeader("Head Trainers Details")}
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
                        paddingLeft:12,
                        marginTop:6,
                        paddingTop:0
                      },
                      dateText:{
                        fontSize:16,
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
          {this.renderFitnessCenter()}
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
         {this.renderHeader("Frontdesk Admin Details")}
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
                        paddingLeft:12,
                        marginTop:6,
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
          {this.renderFitnessCenter()}
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
    paddingLeft:5,
    marginTop: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize:16,
    height:40,
    marginTop: -5,
  },
  inputStyle1: {
    flex: 1,
    paddingLeft: 12,
    fontSize:16,
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
    },
    headDesign:{
      width:width,
      height:140
    },
});