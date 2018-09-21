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

export default class SuperAdminAddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: this.props.navigation.state.params.employee,
      empType: this.props.navigation.state.params.empType,
      gender: ''
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
 
  }
renderHeader(empType){
  const {navigate} = this.props.navigation;
  return(
          <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
              <Avatar
                  size="small"
                  rounded
                  icon={{name: 'arrow-back'}}
                  onPress={() => navigate('SuperAdminEmployeeHome')}
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
addTrainer(){
  var trainer = {
    name:this.state.name,
    email:this.state.email,
    gender:this.state.gender,
    phone:this.state.phone,
    dob:this.state.dob,
    password: "master",
    designation:"trainer"
  }
  axios.post(CONFIG.base_url+'trainers', trainer)
      .then((response) => {
          axios({ 
            method: 'PUT', 
            url: response.data._links.fitnessCenter.href,
            headers: {
              "Content-Type": "text/uri-list"},
            data: CONFIG.base_url + 'fitnessCenters/'+this.state.fitnessCenter
          })
          .then((response1) => {
            axios({ 
              method: 'PUT', 
              url: response.data._links.headTrainer.href,
              headers: {
                "Content-Type": "text/uri-list"},
              data: CONFIG.base_url + 'headTrainers/'+this.state.headTrainer
            })
            .then((response) => {
              alert("Trainer created successfully.")
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
      })
      .catch((error) => {
          alert(error)
      })
}
addHeadTrainer(){
  var headTrainer = {
    name:this.state.name,
    email:this.state.email,
    gender:this.state.gender,
    phone:this.state.phone,
    dob:this.state.dob,
    password: "master",
    designation:"headTrainer"
  }
  axios.post(CONFIG.base_url+'headTrainers', headTrainer)
      .then((response) => {
          axios({ 
            method: 'PUT', 
            url: response.data._links.fitnessCenter.href,
            headers: {
              "Content-Type": "text/uri-list"},
            data: CONFIG.base_url + 'fitnessCenters/'+this.state.fitnessCenter
          })
          .then((response) => {
            alert("Head Trainer Created Successfully.")
          })
          .catch((error) => {
              console.log(error)
              alert(JSON.stringify(error))
          })
      })
      .catch((error) => {
          alert(error)
      })
}
addFrontdeskAdmin(){
  var frontdeskAdmin = {
    name:this.state.name,
    email:this.state.email,
    gender:this.state.gender,
    phone:this.state.phone,
    dob:this.state.dob,
    password: "master",
    designation:"frontdeskAdmin"
  }
  axios.post(CONFIG.base_url+'frontdeskAdmins', frontdeskAdmin)
      .then((response) => {
          axios({ 
            method: 'PUT', 
            url: response.data._links.fitnessCenter.href,
            headers: {
              "Content-Type": "text/uri-list"},
            data: CONFIG.base_url + 'fitnessCenters/'+this.state.fitnessCenter
          })
          .then((response) => {
            alert("Frontdesk Admin Created Successfully.")
          })
          .catch((error) => {
              console.log(error)
              alert(JSON.stringify(error))
          })
      })
      .catch((error) => {
          alert(error)
      })
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
                onChangeText={(name) => this.setState({name:name})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={40}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.inputStyle1}
                placeholder="Enter email"
                onChangeText={(email) => this.setState({email:email})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  style={styles.inputStyle}
                  selectedValue={this.state.gender}
                  placeholder="Select gender"
                  onValueChange={(itemValue) => this.setState({gender:itemValue})}>
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
                onChangeText={(phone) => this.setState({phone:phone})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <DatePicker
                    style={styles.inputStyle2}
                    mode="date"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    placeholder="Select date of birth"
                    cancelBtnText="Cancel"
                    date={this.state.dob}
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
                    onDateChange={(dob) => this.setState({dob:dob})}>
              </DatePicker>
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  style={styles.inputStyle}
                  placeholder="Select center"
                  selectedValue={this.state.fitnessCenter}
                  onValueChange={(itemIndex) => this.setState({fitnessCenter:itemIndex})}>      
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
                  selectedValue={this.state.headTrainer}
                  style={styles.inputStyle}
                  placeholder="Select trainer"
                  onValueChange={(itemValue) => this.setState({headTrainer:itemValue})}>
                  {
                    this.state.headTrainersList
                    .map((item, i) => (
                      <Picker.Item key={i} label={item.name} value={item.id} />
                    ))
                  }
            </Picker>
          </View>
            <TouchableHighlight onPress={() => this.addTrainer()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Add Trainer</Text>
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
                onChangeText={(name) => this.setState({name:name})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={40}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.inputStyle1}
                placeholder="Enter email"
                onChangeText={(email) => this.setState({email:email})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  style={styles.inputStyle}
                  placeholder="Select gender"
                  selectedValue={this.state.gender}
                  onValueChange={(itemValue) => this.setState({gender:itemValue})}>
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
                onChangeText={(phone) => this.setState({phone:phone})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <DatePicker
                    style={styles.inputStyle2}
                    mode="date"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    date={this.state.dob}
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
                    onDateChange={(dob) => this.setState({dob:dob})}>
              </DatePicker>
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  style={styles.inputStyle}
                  placeholder="Select center"
                  selectedValue={this.state.fitnessCenter}
                  onValueChange={(itemIndex) => this.setState({fitnessCenter:itemIndex})}>      
                  {
                    this.state.fitnessCentersList
                    .map((item, i) => (
                      <Picker.Item key={i} label={item.name + ', ' + item.location} value={item.id} />
                    ))
                  }
            </Picker>
          </View>
            <TouchableHighlight onPress={() => this.addHeadTrainer()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Add Head Trainer</Text>
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
                onChangeText={(name) => this.setState({name:name})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={40}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.inputStyle1}
                placeholder="Enter email"
                onChangeText={(email) => this.setState({email:email})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  style={styles.inputStyle}
                  placeholder="Select gender"
                  selectedValue={this.state.gender}
                  onValueChange={(itemValue) => this.setState({gender:itemValue})}>
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
                onChangeText={(phone) => this.setState({phone:phone})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <DatePicker
                    style={styles.inputStyle2}
                    mode="date"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    placeholder="Select date of birth"
                    cancelBtnText="Cancel"
                    date={this.state.dob}
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
                    onDateChange={(dob) => this.setState({dob:dob})}>
              </DatePicker>
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  style={styles.inputStyle}
                  placeholder="Select center"
                  selectedValue={this.state.fitnessCenter}
                  onValueChange={(itemIndex) => this.setState({fitnessCenter:itemIndex})}>      
                  {
                    this.state.fitnessCentersList
                    .map((item, i) => (
                      <Picker.Item key={i} label={item.name + ', ' + item.location} value={item.id} />
                    ))
                  }
            </Picker>
          </View>
            <TouchableHighlight onPress={() => this.addFrontdeskAdmin()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Add Frontdesk Admin</Text>
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