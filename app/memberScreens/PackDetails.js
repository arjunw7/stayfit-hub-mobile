import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Image, 
  TouchableHighlight, 
  Text,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import axios from 'axios';
import CONFIG from '../config/config'
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import Moment from 'moment';
var width = Dimensions.get('window').width;
import RazorpayCheckout from 'react-native-razorpay';
const options = [
'Gym', 
'GroupX', 
'Combo',
'Cancel'
]

export default class PackDetails extends Component{
    static navigationOptions = {
        title: 'Pack Details',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedType:'',
            startDateText: Moment(new Date()).format('DD MMM, YYYY'),
            startDate: new Date(),
            days: this.props.navigation.state.params.duration==12?365: this.props.navigation.state.params.duration*30
        }
        axios.get(CONFIG.base_url + 'membershipTypes')
        .then((response) => {
            console.log(response)
            this.setState({ membershipTypes: response.data._embedded.membershipTypes })
        })
        .catch((error) => {
            console.log(error)
        }) 
    }
  
    componentWillMount() {
        AsyncStorage.getItem('member').then((member) => {
            this.setState({ user: JSON.parse(member) })
        })
    }

    componentDidMount(){
        axios.get(CONFIG.base_url + 'fitnessCenters')
        .then((response) => {
            this.setState({fitnessCentersList:response.data._embedded.fitnessCenters})
            this.setOptions(response.data._embedded.fitnessCenters)
        })
        .catch((error) => {
            alert(error)
        })
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }
    showActionSheetFitnessCenters = () => {
        this.ActionSheetFitnessCenter.show()
    }
    optionsFitnessCenterList = []
    optionsFitnessCenterListID = []
    setOptions(fcList){
        for(var i=0; i<fcList.length; i++){
            this.optionsFitnessCenterList.push(fcList[i].name)
            this.optionsFitnessCenterListID.push(fcList[i].id)
        }
        this.optionsFitnessCenterList.push("Cancel")
        this.setState({
            optionsFitnessCenterList:this.optionsFitnessCenterList,
            optionsFitnessCenterListID: this.optionsFitnessCenterListID
        })
      }
      updateFitnessCenter(itemIndex){
        this.setState({showLoader: true})
        axios.get(CONFIG.base_url + 'fitnessCenters/'+itemIndex)
        .then((response) => {
           this.setState({fitnessCenter: response.data,showLoader: false})
        })
        .catch((error) => {
          this.setState({showLoader: false})
            console.log(error)
        })
      }
    onStartDatePress = () => {
        let startDate = this.state.startDate;
        if(!startDate || startDate == null){
        startDate = new Date();
        this.setState({
            startDate: startDate
        });
        }

        this.refs.startDateDialog.open({
        date: startDate,
        minDate: new Date() //To restirct past date
        });
    }

    onStartDatePicked = (date) => {
        this.setState({
        startDate: date,
        startDateText: Moment(date).format('DD MMM, YYYY')
        });
    }
    calculatePrice(type) {
        var filteredMemb = this.filterMembership(this.state.membershipTypes, { duration: this.state.days, description: type })
        this.setState({ 
            estimateAmount: filteredMemb[0].price,
            estimateTax: 0.18*filteredMemb[0].price,
            estimateTotal: filteredMemb[0].price + 0.18*filteredMemb[0].price,
            selectedMembershipTypeId: filteredMemb[0].id
        })
    }

    filterMembership(membershipes, criteria) {
        return membershipes.filter(function(obj) {
            return Object.keys(criteria).every(function(c) {
                return obj[c] == criteria[c];
            });
        });
    }
    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            alert("AsyncStorage error")
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    makePayment() {
        if(!this.state.estimateTotal){
            alert("Please select your preferred membership type.")
        }
        else if(!this.state.fitnessCenter){
            alert("Please select a fitness center.")
        }
        else if(this.state.user.isMembershipActive){
            alert("You are already a member :)")
        }
        else{
            var options = {
                description: 'Stayfit Membership',
                image: 'https://pbs.twimg.com/profile_images/556053790558674944/fc6lywIf_400x400.png',
                currency: 'INR',
                key: 'rzp_test_h0wtzPAMi8xlqT',
                amount: this.state.estimateTotal*100,
                name: 'Stayfit Hub',
                prefill: {
                    email: this.state.user.email,
                    contact: this.state.user.phone,
                    name: this.state.user.name
                },
                theme: { color: '#F37254' }
            }
            RazorpayCheckout.open(options).then((data) => {
                console.log(data)
                var data = {
                    memberId:this.state.user.id,
                    membershipTypeId: this.state.selectedMembershipTypeId,
                    paymentId: data.razorpay_payment_id,
                    fitnessCenterId: this.state.fitnessCenter.id
                }
                axios.post(CONFIG.base_url + 'subscription/success?memberId=' + data.memberId + '&membershipTypeId=' + data.membershipTypeId + '&paymentId='+ data.paymentId + '&fitnessCenterId='+ data.fitnessCenterId)
                .then((response) => {
                    axios.get(CONFIG.base_url + 'members/' + this.state.user.id)
                    .then((res) => {
                        const { navigate } = this.props.navigation;
                        var member = JSON.stringify(res.data)
                        this.saveItem('member', member)
                        this.setState({user:res.data})
                        navigate("Plan", {member:member})
                        alert("Congratulations! Your membership has been confirmed.")
                    })
                    .catch((error) => {
                        console.log(error)
                    }) 
                 
                })
                .catch((error) => {
                    console.log(error)
                }) 
            }).catch((error) => {
                console.log(error)
                alert(error.description);
            });
        }
    }
    renderPrice() {
        if (this.state.estimateAmount) {
            return ( 
                <View>
                <View style = { styles.estimateBox }>
                    <View>
                        <Text style = { styles.estimateText }> Membership cost </Text> 
                    </View > 
                    <View style = { styles.estimateAmountBox } >
                        <Text style = { styles.estimateAmount } > ₹ {this.state.estimateAmount } 
                        </Text> 
                    </View > 
                </View > 
                <View style = { styles.estimateBox }>
                    <View>
                        <Text style = { styles.estimateText }> 18% GST </Text> 
                    </View > 
                    <View style = { styles.estimateAmountBox } >
                        <Text style = { styles.estimateAmount } > ₹ {this.state.estimateTax} 
                        </Text> 
                    </View>
                </View > 
                <View style = { styles.estimateBox }> 
                    <View>
                        <Text style = { styles.estimateText }> Payable amount </Text> 
                    </View > 
                    <View style = { styles.estimateAmountBox } >
                        <Text style = { styles.estimateAmount } > ₹ {this.state.estimateTotal} 
                        </Text> 
                    </View > 
                </View> 
            </View>
            )
        }
    }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.membershipTypes){
        return(
            <View style={styles.container}>
            <Image source={require('../assets/head.jpg')}
                style={{width:width, height:200, position: 'absolute', top:0, zIndex:1}}
                resizeMode="cover">
            </Image>
            <View style={styles.head}>
                <Avatar
                    size="small"
                    rounded
                    icon={{name: 'arrow-back'}}
                    onPress={() => navigate('Store')}
                    containerStyle={{margin: 30}}
                />
                <Text style={{
                    fontSize:24,
                    color:'white',
                    marginLeft:30,
                    marginTop:30
                }}>{this.props.navigation.state.params.duration} Month Unlimited Classes</Text>
            </View>
            <ScrollView>
            <View style={styles.mainContainer}>
            <TouchableHighlight onPress={this.showActionSheet} underlayColor="transparent">
                <View style={styles.row}>
                <Icon
                    name='fitness-center'
                    color='#E62221'
                    size={20} />
                    <Text style={styles.centerText} onPress={this.showActionSheet}>Preferred Membership Type: {this.state.selectedType}</Text> 
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
                <TouchableHighlight onPress={this.onStartDatePress.bind(this)} underlayColor="transparent">
                <View style={styles.row}>
                <Icon
                    name='date-range'
                    color='#E62221'
                    size={20} />
                    <Text style={styles.centerText} onPress={this.onStartDatePress.bind(this)}>Starts on: {this.state.startDateText}</Text> 
                    <Icon
                    name='chevron-small-down'
                    color='#E62221'
                    type='entypo'
                    containerStyle={{
                        position:'absolute',
                        right:0
                    }} />
                    <DatePickerDialog ref="startDateDialog" onDatePicked={this.onStartDatePicked.bind(this)} />
                </View>
                </TouchableHighlight>
                <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'Preffered Membership Type?'}
                options={options}
                cancelButtonIndex={3}
                destructiveButtonIndex={3}
                onPress={(index) => { 
                        if(index!=3){
                            this.setState({
                                selectedType: options[index]
                            })
                            this.calculatePrice(options[index])
                        }
                }}
                />
                <TouchableHighlight onPress={this.showActionSheetFitnessCenters} underlayColor="transparent">
                    <View style={styles.row}>
                        <Icon
                        name='fitness-center'
                        color='#E62221'
                        size={20} />
                        <Text style={styles.centerText} >Preferred Center: {this.state.fitnessCenter? this.state.fitnessCenter.name : ""}</Text> 
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
                        ref={o => this.ActionSheetFitnessCenter = o}
                        title={'Fitness Center?'}
                        options={this.optionsFitnessCenterList}
                        cancelButtonIndex={this.optionsFitnessCenterList.length-1}
                        destructiveButtonIndex={this.optionsFitnessCenterList.length-1}
                        onPress={(index) => { 
                                if(index!=this.optionsFitnessCenterList.length-1){
                                    this.updateFitnessCenter(this.optionsFitnessCenterListID[index])
                                }
                        }}
                    />
                <View style={styles.about}>
                    <Text style={styles.aboutHead}>About this pack</Text>
                    <Text style={styles.aboutText}>Book unlimited Classes for {this.props.navigation.state.params.duration} Month</Text>
                    <Text style={styles.aboutText}>
                        Every Stayfit Branch offers a plethore of workout formats designed and run by highly qualified fitness experts. These workouts are great for newbies and fitness veterans alike, and are guaranteed to show results.
                   </Text>
                </View>
                <View style={styles.costing}>
                    {this.renderPrice()}
                </View>
            </View>
            <TouchableHighlight onPress={() => this.makePayment()} underlayColor="transparent">
                <View style={styles.buy}>
                  <Text style={styles.buyText}>Buy Subscription</Text>
                </View>
              </TouchableHighlight>
            </ScrollView>
        </View> 
        )
    }
    else{
        return(
            <View>
            <Image source={require('../assets/head.jpg')}
            style={{width:width, height:200, position: 'absolute', top:0, zIndex:1}}
            resizeMode="cover">
            </Image>
            <View style={styles.head}>
                <Avatar
                    size="small"
                    rounded
                    icon={{name: 'arrow-back'}}
                    onPress={() => navigate('Store')}
                    containerStyle={{margin: 30}}
                />
                <Text style={{
                    fontSize:24,
                    color:'white',
                    marginLeft:30,
                    marginTop:30
                }}>{this.props.navigation.state.params.duration} Month Unlimited Classes</Text>
            </View>
            <View style={styles.loader}>
            <ActivityIndicator size="large" color="grey" />
        </View>
        </View>
       
    )
}

}
}
const styles = StyleSheet.create({
container: {
  flex:1,
justifyContent: 'center',
alignItems: 'center',
},
loader:{
height:"100%",
marginTop:200,
position:'absolute'
}, 
head: {
position:'absolute',
top:5,
left:5,
zIndex:100
},
buttonContainer: {
position:'absolute',
zIndex:2,
bottom:20,
alignItems: 'center'
},
buy:{
width:width-100,
marginLeft:50,
height:50,
marginTop:20,
marginBottom:40,
backgroundColor: '#E62221',
borderRadius: 50,
alignItems: 'center',
padding:8,
paddingTop:15
},
buyText:{
color:'white'
},
mainContainer:{
marginTop:210,
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
estimateBox: {
flexWrap: 'wrap',
flexDirection: 'row',
width: width - 40,
marginTop: 10,
marginLeft: 15
},
estimateText: {
width: 160,
fontSize: 12
},
estimateAmount: {
fontSize: 12,
},
estimateAmountBox: {
position: 'absolute',
right: 5,
top: 0
},
loader:{
marginTop:'100%',
}
});
