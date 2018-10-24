import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
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
import CONFIG from '../config/config'
const optionsAlcohol = [
  "Heavy",
  "Moderate",
  "Non Alcoholic",
  "Used to drink",
  "Cancel"
]
const optionsSmoking = [
  "Heavy",
  "Moderate",
  "Non Smoker",
  "Used to Smoke",
  "Cancel"
]
const optionsActivity = [
  "Sedentary",
  "Low Activity Level",
  "Active",
  "Very Active",
  "Cancel"
]
export default class HealthProfileScreen extends Component {
  constructor(props) {
    super(props);
      this.state ={
          goalsList:[],
          optionsGoalList:[]
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
            user.goal = response.data
            this.setState({goalId:response.data.id})
        })
        .catch((error) => {
            console.log(error)
        })
      this.setState({user:user})
    })
  }
  optionsGoalList = []
  optionsGoalListID = []
  goalMap = new Object();
  componentDidMount(){
      axios.get(CONFIG.base_url + 'goals')
      .then((response) => {
          var goals = response.data._embedded.goals;
          for(var i=0; i<goals.length; i++){
            this.goalMap[goals[i].id] = goals[i];
          }
          this.setState({ 
              goalMap: this.goalMap,
          })
          this.setOptions(goals)
      })
      .catch((error) => {
          console.log(error)
      }) 
  }
  setOptions(goalList){
    for(var i=0; i<goalList.length; i++){
        this.optionsGoalList.push(goalList[i].name)
        this.optionsGoalListID.push(goalList[i].id)
    }
    this.optionsGoalList.push("Cancel")
    this.setState({
        optionsGoalList:this.optionsGoalList,
        optionsGoalListID: this.optionsGoalListID
    })
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

  getGoal(){
    this.setState({showLoader: true})
    var goalURL = this.state.user._links.goal.href
    axios.get(goalURL)
        .then((response) => {
          var member  = this.state.user
          member.goal = response.data
          this.setState({user:member, showLoader: false})
        })
        .catch((error) => {
            alert(error)
            this.setState({showLoader: false})
        })
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
    var user = this.state.user;
    user.goal = this.state.goalMap[itemIndex]
    user.goalID = this.state.goalMap[itemIndex].id
    this.setState({user:user})
  }
  async saveItem(item, selectedValue) {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        alert("AsyncStorage error")
        console.error('AsyncStorage error: ' + error.message);
    }
  }
  updateMember(){
    var member = this.state.user
    if(member.goal) 
    {
      delete member.goal
    }
    if(parseFloat(member.height)>10 || parseFloat(member.height)<3){
      alert("Your height seems to be incorrect. Please verify.")
    }
    else if(parseFloat(member.weight)>200 ||parseFloat(member.weight)<30){
      alert("Your weight seems to be incorrect. Please verify.")
    }
    else{
      this.setState({showLoader: true})
      axios.put(CONFIG.base_url + 'members/'+this.state.user.id, member)
      .then((response) => {
          axios.get(CONFIG.base_url + 'members/'+this.state.user.id)
          .then((response) => {
              this.saveItem('member', JSON.stringify(response.data))
              this.setState({user:response.data})
              alert("Member details updated.")
              const { navigate } = this.props.navigation;
              navigate("Profile")
              this.setState({showLoader: false})
          })
          .catch((error) => {
              console.log(error)
              alert(error)
              this.setState({showLoader: false})
          })
      })
      .catch((error) => {
          console.log(error)
          alert(error)
          this.setState({showLoader: false})
      })
    }
    }

  showActionSheetAlcohol = () => {
    this.ActionSheetAlcohol.show()
  }
  showActionSheetSmoking = () => {
    this.ActionSheetSmoking.show()
  }
  showActionSheetActivity = () => {
    this.ActionSheetActivity.show()
  }
  showActionSheetGoal = () => {
    this.ActionSheetGoal.show()
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
                placeholder="Enter waist"
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
              placeholder="Enter waist"
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
                placeholder="Enter hip size"
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
              placeholder="Enter hip size"
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
  calculateIdealWeight(){
    if(parseFloat(this.state.user.height)>0){
      var height = this.state.user.height;
      var heightFoot = parseInt(this.state.user.height);
      var heightInches = parseFloat(this.state.user.height)-heightFoot;
      var idealWeight = "NA";
      if(this.state.user.gender=="Male"){
        if(height) idealWeight = height>5 ? 56.2+heightInches*1.42:56.2
      }
      else if(this.state.user.gender=="Female"){
        if(height) idealWeight = height>5 ? 53.1+heightInches*1.35:53.1
      }
      return idealWeight.toFixed(2);
    }
    else return "NA"
  }
  
  getBMIstatus(){
    var bmi = parseFloat(this.calculateBMI());
    if(bmi<=18.5) return "UNDERWEIGHT";
    else if(bmi>18.5 && bmi<=24.9) return "NORMAL"
    else if(bmi>24.9 && bmi<=29.9) return "OVERWEIGHT"
    else if(bmi>29.9) return "OBESE"
    else return " "
  }
  calculateBMI(){
    if(this.state.user.height!=null && this.state.user.weight!==null){
      var w = this.state.user.weight
      var h = this.state.user.height * 0.3
      if(w && h)
      return Math.round(w / h / h * 10) / 10
      else 
      return "NA"
    }
    else return "NA"
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.user && this.state.optionsGoalList.length>0){
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
            <TouchableHighlight onPress={this.showActionSheetGoal} underlayColor="transparent">
                <View style={styles.row}>
                    <Text style={styles.centerText} >{this.state.user.goal? this.state.user.goal.name: "Select Goal"}</Text> 
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
                    ref={o => this.ActionSheetGoal = o}
                    title={'Fitness Goal?'}
                    options={this.optionsGoalList}
                    cancelButtonIndex={this.optionsGoalList.length-1}
                    destructiveButtonIndex={this.optionsGoalList.length-1}
                    onPress={(index) => { 
                            if(index!=this.optionsGoalList.length-1){
                              this.updateGoal(this.optionsGoalListID[index])
                            }
                    }}
                />
            <Text style={styles.label}>How active are you?</Text>
            <TouchableHighlight onPress={this.showActionSheetActivity} underlayColor="transparent">
              <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.user.activityStatus?this.state.user.activityStatus: "Select daily activity"}</Text> 
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
              ref={o => this.ActionSheetActivity = o}
              title={'Daily activity?'}
              options={optionsActivity}
              cancelButtonIndex={4}
              destructiveButtonIndex={4}
              onPress={(index) => { 
                      if(index!=4){
                        var tempMember = this.state.user;
                        tempMember.activityStatus = optionsActivity[index]
                        this.setState({user:tempMember})
                      }
              }}/>
            <Text style={styles.label}>How much do you smoke?</Text>
            <TouchableHighlight onPress={this.showActionSheetSmoking} underlayColor="transparent">
              <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.user.smokingStatus?this.state.user.smokingStatus: "Select smoking intake"}</Text> 
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
              ref={o => this.ActionSheetSmoking = o}
              title={'Smoking intake?'}
              options={optionsSmoking}
              cancelButtonIndex={4}
              destructiveButtonIndex={4}
              onPress={(index) => { 
                      if(index!=4){
                        var tempMember = this.state.user;
                        tempMember.smokingStatus = optionsSmoking[index]
                        this.setState({user:tempMember})
                      }
              }}/>
            <Text style={styles.label}>How is your alcohol intake?</Text>
              <TouchableHighlight onPress={this.showActionSheetAlcohol} underlayColor="transparent">
              <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.user.alcoholStatus?this.state.user.alcoholStatus: "Select alcohol intake"}</Text> 
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
              ref={o => this.ActionSheetAlcohol = o}
              title={'Alcohol intake?'}
              options={optionsAlcohol}
              cancelButtonIndex={4}
              destructiveButtonIndex={4}
              onPress={(index) => { 
                      if(index!=4){
                        var tempMember = this.state.user;
                        tempMember.alcoholStatus = optionsAlcohol[index]
                        this.setState({user:tempMember})
                      }
              }}/>
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
                <Text style={styles.subtext}>{this.getBMIstatus()}</Text>
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
                <Text style={styles.bigNumber}>{this.calculateIdealWeight()}</Text>
              </LinearGradient>
          </View>
              <TouchableHighlight onPress={() =>this.updateMember()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Save</Text>
                  </View>
              </TouchableHighlight>
          </View>
      </ScrollView>
        </KeyboardAvoidingView>
      );
    }
    else{
      return(
        <View style={{height:"100%"}}>
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
          <View style={styles.ploader}>
              <ActivityIndicator size="large" color="grey" />
          </View>
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
  row:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth:1,
    borderBottomColor: '#E62221',
    width:width-80,
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
    width:width,
    height:"100%",
    position:'absolute',
    zIndex:100,
    backgroundColor:"rgba(255,255,255,1)",
    paddingTop:"75%",
    marginTop:140
  }
});