import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput
} from 'react-native';
import axios from 'axios';
var width = Dimensions.get('window').width;
var base_url = "http://192.168.0.4:8080/"
export default class AccountDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
        user: JSON.parse(this.props.navigation.state.params.user)
    }
}
  static navigationOptions = {
    title: 'Account Details',
    header:null
  };
  
  componentDidMount(){
    axios.get(base_url + 'members/' + this.state.user.id)
    .then((response) => {
        this.setState({user:response.data})
    })
    .catch((error) => {
        alert(error)
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
    axios.put(base_url + 'members/' + this.state.user.id, this.state.user)
    .then((response) => {
        axios.get(base_url + 'members/'+this.state.user.id)
        .then((response) => {
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
              Arjun Wadhwa
            </Text>
            <Text style={{
              color:'white',
              alignSelf:'center',
              fontSize:12
            }}>
              arjun.wadhwa2018@gmail.com
            </Text>
        </LinearGradient>
        <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter name"
                value={this.state.user.name}
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
                value={this.state.user.email}
                onChangeText={(email) => this.updateEmail(email)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.user.gender}
                  style={styles.inputStyle}
                  placeholder="Select gender"
                  onValueChange={(itemValue) => this.updateGender(itemValue)}>
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
                value={this.state.user.phone}
                onChangeText={(phone) => this.updatePhone(phone)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <DatePicker
                    style={styles.inputStyle2}
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
            <TouchableHighlight onPress={() => this.updateMember()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Details</Text>
                </View>
            </TouchableHighlight>
         </View>
      </View>
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
    height:160
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