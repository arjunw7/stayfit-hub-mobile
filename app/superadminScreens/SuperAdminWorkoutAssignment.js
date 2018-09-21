import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import GradientHeader from '../components/GradientHeader'
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown';
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class SuperAdminWorkoutAssignment extends Component {
  constructor(props) {
    super(props);
    state={
        memberID: '',
        planID: '',
        startDate:'',
        endDate:''
    }
    axios.get(CONFIG.base_url +'members')
        .then((response) => {
            console.log(response)
            this.setState({membersList:response.data._embedded.members})
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        })
    axios.get(CONFIG.base_url + 'workoutPlans')
    .then((response) => {
        console.log(response)
        this.setState({plansList:response.data._embedded.workoutPlans})
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })
}
componentWillMount = () => {
  var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    this.setState({
        maxDate:maxDate
    })
}

static navigationOptions = {
    title: 'Workouts',
    header: null
}
addWorkoutAssignment(){
    var workoutAssignment = {
        memberId: this.state.memberID,
        planId: this.state.planID,
        startDate:this.state.startDate,
        endDate:this.state.endDate
    }
    if(!this.state.memberId || !this.state.planId || !this.state.startDate || !this.stare.endDate){
        alert("All fields ae mandatory.")
    }
    else if(this.state.startDate==this.state.endDate){
        alert("Start date and end date cannot be same")
    }
    else{
         axios.post(CONFIG.base_url + 'workoutAssignment', workoutAssignment)
        .then((response) => {
            alert("Workout assigned to the user.")
        })
        .catch((error) => {
            alert(error)
        })
    }
   

}
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.membersList && this.state.plansList){
      return (
        <View style={styles.container}>
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
          }}>Workout Assignment</Text>
        </LinearGradient>
           <ScrollView>
           <View style={styles.inputForm}>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <Picker
                    selectedValue={this.state.memberID}
                    style={styles.inputStyle}
                    placeholder="Select center"
                    onValueChange={(itemIndex) => {this.setState({memberID: itemIndex})}}>      
                    {
                      this.state.membersList
                      .map((item, i) => (
                        <Picker.Item key={i} label={item.name} value={item.id} />
                      ))
                    }
              </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <Picker
                    selectedValue={this.state.planID}
                    style={styles.inputStyle}
                    placeholder="Select plan"
                    onValueChange={(itemIndex) => {this.setState({planID: itemIndex})}}>      
                    {
                      this.state.plansList
                      .map((item, i) => (
                        <Picker.Item key={i} label={item.name} value={item.id} />
                      ))
                    }
              </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <DatePicker
                      style={styles.inputStyle2}
                      mode="date"
                      date={this.state.startDate}
                      maxDate={this.state.maxDate}
                      minDate={new Date()}
                      confirmBtnText="Confirm"
                      placeholder="Select start date"
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
                      onDateChange={(startDate) => {this.setState({startDate: startDate})}}>
                </DatePicker>
            </View>
            <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <DatePicker
                      style={styles.inputStyle2}
                      mode="date"
                      date={this.state.endDate}
                      maxDate={this.state.maxDate}
                      minDate={new Date()}
                      confirmBtnText="Confirm"
                      placeholder="Select end date"
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
                      onDateChange={(endDate) => {this.setState({endDate: endDate})}}>
                </DatePicker>
            </View>
              
              <TouchableHighlight onPress={() =>this.addWorkoutAssignment()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Assign Workout</Text>
                  </View>
              </TouchableHighlight>
           </View>
           </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.loader}>
      <ActivityIndicator size="large" color="black" />
    </View>
    )
    
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