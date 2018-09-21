import React, { Component } from 'react';
import { Avatar, Header, Icon } from 'react-native-elements';
import { Dimensions, TouchableHighlight } from "react-native";
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  AsyncStorage
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class StoreScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalVisible: false,
        }
        axios.get(CONFIG.base_url + 'membershipTypes')
            .then((response) => {
                console.log(response)
                this.setState({membershipTypes:response.data._embedded.membershipTypes})
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
    }
    componentWillMount(){
        AsyncStorage.getItem('member').then((member) => {
          this.setState({user:JSON.parse(member)})
        })
      }

    setModalVisible(visible, days) {
        if(days==0){
            this.setState({estimateAmount:null})
        }
        this.setState({modalVisible: visible, days: days});
    }
    calculatePrice(type){
        var filteredMemb = this.filterMembership(this.state.membershipTypes, {duration: this.state.days, description: type})
        this.setState({estimateAmount: filteredMemb[0].price})
    }
    filterMembership(membershipes, criteria) {
        return membershipes.filter(function(obj) {
            return Object.keys(criteria).every(function(c) {
            return obj[c] == criteria[c];
            });
        });
    }
    
    static navigationOptions = {
        title: 'Store',
        header: null
    };

    renderPrice(){
        if(this.state.estimateAmount){
            return(
                <View style={styles.estimate}>
                    <View  style={styles.estimateBox}>
                        <View >
                            <Text style={styles.estimateText}>Total</Text>
                        </View>
                        <View style={styles.estimateAmountBox}>
                         <Text style={styles.estimateAmount}>₹ {this.state.estimateAmount}</Text>
                        </View>
                    </View>
                    <TouchableHighlight onPress={() => alert("Payment server unavailable")} underlayColor="transparent">
                        <View style={styles.login}>
                        <Text style={styles.loginText}>Continue to Payment</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }
    }

    render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>
            <View>
                <View style={{margin: 20}}>
                    <View>
                    <Icon iconStyle={styles.closeButton}  name='close' onPress={() => this.setModalVisible(!this.state.modalVisible, 0)}/>
                    <View style={styles.headWrap}>
                        <Text style={styles.preferenceHead}>Select your preference.</Text>
                    </View>
                    <View style={styles.preferences}>
                        <TouchableHighlight onPress={() => this.calculatePrice("Gym")}>
                            <View style={styles.preference}>
                                <Text style={styles.prefText}>GYM</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.calculatePrice("GroupX")}>
                            <View style={styles.preference}>
                                <Text style={styles.prefText}>GROUPX</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.calculatePrice("Combo")}>
                            <View style={styles.preference}>
                                <Text style={styles.prefText}>COMBO</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {this.renderPrice()}
                    </View>
                </View>
            </View>
        </Modal>
        <View style={styles.innerContainer}>
        
            <Text style={styles.mainText}>STAYFIT HUB MEMBERSHIP</Text>
            <Text style={styles.subText}>Unlimited access to all Stayfit services</Text>
            <View style={{
                    borderBottomColor: '#e4e4e4',
                    borderBottomWidth: 1,
                    width:width,
                    alignSelf:'center'
                }}
                />
            <View style={styles.memberOptionList}>
                <View style={styles.box}>
                    <Image source={require('../assets/memberOption4.jpg')}
                        style={styles.optionLogo}
                        resizeMode="contain">
                    </Image>
                    <Avatar
                        size="small"
                        rounded
                        icon={{name: 'add', color: '#E62221'}}
                        overlayContainerStyle={{backgroundColor: 'white'}}
                        onPress={() => {this.setModalVisible(!this.state.modalVisible, 30)}}
                        containerStyle={{position:'absolute',margin: 10, bottom:0, right:10}}
                    />
                </View>
                <View style={styles.box}>
                    <Image source={require('../assets/memberOption1.jpg')}
                        style={styles.optionLogo}
                        resizeMode="contain">
                    </Image>
                    <Avatar
                        size="small"
                        rounded
                        icon={{name: 'add', color: '#E62221'}}
                        overlayContainerStyle={{backgroundColor: 'white'}}
                        onPress={() => {this.setModalVisible(!this.state.modalVisible, 90)}}
                        containerStyle={{position:'absolute',margin: 10, bottom:0, right:10}}
                    />
                </View>
                <View style={styles.box}>
                    <Image source={require('../assets/memberOption2.jpg')}
                        style={styles.optionLogo}
                        resizeMode="contain">
                    </Image>
                    <Avatar
                        size="small"
                        rounded
                        icon={{name: 'add', color: '#E62221'}}
                        overlayContainerStyle={{backgroundColor: 'white'}}
                        onPress={() => {this.setModalVisible(!this.state.modalVisible, 180)}}
                        containerStyle={{position:'absolute',margin: 10, bottom:0, right:10}}
                    />
                </View>
                <View style={styles.box}>
                    <Image source={require('../assets/memberOption3.jpg')}
                        style={styles.optionLogo}
                        resizeMode="contain">
                    </Image>
                    <Avatar
                        size="small"
                        rounded
                        icon={{name: 'add', color: '#E62221'}}
                        overlayContainerStyle={{backgroundColor: 'white'}}
                        onPress={() => {this.setModalVisible(!this.state.modalVisible, 365)}}
                        containerStyle={{position:'absolute',margin: 10, bottom:0, right:10}}
                    />
                </View>
            </View>
        </View>
        </View>
    );
    }
}
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:30
    },
    innerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    mainText:{
        fontWeight:"bold",
        marginTop:15,
        alignSelf:'flex-start',
        marginLeft:30
    },
    subText:{
        fontWeight:"300",
        paddingBottom:10,
        alignSelf:'flex-start',
        fontSize:12,
        marginLeft:30
    },
    memberOptionList: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 20,
    paddingTop:0,
    marginTop:10
    },
    box: {
    flexBasis: width/2-40,
    margin: 10,
    height:210
    },
    optionLogo:{
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius:7
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
    preferenceHead:{
        alignSelf: 'center',
        fontSize:16,
        alignItems: 'center',
        marginTop: 40,
    },
    preferences:{
        flex:1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width:width-40,
        marginTop: 60,
    },
    preference:{
        backgroundColor:'#E62221',
        width:(width-40)/3-20,
        margin:10,
        height:40,
        borderRadius: 40,
    },
    prefText:{
        color:'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingTop: 10,
    },
    headWrap:{
        alignItems: 'center',
    },
    login:{
        width:width-80,
        height:50,
        backgroundColor: '#E62221',
        borderRadius: 50,
        marginBottom: 30,
        alignItems: 'center',
        padding:8,
        paddingTop:15,
        marginTop: 40,
        marginLeft: 15,
      },
      loginText:{
        color:'white'
      },
      estimate:{
        marginTop: 60,
      },
      estimateBox:{
        flexWrap: 'wrap',
        flexDirection: 'row',
        width:width-60,
        marginTop: 20,
        marginLeft: 10,
        backgroundColor:'#ededed',
        padding:10
      },
    estimateText:{
          width:100,
          fontSize:18
      },
    estimateAmount:{
        fontSize:18,
    },
    estimateAmountBox:{
        position:'absolute',
        right:10,
        top:10
    }

});