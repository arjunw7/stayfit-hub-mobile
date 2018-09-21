import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from 'react-native-picker-dropdown';
import Moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  ScrollView,
  Modal,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

import axios from 'axios';
import CONFIG from '../config/config'
import DatePicker from 'react-native-datepicker'
import { ButtonGroup, Header, Icon } from 'react-native-elements';
var width = Dimensions.get('window').width;
export default class PlanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:false,
      bookingModalVisible: false,
      queryModalVisible: false,
      index:0,
      date:'',
      time:'',
      bookingTime: '04:00 PM',
      fitnessCentersList:[],
      today:{}
    }
    axios.get(CONFIG.base_url + 'fitnessCenters')
    .then((response) => {
        this.setState({fitnessCentersList:response.data._embedded.fitnessCenters})
    })
    .catch((error) => {
        alert(error)
    })
    
}
componentWillMount(){
  AsyncStorage.getItem('member').then((member) => {
    this.setState({user:JSON.parse(member)})
    this.getTodaysAppointment(JSON.parse(member).id)
  })
  var endDate = new Date();
    endDate.setDate(endDate.getDate() + 5);
    this.setState({
      endDate:endDate
    })
}
getTodaysAppointment(id){
   axios.get(CONFIG.base_url + 'members/' +id + '/todaysAppointments')
    .then((response) => {
        if(response.data[0]){
          this.setState({today:response.data[0], fc:response.data[0].fitnessCenter})
        }  
        else this.setState({today:null, fc:null})
    })
    .catch((error) => {
        alert(error)
    })
}
renderFitnessCenter(){
  if(this.state.fitnessCentersList){
    return(
      <Picker
              selectedValue={this.state.fitnessCenter}
              style={styles.inputStyle}
              placeholder="Select trainer"
              onValueChange={(itemValue) => this.setState({fitnessCenter:itemValue})}>
              {
                this.state.fitnessCentersList
                .map((item, i) => (
                  <Picker.Item key={i} label={item.name} value={item.id} />
                ))
              }
        </Picker>
    )}
    else {
      return(
      <Picker

            style={styles.inputStyle}
            placeholder="Select trainer"
            onValueChange={(itemValue) => this.setState({fitnessCenter:itemValue})}>
            {
              this.state.fitnessCentersList
              .map((item, i) => (
                <Picker.Item key={i} label={item.name} value={item.id} />
              ))
            }
      </Picker>
    )
    }
}
renderTodaysAppointment(){
  const { navigate } = this.props.navigation;
  if(this.state.today && this.state.fc){
    return(
      <View>
      <Text style={{marginLeft:25, fontSize:24, marginTop:10, marginBottom:10, fontWeight:'bold'}}>
                  Today's Appointment
      </Text>
        <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.appointmentBox}>
        <Text style={styles.appDate}>{Moment(this.state.today.date).format('DD MMM, ddd')}</Text>
        <Text style={styles.appTime}>{this.state.today.timeSlot}</Text>
        <Text style={styles.appLocation}>{this.state.fc.name + ', ' + this.state.fc.location} </Text>
        <Icon containerStyle={styles.delAppointment} color="white" name='close' onPress={() => this.deleteAppointment(this.state.today.id)}/>
        <TouchableHighlight onPress={() => navigate("AttendanceScanner")}
            underlayColor="transparent">
            <View style={styles.submitButton}>
                <Text style={styles.submitText}>Mark Attendance</Text>
            </View>
        </TouchableHighlight>
      </LinearGradient>
      </View>
    )
  }
  else {
    return(
        <Text style={{marginLeft:25, fontSize:18, marginTop:10, marginBottom:10, fontWeight:'bold'}}>
            No appointment for today. Book Now!
      </Text>
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
  
  setBookingModalVisible(visible) {
    this.setState({bookingModalVisible: visible});
  }
  setQueryModalVisible(visible) {
    this.setState({queryModalVisible: visible});
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
        alert(error)
    })
  }

  RenderPlan(index) {
    const i = index;
    if (i==0) {
      return  (
          <View style={styles.schedule}>
          <Text style={{marginLeft:25, fontSize:24, marginTop:20, marginBottom:10, fontWeight:'bold'}}>
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
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' containerStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Push Up Burpees - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' containerStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Overhead Squats - 16</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' containerStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Half Crunches - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View >
              <View style={styles.scheduleItem}>
                <Icon name='radio-button-unchecked' containerStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Flutter Kicks - 20</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
            </View>
            <Text style={{marginLeft:25, fontSize:16, marginTop:20, marginBottom:10, fontWeight:'300'}}>
              Completed
            </Text>
            <View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' containerStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Push Up Burpees - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' containerStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Overhead Squats - 16</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' containerStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Half Crunches - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View >
              <View style={styles.scheduleItem}>
                <Icon name='check-circle' containerStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Flutter Kicks - 20</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
            </View>
      </View> 
      )
    }
    else {
      return  (
          <View style={styles.schedule}>
            <Text style={{marginLeft:25, fontSize:24, marginTop:20, marginBottom:10, fontWeight:'bold'}}>
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
            <View>
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' containerStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Fruits Oats Bowl</Text>
                <Text style={styles.reps}>1 serving</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' containerStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Dry Fruits</Text>
                <Text style={styles.reps}>1 serving</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' containerStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>1 Chapati, Veg Curry</Text>
                <Text style={styles.reps}>1 serving</Text>
              </View >
              <View style={styles.scheduleItem}>
                <Icon name='radio-button-unchecked' containerStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Flutter Kicks - 20</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
            </View>
            <Text style={{marginLeft:25, fontSize:16, marginTop:20, marginBottom:10, fontWeight:'300'}}>
              Completed
            </Text>
            <View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' containerStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Push Up Burpees - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' containerStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Overhead Squats - 16</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' containerStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Half Crunches - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View >
              <View style={styles.scheduleItem}>
                <Icon name='check-circle' containerStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Flutter Kicks - 20</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
            </View>
      </View> 
      )
    }
  }
  addBooking(){
    axios.get(CONFIG.base_url +'fitnessCenters/'+ this.state.fitnessCenter)
    .then((response) => {
        console.log(response)
        this.setState({fitnessCenterData:response.data})
        var booking = {
          date: this.state.bookingDate,
          timeSlot: this.state.bookingTime,
          fitnessCenter: response.data
        }    
        if(!booking.date || !booking.timeSlot || !booking.fitnessCenter){
          alert("Please select date, time and fitness center.")
        }
        else{
          axios.post(CONFIG.base_url + 'members/' + this.state.user.id + '/addAppointments', booking)
            .then((response) => {
              if(response.data.error=='OK'){
                alert(response.data.message)
              }
              else{
                 alert("Appointment confirmed.")
                this.getTodaysAppointment(this.state.user.id)
              }  
            })
            .catch((error) => {
                alert(error)
            })
        }
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })

  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.user && this.state.endDate){
      return (
        <View style={styles.container}>
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
              onPress={() => {this.setBookingModalVisible(!this.state.bookingModalVisible)}}
            />
           <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.bookingModalVisible}>
              <View style={{margin: 22}}>
                  <View>
                    <Icon  iconStyle={styles.closeButton}  name='close' onPress={() => this.setBookingModalVisible(!this.state.bookingModalVisible)}/>
                    <View>
                      <Text style={styles.ModalHead}>Book Your Class</Text>
                    </View>
                    <View style={styles.modalBox}>
                    <Text style={styles.label}>Select Booking Slot</Text>
                    <Picker
                      selectedValue={this.state.bookingTime}
                      style={styles.inputStyle}
                      onValueChange={(itemValue) => this.setState({bookingTime: itemValue})}>
                      <Picker.Item label="09:30 AM" value="09:30 AM" />
                      <Picker.Item label="10:00 AM" value="10:00 AM" />
                      <Picker.Item label="10:30 AM" value="10:30 AM" />
                      <Picker.Item label="11:00 AM" value="11:00 AM" />
                      <Picker.Item label="02:30 PM" value="02:30 PM" />
                      <Picker.Item label="03:00 PM" value="02:00 PM" />
                      <Picker.Item label="03:30 PM" value="03:30 PM" />
                      <Picker.Item label="04:00 PM" value="03:00 PM" />
                      <Picker.Item label="04:30 PM" value="04:30 PM" />
                      <Picker.Item label="05:00 PM" value="04:00 PM" />
                      <Picker.Item label="05:30 PM" value="05:30 PM" />
                      <Picker.Item label="06:00 PM" value="05:00 PM" />
                      <Picker.Item label="06:30 PM" value="06:30 PM" />
                      <Picker.Item label="07:00 PM" value="06:00 PM" />
                      <Picker.Item label="07:30 PM" value="07:30 PM" />
                      <Picker.Item label="08:00 PM" value="07:00 PM" />
                      <Picker.Item label="08:30 PM" value="08:30 PM" />
                      <Picker.Item label="09:00 PM" value="08:00 PM" />
                      <Picker.Item label="09:30 PM" value="09:30 PM" />
                    </Picker>
                    <Text style={styles.label}>Select Booking Date</Text>
                    <DatePicker
                     style={styles.inputStyleDate}
                      date={this.state.bookingDate}
                      underlayColor="transparent"
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate={new Date()}
                      maxDate={this.state.endDate}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          borderWidth:0,
                          paddingLeft:6,
                          marginTop:6,
                          paddingTop:0,
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
                      onDateChange={(date) => {this.setState({bookingDate: date})}}>
                    </DatePicker>
                    <Text style={styles.label}>Select Center</Text>
                      {this.renderFitnessCenter()}
                    </View>
                    <TouchableHighlight onPress={() =>this.addBooking(!this.state.bookingModalVisible)} underlayColor="transparent">
                        <View style={styles.book}>
                          <Text style={styles.bookText}>Book Now</Text>
                        </View>
                    </TouchableHighlight>
                  </View>
              </View>
          </Modal>
          <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.queryModalVisible}>
              <View style={{margin: 22}}>
                  <View>
                    <Icon  iconStyle={styles.closeButton}  name='close' onPress={() => this.setQueryModalVisible(!this.state.queryModalVisible)}/>
                    <View>
                      <Text style={styles.ModalHead}>Ask You Trainer</Text>
                    </View>
                    <TouchableHighlight onPress={() =>this.setQueryModalVisible(!this.state.queryModalVisible)} underlayColor="transparent">
                        <View style={styles.book}>
                          <Text style={styles.bookText}>Raise Question</Text>
                        </View>
                    </TouchableHighlight>
                  </View>
              </View>
          </Modal>
          <View style={styles.innerContainer}>
          <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
            <Text style={styles.welcomeName}>Hi, {this.state.user.name}</Text>
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
              <ScrollView>
                  {this.renderTodaysAppointment()}
                 {this.RenderPlan(this.state.index)}
              </ScrollView>
          </View>
        </View>
      );
    }
    return(
      <View></View>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer:{
    justifyContent: 'center'
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
  modalBox:{
    width:width-80,
    padding:20
  },
  statBox:{
    width: width-40,
    borderRadius:7,
    marginLeft:20,
    height:60,
    marginTop:10,
    backgroundColor:'#e4e4e4',
    padding:20
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
  level:{
    backgroundColor:'#E62221',
    position:'absolute',
    zIndex:2,
    width:100,
    padding:5,
    alignSelf:'flex-start',
    color:'white',
    fontSize:16,
    alignItems: 'flex-start',
    margin:15,
    height:30,
    paddingLeft:10,
    borderRadius:10,
  },
  closeButton:{
      width:30,
      height:30,
      alignSelf:'flex-end'
  },
  ModalHead:{
    fontSize:24,
    margin:20,
    alignSelf:'center'
  },
  book:{
    width:width-80,
    height:50,
    backgroundColor: '#E62221',
    borderRadius: 50,
    margin: 20,
    alignItems: 'center',
    padding:15,
    marginTop:100
  },
  bookText:{
    color:'white'
  },
  headDesign:{
    width:width,
    height:120
  },
  welcomeName:{
    fontSize:26,
    fontWeight: 'bold',
    color:'white',
    margin:30,
  },
  appointmentBox:{
    width:width-40,
    margin:20,
    marginTop:10,
    marginBottom:10,
    borderRadius:10,
    padding:10
  },
  appDate:{
    fontSize:20,
    color:'white'
  },
  appTime:{
    fontSize:16,
    color:'white',
    marginTop:10
  },
  appLocation:{
    fontSize:16,
    color:'white'
  },
  submitButton:{
    position:'absolute',
    backgroundColor:'white',
    right:0,
    bottom:0,
    borderRadius:5,
    padding:10,
    paddingTop: 5,
    paddingBottom: 5
  },
  submitText:{
    fontSize:14
  },
  delAppointment:{
    position:'absolute',
    top:10,
    right:10
  }
});