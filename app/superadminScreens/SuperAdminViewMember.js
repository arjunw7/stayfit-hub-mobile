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
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
export default class SuperAdminViewMember extends Component {
  static navigationOptions = {
    title: 'Member Details',
    header:null
  };
  constructor(props) {
    super(props);
    this.state = {
      member: JSON.parse(this.props.navigation.state.params.member)
    }
    axios.get(CONFIG.base_url + 'trainers')
        .then((response) => {
            this.setState({trainersList:response.data._embedded.trainers})
        })
        .catch((error) => {
            alert(error)
        })
    axios.get(CONFIG.base_url + 'fitnessCenters')
      .then((response) => {
          this.setState({fitnessCentersList:response.data._embedded.fitnessCenters})
      })
      .catch((error) => {
          alert(error)
      })
}
componentDidMount(){
  this.getTrainer();
  this.getFitnessCenter();
  axios.get(CONFIG.base_url + 'members/' + this.state.member.id)
    .then((response) => {
        this.setState({member:response.data})
    })
    .catch((error) => {
        alert(error)
    })
}
getTrainer(){
  var trainersUrl = this.state.member._links.trainer.href
  axios.get(trainersUrl)
  .then((response) => {
      this.setState({trainer:response.data})
  })
  .catch((error) => {
      console.log(error)
  })
}
getFitnessCenter(){
  var fitnessCentersUrl = this.state.member._links.fitnessCenter.href
  axios.get(fitnessCentersUrl)
  .then((response) => {
      this.setState({fitnessCenter:response.data})
  })
  .catch((error) => {
      console.log(error)
  })
}
updateTrainer(itemIndex){
  axios.get(CONFIG.base_url + 'trainers/'+itemIndex)
  .then((response) => {
      var updatedTrainer = response.data._links.self.href
      var trainerURL = this.state.member._links.trainer.href
      axios({ 
        method: 'PUT', 
        url: trainerURL,
        headers: {
          "Content-Type": "text/uri-list"},
        data: updatedTrainer
       })
      .then((response) => {
         this.getTrainer()
      })
      .catch((error) => {
          console.log(error)
          alert(JSON.stringify(error))
      })
  })
  .catch((error) => {
      console.log(error)
      alert("outside" + JSON.stringify(error))
  })
}

updateFitnessCenter(itemIndex){
  axios.get(CONFIG.base_url + 'fitnessCenters/'+itemIndex)
  .then((response) => {
      var updatedCenter = response.data._links.self.href
      var centerURL = this.state.member._links.fitnessCenter.href
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
renderTrainer(){
  if(this.state.trainer){
    return(
      <View style={styles.inputContainer}>
          <Icon name='rename-box' type='material-community' color="#595959"/>
          <Picker
              selectedValue={this.state.trainer.id}
              style={styles.inputStyle}
              placeholder="Select trainer"
              onValueChange={(itemIndex) => this.updateTrainer(itemIndex)}>  
              {
                this.state.trainersList
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
              onValueChange={(itemIndex) => this.updateTrainer(itemIndex)}>      
              {
                this.state.trainersList
                .map((item, i) => (
                  <Picker.Item key={i} label={item.name} value={item.id} />
                ))
              }
        </Picker>
      </View>   
    )
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
  var tempMember = this.state.member;
  tempMember.dob = itemValue;
  this.setState({member:tempMember})
}
updateMember(){
  axios.put(CONFIG.base_url + 'members/' + this.state.member.id, this.state.member)
  .then((response) => {
      axios.get(CONFIG.base_url + 'members/' +this.state.member.id)
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
               onPress={() => navigate("SuperAdminHome")}
               containerStyle={{margin: 30}}
           />
           <Text style={{
               fontSize:24,
               color:'white',
               marginLeft:30,
               marginTop:-10
           }}>Member Details</Text>
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
          {this.renderTrainer()}
          {this.renderFitnessCenter()}
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