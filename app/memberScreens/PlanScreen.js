import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, ButtonGroup } from 'react-native-elements';
import Moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator,
  BackHandler,
  Image
} from 'react-native';
import axios from 'axios';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import { NavigationEvents } from 'react-navigation';
export default class PlanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:false,
      index:0,
      user: this.props.navigation.state.params?JSON.parse(this.props.navigation.state.params.member):'',
      date:'',
      time:'',
      today:{}
    }
    
}
componentDidMount(){
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  AsyncStorage.getItem('member').then((member) => {
    if(member){
      this.getTodaysAppointment(JSON.parse(member).id)
      this.getTodaysWorkout(JSON.parse(member).id)
      this.getUser(JSON.parse(member).id)
    }
  })
  var endDate = new Date();
  endDate.setDate(endDate.getDate() + 5);
  this.setState({
    endDate:endDate
  })
  this.props.navigation.addListener('didFocus', () => this.updatePage()) 
}

updatePage(){
  AsyncStorage.getItem('member').then((member) => {
    if(member){
      this.getTodaysAppointment(JSON.parse(member).id)
      this.getTodaysWorkout(JSON.parse(member).id)
      this.getUser(JSON.parse(member).id)
    }
  })
}
onNavigatorEvent = event => {
  switch (event.id) {
    case 'willAppear':
        AsyncStorage.getItem('member').then((member) => {
          this.getTodaysAppointment(JSON.parse(member).id)
          this.getTodaysWorkout(JSON.parse(member).id)
          this.getUser(JSON.parse(member).id)
        })
        break;
    }
};
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  this.props.navigation.removeListener('didFocus', () => this.updatePage())
}
handleBackButton() {
  return true;
}
calculateIdealWeight(){
  if(this.state.user.height!=null){
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

getTodaysWorkout(id){
  this.setState({showLoader: true})
  axios.get(CONFIG.base_url + 'members/' +id + '/todaysWorkoutPlan')
   .then((response) => {
       if(response.data){
         this.setState({todayWorkout:response.data, showLoader: false})
       }  
       else this.setState({todayWorkout:null, fc:null})
       
   })
   .catch((error) => {
     this.setState({showLoader: false})
       console.log(error)
   })
}
getUser(id){
  this.setState({showLoader: true})
  axios.get(CONFIG.base_url + 'members/' +id)
   .then((response) => {
         this.setState({user:response.data, showLoader: false})
       
   })
   .catch((error) => {
     this.setState({showLoader: false})
     //alert("Subscribe now to unlock your dashboard.")
     console.log(error)
   })
}

getTodaysAppointment(id){
  this.setState({showLoader: true})
   axios.get(CONFIG.base_url + 'members/' +id + '/todaysAppointments')
    .then((response) => {
      this.setState({showLoader: false})
        if(response.data[0]){
          this.setState({today:response.data[0], fc:response.data[0].fitnessCenter})
        }  
        else this.setState({today:null, fc:null})
        
    })
    .catch((error) => {
      this.setState({showLoader: false})
        console.log(error)
    })
}
showLoader(){
  if(this.state.showLoader){
      return(
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="grey" />
        </View>
      )
  }
}
showLock(){
  if(!this.state.user.isMembershipActive){
      const { navigate } = this.props.navigation;
      return(
        <View style={styles.lock}>
            <Icon
              name='lock-outline'
              color='grey'
              size={48}
              containerStyle={{marginTop:(height-180)/2}}
              onPress={() => this.getUser(this.state.user.id)}
              underlayColor="transparent"
            />
            <Text style={styles.lockText}>You do not have any active membership.</Text>
            <TouchableHighlight onPress={() => navigate("Store")} underlayColor="transparent">
                <View style={styles.subscribe}>
                    <Text style={styles.subscribeText}>Subscribe Now</Text>
                </View>
            </TouchableHighlight>
        </View>
      )
  }
}
renderCloseButton(today){
  if(today.timeAttended==null){
    return(
      <Icon containerStyle={styles.delAppointment} color="#353535" name='close' onPress={() => this.deleteAppointment(this.state.today.id)}/>
    )
  }
}
renderUpdateAppointmentButton(today){
  const { navigate } = this.props.navigation;
  if(today.timeAttended==null){
    return(
      <TouchableHighlight onPress={() => navigate("AttendanceScanner", {appointment: JSON.stringify(this.state.today)})} underlayColor="transparent">
            <View style={styles.submitButton}>
                <Text style={styles.submitText}>Mark Attendance</Text>
            </View>
        </TouchableHighlight>
    )
  }
  else {
    return(
      <Icon
      raised
      name='done-all'
      color='white'
      size={14}
      containerStyle={styles.submitButton2}
      onPress={() => console.log('hello')} />
    )
  }
}

renderTodaysAppointment(){
  const { navigate } = this.props.navigation;
  if(this.state.today && this.state.fc){
    return(
      <View>
      <Text style={{marginLeft:25, fontSize:20, marginTop:15, marginBottom:10, fontWeight:'bold'}}>
                  Today's Appointment
      </Text>
        <LinearGradient colors={['#f7f7f7', '#f7f7f7', '#f7f7f7']} style={styles.appointmentBox}>

        <View style={{flexWrap: 'wrap',flexDirection: 'row'}}>
          <Icon name='calendar' size={19} type='simple-line-icon' color='#353535'/>
          <Text style={styles.appDate}>&nbsp;&nbsp;{Moment(this.state.today.date).format('DD MMM, ddd')}</Text>
        </View>
        <Text style={styles.appTime}>{this.state.today.timeSlot}</Text>
        <Text style={styles.appLocation}>{this.state.fc.name + ', ' + this.state.fc.location} </Text>
        {this.renderCloseButton(this.state.today)}
        {this.renderUpdateAppointmentButton(this.state.today)}
      </LinearGradient>
      <TouchableHighlight onPress={() => navigate("AllAppointments")} underlayColor="transparent">
         <View style={styles.appButton}>
             <Text style={styles.appText}>View All Appointments ></Text>
         </View>
       </TouchableHighlight>
      </View>
    )
  }
  else {
    return(
      <View>
        <Text style={{marginLeft:25, fontSize:18, marginTop:10, marginBottom:0, fontWeight:'bold'}}>
            No appointment for today. Book Now!
        </Text>
         <TouchableHighlight onPress={() => navigate("AllAppointments")} underlayColor="transparent">
         <View style={styles.appButton}>
             <Text style={styles.appText}>View All Appointments ></Text>
         </View>
       </TouchableHighlight>
       </View>
    )
  }
}

  static navigationOptions = {
    title: 'Plan',
    header: null
    };
  
  updateIndex = (index) => {
    this.setState({index})
  }
  
  deleteAppointment(id){
    Alert.alert(
      'Cancel appointment',
      'Are you sure you want to cancel the appointment?',
      [
        {text: 'No', onPress: () => console.log('Ask me later pressed')},
        {text: 'Yes', onPress: () => this.cancelAppointment(id)},
      ],
      { cancelable: true }
    )
  }
  cancelAppointment(id){
    axios.delete(CONFIG.base_url +'appointments/' + id)
    .then((response) => {
      alert("Appointment has been cancelled.")
      this.getTodaysAppointment(this.state.user.id)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  RenderPlan(index) {
    const i = index;
    if (i==0) {
      if(this.state.todayWorkout){
        return(<View style={styles.schedule}>
          <Text style={{marginLeft:25, fontSize:20, marginTop:25, marginBottom:10, fontWeight:'bold'}}>
            Today's Workout Schedule
          </Text>
          <View style={{
                borderBottomColor: '#e4e4e4',
                borderBottomWidth: 1,
                width:width,
                alignSelf:'center',
                marginTop:10
              }}
            />
            <View>
            {
            this.state.todayWorkout
              .map((item, i) => (
                <View style={styles.scheduleItem} key={i}>
                <Icon name='radio-button-unchecked' containerStyle={{position:'absolute', left:10, top:12}}/>
                  <Text style={styles.activityName}>{item.exerciseName} - {item.sets}</Text>
                  <Text style={styles.reps}>{item.repititions}</Text>
                </View>
              ))
            }
            </View>
      </View> )
      }
      else{
        return(
          <View style={styles.schedule}>
          <Text style={{marginLeft:25, fontSize:24, marginTop:25, marginBottom:10, fontWeight:'bold'}}>
            Today's Workout Schedule
          </Text>
          <View style={{
                borderBottomColor: '#e4e4e4',
                borderBottomWidth: 1,
                width:width,
                alignSelf:'center',
                marginTop:10
              }}
            />
            <Text style={{marginBottom:10, fontSize:14, marginTop:20,textAlign:'center'}}>Loading today's workout plan.</Text>
            <ActivityIndicator size="small" color="grey" />
            </View>
        )
      }
      
    }
    else {
      return  (
          <View style={styles.schedule}>
            <Text style={{marginLeft:25, fontSize:20, marginTop:25, marginBottom:10, fontWeight:'bold'}}>
              Today's Diet Schedule
            </Text>
            <View style={{
                borderBottomColor: '#e4e4e4',
                borderBottomWidth: 1,
                width:width,
                alignSelf:'center',
                marginTop:10
              }}
            />
             <Text style={{marginLeft:25, marginBottom:10, fontSize:14, marginTop:20}}>No diet plan assigned yet.</Text>
      </View> 
      )
    }
  }
  appointmentButton(){
    const { navigate } = this.props.navigation;
    if(this.state.user.isMembershipActive){
      return(
        <Icon raised reverse name='add' color='#E62221'
              containerStyle={{
                position:'absolute', 
                bottom:10,
                zIndex:2,
                right:10,
                shadowColor: '#7f7f7f',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5
              }}
              onPress={() => {navigate("BookAppointment")}}
            />
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.user && this.state.endDate){
      return (
        <View style={styles.container}>
          {this.showLock()}
            {this.appointmentButton()}
            <LinearGradient colors={['transparent', 'transparent']} style={styles.headDesign}>
            <Text style={styles.welcomeName}>Welcome, {this.state.user.name}</Text>
            <View style={styles.stats}>
                <View style={styles.bmi}>
                  <Text style={styles.bmiText}>YOUR BMI</Text>
                  {/* <Text style={styles.bmiStatus}>{this.getBMIstatus()}</Text> */}
                  <Text style={styles.bmiValue}>{this.calculateBMI()}</Text>
                </View>
                <View style={styles.bmi}>
                  <Text style={styles.bmiText}>IDEAL WEIGHT</Text>
                  {/* <Text style={styles.bmiStatus}>ACCORDING TO HEIGHT</Text> */}
                  <Text style={styles.bmiValue}>{this.calculateIdealWeight()}</Text>
                </View>
            </View>
            <Image source={require('../assets/graph.png')}
                  style={{width:width, height:180, position: 'absolute', top:0, zIndex:-1}}
                  resizeMode="cover">
              </Image>
          </LinearGradient>
          <ButtonGroup
                selectedBackgroundColor="pink"
                onPress={this.updateIndex}
                selectedIndex={this.state.index}
                buttons={['Workout', 'Diet']}
                containerStyle={{height: 40, borderWidth:0}}
                buttonStyle={{
                  borderWidth:0, 
                  backgroundColor:'white', 
                  borderBottomColor:'white', 
                  borderBottomWidth:2
                }}
                selectedButtonStyle={{borderBottomColor:'#E62221', borderBottomWidth:2}} />
            <View style={styles.innerContainer} >
            {this.showLoader()}
              <ScrollView>
                  {this.renderTodaysAppointment()}
                 {this.RenderPlan(this.state.index)}
              </ScrollView>
          </View>
        </View>
      );
    }
    return(
      <View style={{height:"100%"}}>
          <View style={styles.ploader}>
              <ActivityIndicator size="large" color="grey" />
          </View>
      </View>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer:{
    justifyContent: 'center',
    height:"100%"
  },
  inputStyle:{
    width:width-80,
    height:50,
    paddingLeft: 5,
    borderBottomColor:'#E62221',
    borderBottomWidth: 1,
    padding:10
  },
  label:{
    color:'#E62221',
    marginTop: 25,
  },
  inputStyleDate:{
    width:width-80,
    height:50,
    borderBottomColor:'#E62221',
    borderBottomWidth: 1,
  },
  optionLogo:{
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius:7
  },
  schedule:{
    marginBottom: 50,
    paddingBottom: 50
  },
  scheduleItem:{
    width:width-40,
    marginLeft:20,
    marginRight:20,
    borderBottomWidth:1,
    borderBottomColor:'#e4e4e4',
    height:50
  },
  activityName:{
    position:'absolute',
    left:40,
    top:16
  },
  reps:{
    position:'absolute',
    right:10,
    top:16,
    fontSize:12
  },
  closeButton:{
      width:30,
      height:30,
      alignSelf:'flex-end'
  },
  headDesign:{
    width:width,
    height:180
  },
  welcomeName:{
    fontSize:26,
    fontWeight: 'bold',
    color:'#3f3f3f',
    margin:30,
  },
  appointmentBox:{
    width:width-40,
    margin:20,
    marginTop:10,
    marginBottom:10,
    borderRadius:10,
    padding:10,
    shadowOffset:{  width: 0,  height: 4,  },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 7,
  },
  appDate:{
    fontSize:20,
    color:'#353535'
  },
  appTime:{
    fontSize:16,
    color:'#353535',
    marginTop:10
  },
  appLocation:{
    fontSize:12,
    color:'#353535',
    position:'absolute',
    paddingTop: 70,
    paddingLeft: 10,
  },
  appButton:{
    backgroundColor:'transparent',
    width:"auto",
    borderRadius:5,
    marginLeft: 25
  },
  appText:{
    fontSize:14,
    color:'grey'
  },
  submitButton:{
    backgroundColor:'#E62221',
    right:0,
    bottom:0,
    width:140,
    borderRadius:5,
    padding:10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: width-200,
  },
  submitButton2:{
    backgroundColor:'#35991a',
    right:0,
    bottom:0,
    marginLeft: width-95,
    marginTop: -20,
  },
  submitText:{
    fontSize:14,
    color:'white'
  },
  submitText2:{
    fontSize:14
  },
  delAppointment:{
    position:'absolute',
    top:10,
    right:10
  },
  loader:{
    width:width,
    height:"100%",
    position:'absolute',
    zIndex:100,
    backgroundColor:"rgba(255,255,255,1)",
    paddingTop:"60%",
    marginTop:160,
  },
  ploader:{
    width:width,
    height:"100%",
    position:'absolute',
    zIndex:100,
    backgroundColor:"rgba(255,255,255,1)",
    paddingTop:"100%",
    elevation: 10,
  },
  lock:{
    backgroundColor:"rgba(255,255,255,0.5)",
    position:'absolute',
    height:height-120,
    marginTop: 180,
    zIndex:100,
    alignItems: 'center',
    width:width
  },
  lockText:{
    color:'grey',
    textAlign:'center',
    marginTop: 10,
  },
  subscribe:{
    backgroundColor:'#E62221',
    right:0,
    bottom:0,
    width:width-200,
    borderRadius:30,
    padding:10,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 10,
  },
  subscribeText:{
    fontSize:16,
    color:'white',
    textAlign:'center'
  },
  stats:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    width:width-60,
    padding:10,
    marginTop: -20,
  },
  bmi:{
    width:100,
    marginLeft: 20,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#f7f7f7',
    elevation: 7,
    borderRadius:6,
    padding:10,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  bmiText:{
    color:'#3f3f3f',
    fontSize:9,
    fontWeight: 'bold',
    textAlign:'center'
  },
  bmiStatus:{
    color:"#3f3f3f",
    fontSize:8,
    textAlign:'center'
  },
  bmiValue:{
    fontSize: 26,
    color:'#3f3f3f',
    textAlign:'center'
  }

});