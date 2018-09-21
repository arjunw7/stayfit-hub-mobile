import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { Picker } from 'react-native-picker-dropdown'
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
import CONFIG from '../config/config'
export default class HealthProfileScreen extends Component {
  constructor(props) {
    super(props);
      this.state ={
          goalsList:[]
      }
      axios.get(CONFIG.base_url + 'goals')
        .then((response) => {
            this.setState({goalsList:response.data._embedded.goals})
        })
        .catch((error) => {
            alert(error)
        })
  }
    static navigationOptions = {
    title: 'Health Profile',
    header:null
  };

  componentWillMount(){
    AsyncStorage.getItem('member').then((member) => {
      var user  = JSON.parse(member);
      var goalURL = user._links.goal.href
      axios.get(goalURL)
        .then((response) => {
            this.setState({goal:response.data})
        })
        .catch((error) => {
            alert(error)
        })
      this.setState({user:JSON.parse(member)})
    })
  }

  getGoal(){
    var goalURL = this.state.user._links.goal.href
    axios.get(goalURL)
        .then((response) => {
            this.setState({goal:response.data})
        })
        .catch((error) => {
            alert(error)
        })
  }
 
  async saveItem(item, selectedValue) {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        alert("AsyncStorage error")
        console.error('AsyncStorage error: ' + error.message);
    }
    }
  
  submitChanges(){
    alert("Changes saved successfully.")
  }
  updateHeight(itemValue){
    var tempMember = this.state.user;
    tempMember.height = itemValue
    this.setState({user:tempMember})
  }
  updateWeight(itemValue){
    var tempMember = this.state.user;
    tempMember.weight = itemValue
    this.setState({user:tempMember})
  }
  updateWaist(itemValue){
    var tempMember = this.state.user;
    tempMember.waistSize = itemValue
    this.setState({user:tempMember})
  }
  updateHip(itemValue){
    var tempMember = this.state.user;
    tempMember.hipSize = itemValue
    this.setState({user:tempMember})
  }
  updateAlcohol(itemValue){
    var tempMember = this.state.user;
    tempMember.alcoholStatus = itemValue
    this.setState({user:tempMember})
  }
  updateActivity(itemValue){
    var tempMember = this.state.user;
    tempMember.activityStatus = itemValue
    this.setState({user:tempMember})
  }
  updateSmoking(itemValue){
    var tempMember = this.state.user;
    tempMember.smokingStatus = itemValue
    this.setState({user:tempMember})
  }
  updateGoal(itemIndex){
    axios.get(CONFIG.base_url + 'goals/'+itemIndex)
    .then((response) => {
        var updatedGoal = response.data._links.self.href
        var goalURL = this.state.user._links.goal.href
        axios({ 
          method: 'PUT', 
          url: goalURL,
          headers: {
            "Content-Type": "text/uri-list"},
          data: updatedGoal
         })
        .then((response) => {
           this.getGoal()
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
  updateMember(){
      axios.put(CONFIG.base_url + 'members/'+this.state.user.id, this.state.user)
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
  renderGoal(){
    if(this.state.goal){
      return(
        <Picker
              selectedValue={this.state.goal.id}
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateGoal(itemIndex)}>   
              {
                this.state.goalsList
                .map((item, i) => (
                  <Picker.Item key={i} label={item.name} value={item.id} />
                ))
              }
        </Picker>
      )
    } else{
      return(
        <Picker
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateGoal(itemIndex)}>  
              {
                this.state.goalsList
                .map((item, i) => (
                  <Picker.Item key={i} label={item.name} value={item.id} />
                ))
              }
        </Picker>
      )
    }
  }
   renderSmoking(){
    if(this.state.goal){
      return(
        <Picker
              selectedValue={this.state.user.smokingStatus}
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateSmoking(itemIndex)}>   
              <Picker.Item label={"Heavy"} value={"Heavy"} />
              <Picker.Item label={"Moderate"} value={"Moderate"} />
              <Picker.Item label={"No Smoker"} value={"No Smoker"} />
              <Picker.Item label={"Used to be a smoker"} value={"Used to be a smoker"} />
        </Picker>
      )
    } else{
      return(
        <Picker
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateSmoking(itemIndex)}>  
              <Picker.Item label={"Heavy"} value={"Heavy"} />
              <Picker.Item label={"Moderate"} value={"Moderate"} />
              <Picker.Item label={"No Smoker"} value={"No Smoker"} />
              <Picker.Item label={"Used to be a smoker"} value={"Used to be a smoker"} />
        </Picker>
      )
    }
  }
  renderAlcohol(){
    if(this.state.goal){
      return(
        <Picker
              selectedValue={this.state.user.alcoholStatus}
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateAlcohol(itemIndex)}>   
              <Picker.Item label={"Heavy"} value={"Heavy"} />
              <Picker.Item label={"Moderate"} value={"Moderate"} />
              <Picker.Item label={"No Driking"} value={"No Drinking"} />
              <Picker.Item label={"Used to drink"} value={"Used to drink"} />
        </Picker>
      )
    } else{
      return(
        <Picker
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateAlcohol(itemIndex)}>  
              <Picker.Item label={"Heavy"} value={"Heavy"} />
              <Picker.Item label={"Moderate"} value={"Moderate"} />
              <Picker.Item label={"No Smoker"} value={"No Smoker"} />
              <Picker.Item label={"Used to be a smoker"} value={"Used to be a smoker"} />
        </Picker>
      )
    }
  }
  renderActivity(){
    if(this.state.goal){
      return(
        <Picker
              selectedValue={this.state.user.activityStatus}
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateActivity(itemIndex)}>   
              <Picker.Item label={"Sedentary"} value={"Sedentary"} />
              <Picker.Item label={"Low Active Level"} value={"Low Active Level"} />
              <Picker.Item label={"Active"} value={"Active"} />
              <Picker.Item label={"Very active"} value={"Very active"} />
        </Picker>
      )
    } else{
      return(
        <Picker
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateActivity(itemIndex)}>  
              <Picker.Item label={"Heavy"} value={"Heavy"} />
              <Picker.Item label={"Moderate"} value={"Moderate"} />
              <Picker.Item label={"No Smoker"} value={"No Smoker"} />
              <Picker.Item label={"Used to be a smoker"} value={"Used to be a smoker"} />
        </Picker>
      )
    }
  }
  renderWeight(){
    if(this.state.user.weight){
      return(
         <TextInput
                maxLength={4}
                keyboardType="decimal-pad"
                style={styles.inputStyle}
                placeholder="Enter weight"
                value={this.state.user.weight.toString()}
                onChangeText={(weight) => this.updateWeight(weight)}
              />
      )
    }
    else{
      return(
         <TextInput
              maxLength={4}
              keyboardType="decimal-pad"
              style={styles.inputStyle}
              placeholder="Enter weight"
              onChangeText={(weight) => this.updateWeight(weight)}
            />
    )
    }
  }
    renderWaist(){
    if(this.state.user.waistSize){
      return(
            <TextInput
                maxLength={4}
                keyboardType="decimal-pad"
                style={styles.inputStyle}
                placeholder="Enter weight"
                value={this.state.user.waistSize.toString()}
                onChangeText={(weight) => this.updateWaist(weight)}
              />
      )
    }
    else{
      return(
          <TextInput
              maxLength={4}
              keyboardType="decimal-pad"
              style={styles.inputStyle}
              placeholder="Enter weight"
              onChangeText={(weight) => this.updateWaist(weight)}
            />
    )
    }
  }
  renderHip(){
    if(this.state.user.hipSize){
      return(
            <TextInput
                maxLength={4}
                keyboardType="decimal-pad"
                style={styles.inputStyle}
                placeholder="Enter height"
                value={this.state.user.hipSize.toString()}
                onChangeText={(height) => this.updateHip(height)}
              />
      )
    }
    else{
      return(
          <TextInput
              maxLength={4}
              keyboardType="decimal-pad"
              style={styles.inputStyle}
              placeholder="Enter height"
              onChangeText={(height) => this.updateHip(height)}
            />
    )
    }
  }
  renderHeight(){
    if(this.state.user.height){
      return(
            <TextInput
                maxLength={4}
                keyboardType="decimal-pad"
                style={styles.inputStyle}
                placeholder="Enter height"
                value={this.state.user.height.toString()}
                onChangeText={(height) => this.updateHeight(height)}
              />
      )
    }
    else{
      return(
          <TextInput
              maxLength={4}
              keyboardType="decimal-pad"
              style={styles.inputStyle}
              placeholder="Enter height"
              onChangeText={(height) => this.updateHeight(height)}
            />
    )
    }
  }
  calculateBMI(){
    var w = this.state.user.weight
    var h = this.state.user.height * 0.3
    return Math.round(w / h / h * 10) / 10
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.user && this.state.goalsList){
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
            <Text style={{
              fontSize:24,
              color:'white',
              marginLeft:30,
              marginTop:-10
            }}>My Health Profile</Text>
          </LinearGradient>
          <ScrollView>
          <View style={styles.inputForm}>
            <Text style={styles.label}>Your height(in feet)</Text>
            {this.renderHeight()}
            <Text style={styles.label}>Your weight(in KGs)</Text>
            {this.renderWeight()}
            <Text style={styles.label}>Your waist size(in inches)</Text>
            {this.renderWaist()}
            <Text style={styles.label}>Your hip size(in inches)</Text>
            {this.renderHip()}
            <Text style={styles.label}>Your fitness goal</Text>
            {this.renderGoal()}
            <Text style={styles.label}>How active are you?</Text>
            {this.renderActivity()}
            <Text style={styles.label}>How much do you smoke?</Text>
            {this.renderSmoking()}
            <Text style={styles.label}>How is your alcohol intake?</Text>
            {this.renderAlcohol()}
            <View style={styles.bottomSection}>
              <LinearGradient 
                  colors={['#e0e0e0', '#e0e0e0', '#e0e0e0']} style={{
                  width:width/2-45,
                  alignSelf:'center',
                  paddingTop:20,
                  paddingBottom:20,
                  marginRight:10,
                  borderRadius:5
                }}>
                <Text style={styles.mainText}>
                  BODY MASS INDEX</Text>
                <Text style={styles.subtext}>NORMAL</Text>
                <Text style={styles.bigNumber}>{this.calculateBMI()}</Text>
                
              </LinearGradient>
              <LinearGradient 
                  colors={['#e0e0e0', '#e0e0e0', '#e0e0e0']}  style={{
                  width:width/2-45,
                  alignSelf:'center',
                  paddingTop:20,
                  paddingBottom:20,
                  borderRadius:5
                }}>
                <Text style={styles.mainText}>
                  IDEAL WEIGHT</Text>
                <Text style={styles.subtext}>ACCORDING TO WEIGHT</Text>
                <Text style={styles.bigNumber}>67.23</Text>
              </LinearGradient>
          </View>
              <TouchableHighlight onPress={() =>this.updateMember()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Save</Text>
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
    height:140
  },
  bottomSection:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems:'center',
    width:width-60,
    alignSelf:'center',
    padding:10,
    paddingTop: 20
  },
  bigNumber:{
    fontWeight:'bold',
    fontSize:36,
    alignSelf:'center',
    color:'#565656'
  },
  subtext:{
    fontWeight:'300',
    fontSize:8,
    alignSelf:'center',
    color:'#565656'
  },
  mainText:{
    fontWeight:'bold',
    fontSize:12,
    alignSelf:'center',
    color:'#565656'
  },
  inputStyle:{
    width:width-80,
    height:40,
    paddingLeft: 5,
    borderBottomColor:'#E62221',
    borderBottomWidth: 1,
  },
  label:{
    color:'#E62221',
    marginTop: 15,
  },
  inputForm:{
    margin:20,
    padding:20,
    paddingTop:0,
    width:width-40,
    backgroundColor:'white'
  },
  loader:{
    marginTop:'100%',
  },
  login:{
    width:width-80,
    height:50,
    backgroundColor: '#E62221',
    borderRadius: 50,
    alignItems: 'center',
    padding:8,
    paddingTop:15,
    marginTop: 20,
  },
  loginText:{
    color:'white'
  },
});