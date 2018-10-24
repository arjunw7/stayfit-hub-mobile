import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import Moment from 'moment';
import axios from 'axios';
import CONFIG from '../config/config'
import ActionSheet from 'react-native-actionsheet'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
var width = Dimensions.get('window').width;
const optionsGender = [
  "Male",
  "Female",
  "Cancel"
]
export default class AccountDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
      initials: ''
    }
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
  componentWillMount(){
    AsyncStorage.getItem('member').then((member) => {
      this.setState({
        user:JSON.parse(member),
        dobText: JSON.parse(member).dob,
        dobDate: JSON.parse(member).dob,
      })
      this.getInitials(JSON.parse(member).name)
    })
  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  getInitials(name){
    var res = name.split(" ");
    if(res.length>1){
        if(res[1].length>0){
          this.setState({initials:res[0][0].toUpperCase() + res[1][0].toUpperCase()})
        }
        else{
          this.setState({initials:res[0][0].toUpperCase() + res[0][0].toUpperCase()})
        }
    }
    else{
      this.setState({initials:res[0][0].toUpperCase() + res[0][0].toUpperCase()})
    }
  }

  onDobPress = () => {
      let dobDate = new Date();
      this.refs.dobDialog.open({
      date: dobDate,
      maxDate: new Date() //To restirct past date
      });
  }

  onDobPicked = (date) => {
       var tempMember = this.state.user;
       tempMember.dob = date;
       this.setState({user:tempMember})
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
  updateMember(){
    var user = this.state.user;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!user.name || !user.email){
      alert("Name and email are mandatory.")
    }
    else if(reg.test(user.email) === false){
      alert("Please enter a valid email address")
    } 
    else if(user.phone && user.phone.length<10){
      alert("Please enter a valid Mobile Number")
    }
    else{
    this.setState({showLoader:true})
      axios.put(CONFIG.base_url + 'members/' + this.state.user.id, this.state.user)
    .then((response) => {
        axios.get(CONFIG.base_url + 'members/'+this.state.user.id)
        .then((response) => {
            this.saveItem('member', JSON.stringify(response.data))
            this.setState({user:response.data})
            this.setState({showLoader:false})
            alert("Member details updated.")
        })
        .catch((error) => {
            console.log(error)
            this.setState({showLoader:false})
            alert(error)
        })
    })
    .catch((error) => {
        console.log(error)
        this.setState({showLoader:false})
        alert(error)
    })
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.user){
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
            <Avatar
                rounded
                title={this.state.initials}
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
                    editable={false}
                    onChangeText={(email) => this.updateEmail(email)}
                  />
                  <Text style={styles.label}>Gender</Text>
                  <TouchableHighlight onPress={this.showActionSheet} underlayColor="transparent">
                  <View style={styles.row}>
                    <Text style={styles.centerText}>{this.state.user.gender}</Text> 
                    <Icon
                    name='chevron-small-down'
                    color='#E62221'
                    type='entypo'
                    containerStyle={{
                        position:'absolute',
                        right:5
                    }} />
                  </View>
                  </TouchableHighlight>
                  <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Your gender?'}
                    options={optionsGender}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={2}
                    onPress={(index) => { 
                            if(index!=2){
                              var tempMember = this.state.user;
                              tempMember.gender = optionsGender[index]
                              this.setState({user:tempMember})
                            }
                    }}
                    />
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
                  <TouchableHighlight onPress={this.onDobPress.bind(this)} underlayColor="transparent">
                    <View style={styles.row}>
                        <Text style={styles.centerText}>{this.state.user.dob?Moment(this.state.user.dob).format('DD MMM, YYYY'): "Select date of birth"}</Text> 
                        <Icon
                        name='chevron-small-down'
                        color='#E62221'
                        type='entypo'
                        containerStyle={{
                            position:'absolute',
                            right:5
                        }} />
                        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDobPicked.bind(this)} />
                    </View>
                  </TouchableHighlight>
                <TouchableHighlight onPress={() => this.updateMember()} underlayColor="transparent">
                    <View style={styles.login}>
                      <Text style={styles.loginText}>Update Details</Text>
                    </View>
                </TouchableHighlight>
           </View>
           </ScrollView>
        </KeyboardAvoidingView>
      );
    }
    else{
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="grey" />
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
    width:width-80,
    height:40,
    marginLeft: 10,
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
  },
  loader:{
    marginTop:'100%',
  },
  label:{
    color:'#E62221',
    marginTop: 15,
    marginLeft: 10,
  },
  row:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth:1,
    borderBottomColor: '#E62221',
    width:width-80,
    marginLeft:10,
    marginRight: 10,
    marginTop:15,
    paddingBottom: 10,
  },
  centerText:{
    color:'black',
    fontSize:14,
    marginLeft: 5,
},
ploader:{
  flex:1,
  width:width,
  height:"100%",
  position:'absolute',
  zIndex:100,
  backgroundColor:"rgba(255,255,255,0.7)",
  paddingTop:"70%",
  marginTop:160
}

});