import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown';
import axios from 'axios';
import CONFIG from '../config/config'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  ScrollView
} from 'react-native';
var width = Dimensions.get('window').width;
export default class AccountDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
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
  static navigationOptions = {
    title: 'Account Details',
    header:null
  };
  async saveItem(item, selectedValue) {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        alert("AsyncStorage error")
        console.error('AsyncStorage error: ' + error.message);
    }
  }
  componentWillMount(){
    AsyncStorage.getItem('member').then((member) => {
      this.setState({user:JSON.parse(member)})
    })
  }
  updateName(itemValue){
    var tempMember = this.state.user;
    tempMember.name = itemValue
    this.setState({user:tempMember})
  }
  updatePhone(itemValue){
    var tempMember = this.state.user;
    tempMember.phone = itemValue
    this.setState({user:tempMember})
  }
  updateEmail(itemValue){
    var tempMember = this.state.user;
    tempMember.email = itemValue
    this.setState({user:tempMember})
  }
  updateGender(itemValue){
    var tempMember = this.state.user;
    tempMember.gender = itemValue
    this.setState({user:tempMember})
  }
  updateDob(itemValue){
    //alert(itemValue)
    var tempMember = this.state.user;
    tempMember.dob = itemValue;
    //alert(tempMember.dob)
    this.setState({user:tempMember})
  }
  updateMember(){
    axios.put(CONFIG.base_url + 'members/' + this.state.user.id, this.state.user)
    .then((response) => {
        axios.get(CONFIG.base_url + 'members/'+this.state.user.id)
        .then((response) => {
            this.saveItem('member', JSON.stringify(response.data))
            this.setState({user:response.data})
            alert("Member details updated.")
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
    if(this.state.user){
      return (
        <View style={styles.container}>
          <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
            <Avatar
              size="small"
              rounded
              icon={{name: 'arrow-back'}}
              onPress={() => navigate('Profile')}
              containerStyle={{margin: 30}}
            />
            <Avatar
                rounded
                title="AW"
                overlayContainerStyle={{backgroundColor: 'transparent'}}
                onPress={() => console.log("Works!")}
                titleStyle={{color:'grey', fontSize:36}}
                containerStyle={{marginTop:-60, width:70, height:70, alignSelf:'center', borderRadius:35, backgroundColor:'white'}}
              />
              <Text style={{
                color:'white',
                alignSelf:'center',
                fontSize:15,
                marginTop:10,
                fontWeight:'500'
              }}>
                {this.state.user.name}
              </Text>
              <Text style={{
                color:'white',
                alignSelf:'center',
                fontSize:12
              }}>
               {this.state.user.email}
              </Text>
          </LinearGradient>
          <ScrollView>
          <View style={styles.inputForm}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                  maxLength={30}
                  style={styles.inputStyle}
                  placeholder="Enter name"
                  value={this.state.user.name}
                  onChangeText={(name) => this.updateName(name)}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    maxLength={40}
                    keyboardType="email-address"
                    style={styles.inputStyle}
                    placeholder="Enter email"
                    value={this.state.user.email}
                    onChangeText={(email) => this.updateEmail(email)}
                  />
                  <Text style={styles.label}>Gender</Text>
                  <Picker
                      selectedValue={this.state.user.gender}
                      style={styles.inputStyle}
                      placeholder="Select gender"
                      onValueChange={(itemValue) => this.updateGender(itemValue)}>
                      <Picker.Item label="Select gender" value="Select gender" />
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                </Picker>
                <Text style={styles.label}>Contact number</Text>
                <TextInput
                    maxLength={10}
                    keyboardType="phone-pad"
                    style={styles.inputStyle}
                    placeholder="Enter mobile number"
                    value={this.state.user.phone}
                    onChangeText={(phone) => this.updatePhone(phone)}
                  />
                  <Text style={styles.label}>Date of birth</Text>
                  <DatePicker
                        style={styles.inputStyleDOB}
                        date={this.state.user.dob}
                        mode="date"
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        placeholder="Select date of birth"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                          dateInput: {
                            borderWidth:0,
                            paddingLeft:6,
                            marginTop:6,
                            paddingTop:0
                          },
                          dateText:{
                            fontSize:14,
                            alignSelf: 'flex-start',
                            alignContent: 'flex-start',
                          },
                          placeholderText:{
                            fontSize:14,
                            alignSelf: 'flex-start',
                            alignContent: 'flex-start',
                          }
                        }}
                        onDateChange={(dob) => this.updateDob(dob)}>
                  </DatePicker>
                <TouchableHighlight onPress={() => this.updateMember()} underlayColor="transparent">
                    <View style={styles.login}>
                      <Text style={styles.loginText}>Update Details</Text>
                    </View>
                </TouchableHighlight>
           </View>
           </ScrollView>
        </View>
      );
    }
    else{
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
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
    height:160
  },
  inputStyle:{
    width:width-40,
    height:40,
    paddingLeft: 5,
    borderBottomColor:'#E62221',
    borderBottomWidth: 1,
  },
  inputStyleDOB:{
    width:width-40,
    height:40,
    borderBottomColor:'#E62221',
    borderBottomWidth: 1,
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
  loader:{
    marginTop:'100%',
  },
  label:{
    color:'#E62221',
    marginTop: 15,
  }

});