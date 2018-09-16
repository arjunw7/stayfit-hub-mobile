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

//var base_url = "http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/"
var base_url = "http://192.168.0.4/"

var width = Dimensions.get('window').width;
var url = "http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/"
export default class SuperAdminViewMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: JSON.parse(this.props.navigation.state.params.member),
      trainer: {
        id: 12,
        name: "Alan",
      },
      fitnessCenter: {
        id: 9,
        name: "Frazer Town",
    }
    }
    axios.get(base_url + entities[TRAINER])
        .then((response) => {
            this.setState({trainersList:response.data._embedded.trainers})
        })
        .catch((error) => {
            alert(error)
        })
    axios.get(base_url + entities[FITNESSCENTER])
      .then((response) => {
          this.setState({fitnessCentersList:response.data._embedded.fitnessCenters})
      })
      .catch((error) => {
          alert(error)
      })
}
componentDidMount(){
  var uri1 = this.state.member._links.trainer.href
  axios.get(uri1)
  .then((response) => {
      this.setState({trainer:response.data})
  })
  .catch((error) => {
      
  })
  var uri2 = this.state.member._links.fitnessCenter.href
  axios.get(uri2)
  .then((response) => {
      this.setState({fitnessCenter:response.data})
  })
  .catch((error) => {
      
  })
}
  static navigationOptions = {
    title: 'Member Details',
    header:null
  };
  updateFitnessCenter(itemIndex){
    axios.put(this.state.member._links.fitnessCenter.href, base_url + fit)
    .then((response) => {
        var tempMember = this.state.member;
        tempMember.fitnessCenter = response.data
        this.setState({member:tempMember, fitnessCenter:response.data})
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })
  }
  updateName(itemValue){
    var tempMember = this.state.member;
    tempMember.name = itemValue
    this.setState({member:tempMember})
  }
  updatePhone(itemValue){
    var tempMember = this.state.member;
    tempMember.phone = itemValue
    this.setState({member:tempMember})
  }
  updateEmail(itemValue){
    var tempMember = this.state.member;
    tempMember.email = itemValue
    this.setState({member:tempMember})
  }
  updateGender(itemValue){
    var tempMember = this.state.member;
    tempMember.gender = itemValue
    this.setState({member:tempMember})
  }
  updateDob(itemValue){
    //alert(itemValue)
    var tempMember = this.state.member;
    tempMember.dob = itemValue;
    //alert(tempMember.dob)
    this.setState({member:tempMember})
  }
  updateTrainer(itemIndex){
    axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/trainers/'+itemIndex)
    .then((response) => {
        var tempMember = this.state.member;
        tempMember.trainer = response.data
        this.setState({member:tempMember, trainer:response.data})
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })
  }
  updateMember(){
    alert(JSON.stringify(this.state.member))
    axios.put('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/members/'+this.state.member.id, this.state.member)
    .then((response) => {
        axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/members/'+this.state.member.id)
        .then((response) => {
            this.setState({member:response.data})
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
    if(this.state.member && this.state.trainersList && this.state.fitnessCentersList){
      return(
        <View style={styles.container}>
         <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
           <Avatar
               size="small"
               rounded
               icon={{name: 'arrow-back'}}
               onPress={() => navigate("SuperAdminMemberHome")}
               containerStyle={{margin: 30}}
           />
           <Text style={{
               fontSize:24,
               color:'white',
               marginLeft:30,
               marginTop:-10
           }}>{this.props.title}</Text>
       </LinearGradient>
        <ScrollView>
         <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter name"
                value={this.state.member.name}
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
                value={this.state.member.email}
                onChangeText={(email) => this.updateEmail(email)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <Picker
                  selectedValue={this.state.member.gender}
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
                value={this.state.member.phone}
                onChangeText={(phone) => this.updatePhone(phone)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <DatePicker
                    style={styles.inputStyle2}
                    date={this.state.member.dob}
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
                  selectedValue={this.state.fitnessCenter.id}
                  style={styles.inputStyle}
                  placeholder="Select center"
                  onValueChange={(itemIndex) => this.updateFitnessCenter(itemIndex)}>      
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
                  selectedValue={this.state.trainer.id}
                  style={styles.inputStyle}
                  placeholder="Select trainer"
                  onValueChange={(itemValue) => this.updateTrainer(itemValue)}>
                  <Picker.Item label="Select trainer" value="Select trainer" />
                  {
                    this.state.trainersList
                    .map((item, i) => (
                      <Picker.Item key={i} label={item.name} value={item.id} />
                    ))
                  }
            </Picker>
          </View>
            <TouchableHighlight onPress={() => this.updateMember()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Member Details</Text>
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