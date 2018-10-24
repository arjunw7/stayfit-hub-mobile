import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  TouchableHighlight, 
  Text,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ActionSheet from 'react-native-actionsheet'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import axios from 'axios';
import CONFIG from '../config/config'
import { Avatar, Icon } from 'react-native-elements';
import Moment from 'moment';
var width = Dimensions.get('window').width;
const optionsTime = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "Cancel"
]

export default class BookAppointment extends Component{
    static navigationOptions = {
        title: 'Book Appointment',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedCenter:'',
            bookingDateText: '',
            bookingDate: '',
            optionsFClist:[]
        }
    }
    optionsFClist = []
    optionsFClistID = []
  
    componentWillMount() {
        AsyncStorage.getItem('member').then((member) => {
            this.setState({ user: JSON.parse(member) })
        })
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 5);
        this.setState({
            endDate:endDate
        })
    }
    componentDidMount(){
        this.setState({showLoader: true})
        axios.get(CONFIG.base_url + 'fitnessCenters')
        .then((response) => {
            this.setState({ 
                fitnessCenters: response.data._embedded.fitnessCenters,
                showLoader: false
            })
            this.setOptions(response.data._embedded.fitnessCenters)
        })
        .catch((error) => {
            console.log(error)
            this.setState({showLoader: true})
        }) 
    }
    setOptions(fcList){
        for(var i=0; i<fcList.length; i++){
            this.optionsFClist.push(fcList[i].name)
            this.optionsFClistID.push(fcList[i].id)
        }
        this.optionsFClist.push("Cancel")
        this.setState({
            optionsFClist:this.optionsFClist,
            optionsFClistID: this.optionsFClistID
        })
    }
    showActionSheet = () => {
        this.ActionSheet.show()
    }
    showActionSheetForTime = () => {
        this.ActionSheetTime.show()
    }

    onBookingDatePress = () => {
        let bookingDate = this.state.bookingDate;
        if(!bookingDate || bookingDate == null){
        bookingDate = new Date();
        this.setState({
            bookingDate: bookingDate
        });
        }
        this.refs.bookingDateDialog.open({
        date: bookingDate,
        maxDate: this.state.endDate,
        minDate: new Date() //To restirct past date
        });
    }

    onBookingDatePicked = (date) => {
        this.setState({
        bookingDate: date,
        bookingDateText: Moment(date).format('DD MMM, YYYY')
        });
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
  
  

    addBooking(){  
        if(this.state.selectedCenterID){
        //this.setState({showLoader: true})
        axios.get(CONFIG.base_url +'fitnessCenters/'+ this.state.selectedCenterID)
        .then((response) => {
            this.setState({fitnessCenterData:response.data})
            var booking = {
              date: this.state.bookingDate,
              timeSlot: this.state.selectedTime,
              fitnessCenter: response.data
            }
            if(!booking.date || !booking.timeSlot || !booking.fitnessCenter){
                this.setState({showLoader: false})
                alert("Please select date, time and fitness center.")
            }
            else{
                var hours = parseInt(this.state.selectedTime.substring(0,2))
                var ampm = this.state.selectedTime.substring(6,8)
                if(ampm=='PM'){
                    hours+=12;
                }
                booking.date = new Date(new Date(booking.date).setHours(hours))
                if(new Date(booking.date).getDate()==new Date().getDate() && new Date(booking.date)<new Date()){ 
                    alert("The booking slot has already been passed.")
                }
                else {
                    axios.post(CONFIG.base_url + 'members/' + this.state.user.id + '/addAppointments', booking)
                      .then((response) => {
                        if(response.data.error=='OK'){
                          this.setState({showLoader: false})
                          alert(response.data.message)
                        }
                        else{
                          this.setState({showLoader: false})
                          alert("Appointment confirmed.")
                          this.setState({
                            bookingDate: '',
                            selectedTime: '',
                            fitnessCenter: '',
                            selectedCenter: ''
                          })
                          const { navigate } = this.props.navigation;
                          navigate("Plan")
                        }  
                      })
                      .catch((error) => {
                          this.setState({showLoader: false})
                          alert(error)
                          alert("Sorry! We were unable to confirm your appointment. Please try later.")
                      })
                  }
            }
        })
        .catch((error) => {
            this.setState({showLoader: false})
            alert(error)
            alert("Sorry! We were unable to confirm your appointment. Please try later.")
        })
        }
        else{
            alert("Please select the fitness center.")
        }
        
    
      }

  render() {
    const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
                    <Avatar
                    size="small"
                    rounded
                    icon={{name: 'arrow-back'}}
                    onPress={() => navigate('Plan')}
                    containerStyle={{margin: 30}}
                    />
                    <Text style={{
                    fontSize:24,
                    color:'white',
                    marginLeft:30,
                    marginTop:-10
                    }}>Book Your Trial Class</Text>
            </LinearGradient>

            {this.showLoader()}
            <ScrollView>
            <View style={styles.mainContainer}>
                <TouchableHighlight onPress={this.showActionSheet} underlayColor="transparent">
                <View style={styles.row}>
                    <Icon
                        name='fitness-center'
                        color='#E62221'
                        size={20} />
                    <Text style={styles.centerText} >Preferred Fitness Center: {this.state.selectedCenter}</Text> 
                    <Icon
                    name='chevron-small-down'
                    color='#E62221'
                    type='entypo'
                    containerStyle={{
                        position:'absolute',
                        right:0
                    }} />
                </View>
                </TouchableHighlight>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Preffered Membership Type?'}
                    options={this.optionsFClist}
                    cancelButtonIndex={this.optionsFClist.length-1}
                    destructiveButtonIndex={this.optionsFClist.length-1}
                    onPress={(index) => { 
                            if(index!=this.optionsFClist.length-1){
                                this.setState({
                                    selectedCenter: this.optionsFClist[index],
                                    selectedCenterID: this.optionsFClistID[index]
                                })
                            }
                    }}
                />
                <TouchableHighlight onPress={this.onBookingDatePress.bind(this)} underlayColor="transparent">
                <View style={styles.row}>
                <Icon
                    name='date-range'
                    color='#E62221'
                    size={20} />
                    <Text style={styles.centerText} onPress={this.onBookingDatePress.bind(this)}>Booking date: {this.state.bookingDateText}</Text> 
                    <Icon
                    name='chevron-small-down'
                    color='#E62221'
                    type='entypo'
                    containerStyle={{
                        position:'absolute',
                        right:0
                    }} />
                    <DatePickerDialog ref="bookingDateDialog" onDatePicked={this.onBookingDatePicked.bind(this)} />
                </View>
                </TouchableHighlight>
            
                <TouchableHighlight onPress={this.showActionSheetForTime} underlayColor="transparent">
                <View style={styles.row}>
                    <Icon
                        name='access-time'
                        color='#E62221'
                        size={20} />
                    <Text style={styles.centerText} onPress={this.showActionSheetForTime}>Select Time Slot: {this.state.selectedTime}</Text> 
                    <Icon
                    name='chevron-small-down'
                    color='#E62221'
                    type='entypo'
                    containerStyle={{
                        position:'absolute',
                        right:0
                    }} />
                </View>
                </TouchableHighlight>
                <ActionSheet
                    ref={o => this.ActionSheetTime = o}
                    title={'Preffered time slot?'}
                    options={optionsTime}
                    cancelButtonIndex={optionsTime.length-1}
                    destructiveButtonIndex={optionsTime.length-1}
                    onPress={(index) => { 
                            if(index!=optionsTime.length-1){
                                this.setState({
                                    selectedTime: optionsTime[index]
                                })
                            }
                    }}
                />
            </View>
            </ScrollView>
            <TouchableHighlight onPress={() => this.addBooking()} underlayColor="transparent">
                <View style={styles.buy}>
                    <Text style={styles.buyText}>Confirm Booking</Text>
                </View>
            </TouchableHighlight>
        </View> 
        )
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headDesign:{
    width:width,
    height:140
  },
  loader:{
    marginTop:'100%',
  },
  buttonContainer: {
    position:'absolute',
    zIndex:2,
    bottom:20,
    alignItems: 'center'
  },
  buy:{
    width:260,
    height:50,
    backgroundColor: '#E62221',
    borderRadius: 50,
    alignItems: 'center',
    padding:8,
    paddingTop:15,
    marginBottom:20
  },
  buyText:{
    color:'white'
  },
  mainContainer:{
    marginTop:20,
  },
  row:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth:1,
    borderBottomColor: '#afafaf',
    width:width-40,
    marginLeft:10,
    marginRight: 10,
    marginTop:15,
    paddingBottom: 15,
  },
  centerText:{
      color:'grey',
      fontSize:16,
      marginLeft: 5,
      fontWeight: 'bold',
  },
  about:{
    width:width-40,
    marginLeft: 15,
    marginTop: 20,
    marginRight: 10,
    borderBottomWidth:1,
    borderBottomColor: '#afafaf',
    paddingBottom: 15,
  },
  aboutHead:{
      fontWeight: 'bold',
      color:'#E62221'
  },
  aboutText:{
      marginTop: 8,
      lineHeight:18
  },
  loader:{
    marginTop:'100%',
  },
  ploader:{
    width:width,
    zIndex:1,
    position:'absolute',
    backgroundColor:"rgba(255,255,255,1)",
    paddingTop:"75%",
    height:"100%",
    top:140
  }
});
