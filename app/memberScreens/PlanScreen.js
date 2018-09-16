import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  ScrollView,
  Modal,
  TouchableHighlight,
  Picker,
  AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { ButtonGroup, Header, Icon } from 'react-native-elements';
var width = Dimensions.get('window').width;
export default class PlanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(this.props.navigation.state.params.member),
      checked:false,
      bookingModalVisible: false,
      queryModalVisible: false,
      index:0,
      date:'',
      time:'',
      bookingTime: '04:00 PM'
    }
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          this.setState({
            user: JSON.parse(value)
          })
        }
       } catch (error) {
         // Error retrieving data
       }
    }
}
componentDidMount(){
  
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
              <Icon name='radio-button-unchecked' iconStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Push Up Burpees - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' iconStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Overhead Squats - 16</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' iconStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Half Crunches - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View >
              <View style={styles.scheduleItem}>
                <Icon name='radio-button-unchecked' iconStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Flutter Kicks - 20</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
            </View>
            <Text style={{marginLeft:25, fontSize:16, marginTop:20, marginBottom:10, fontWeight:'300'}}>
              Completed
            </Text>
            <View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' iconStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Push Up Burpees - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' iconStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Overhead Squats - 16</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' iconStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Half Crunches - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View >
              <View style={styles.scheduleItem}>
                <Icon name='check-circle' iconStyle={{position:'absolute', left:10, top:12}} />
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
              <Icon name='radio-button-unchecked' iconStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Push Up Burpees - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' iconStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Overhead Squats - 16</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='radio-button-unchecked' iconStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Half Crunches - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View >
              <View style={styles.scheduleItem}>
                <Icon name='radio-button-unchecked' iconStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Flutter Kicks - 20</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
            </View>
            <Text style={{marginLeft:25, fontSize:16, marginTop:20, marginBottom:10, fontWeight:'300'}}>
              Completed
            </Text>
            <View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' iconStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Push Up Burpees - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' iconStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Overhead Squats - 16</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
              <View style={styles.scheduleItem}>
              <Icon name='check-circle' iconStyle={{position:'absolute', left:10, top:12}}/>
                <Text style={styles.activityName}>Half Crunches - 12</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View >
              <View style={styles.scheduleItem}>
                <Icon name='check-circle' iconStyle={{position:'absolute', left:10, top:12}} />
                <Text style={styles.activityName}>Flutter Kicks - 20</Text>
                <Text style={styles.reps}>3 Reps</Text>
              </View>
            </View>
      </View> 
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.user){
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
                    <Text style={styles.label}>Select Booking Slot</Text>
                    <Picker
                      selectedValue={this.state.bookingTime}
                      style={{width: width-80, marginLeft:20, marginTop:20}}
                      onValueChange={(itemValue, itemIndex) => this.setState({bookingTime: itemValue})}>
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
                      style={{width: width-160, marginLeft:60, marginTop:20}}
                      date={this.state.date}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate={new Date()}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          borderWidth:2,
                          borderRadius:50,
                          borderColor:'#b3b3b3'
                        }
                      }}
                        onDateChange={(date) => {this.setState({date: date})}}>
                    </DatePicker>
                    <TouchableHighlight onPress={() =>this.setBookingModalVisible(!this.state.bookingModalVisible)} underlayColor="transparent">
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
                 {this.RenderPlan(this.state.index)}
              </ScrollView>
          </View>
        </View>
      );
    }
    
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
    height:160
  },
  label:{
    width: width-40,
    marginTop:20,
    textAlign:'center',
    alignSelf:'center',
    fontSize:14
  },
  welcomeName:{
    fontSize:26,
    fontWeight: 'bold',
    color:'white',
    margin:30,
  }

});