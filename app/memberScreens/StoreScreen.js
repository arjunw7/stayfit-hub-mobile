import React, { Component } from 'react';
import { Avatar, Header, Icon } from 'react-native-elements';
import { Dimensions, TouchableHighlight } from "react-native";
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Modal,
    AsyncStorage,
    ScrollView,
    BackHandler
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    handleBackButton() {
        return true;
    }

    static navigationOptions = {
        title: 'Store',
        header: null
    };
    render() {
        const { navigate } = this.props.navigation;
        return ( 
        <View style = { styles.container } >
            <ScrollView >
            <View style = { styles.innerContainer } >
                <Text style = { styles.mainText } > STAYFIT HUB MEMBERSHIP </Text> 
                <Text style = { styles.subText } > Unlimited access to all Stayfit services </Text> 
                <View style = {{
                        borderBottomColor: '#e4e4e4',
                        borderBottomWidth: 1,
                        width: width,
                        alignSelf: 'center'
                    }}/> 
                <View style = { styles.memberOptionList } >
                    <View style = { styles.box } >
                        <Image source = { require('../assets/memberOption4.jpg') }
                        style = { styles.optionLogo }
                        resizeMode = "contain" >
                        </Image> 
                        <Avatar 
                        size = "small"
                        rounded 
                        icon = {{ name: 'add', color: '#E62221' }}
                        overlayContainerStyle = {{ backgroundColor: 'white' }}
                        onPress = {() => { navigate("PackDetails", {"duration": 1}) }}
                        containerStyle = {{ position: 'absolute', margin: 10, bottom: 0, right: 10 }}
                        /> 
                    </View> 
                    <View style = { styles.box } >
                        <Image source = { require('../assets/memberOption1.jpg') }
                            style = { styles.optionLogo }
                            resizeMode = "contain" >
                        </Image> 
                        <Avatar 
                        size = "small"
                        rounded icon = {{ name: 'add', color: '#E62221' }}
                        overlayContainerStyle = {{ backgroundColor: 'white' }}
                        onPress = {() => { navigate("PackDetails", {"duration": 3}) }}
                        containerStyle = {{ position: 'absolute', margin: 10, bottom: 0, right: 10 }}
                        /> 
                    </View > 
                    <View style = { styles.box } >
                        <Image source = { require('../assets/memberOption2.jpg') }
                            style = { styles.optionLogo }
                            resizeMode = "contain" >
                        </Image> 
                        <Avatar 
                        size = "small"
                        rounded icon = {{ name: 'add', color: '#E62221' }}
                        overlayContainerStyle = {{ backgroundColor: 'white' }}
                        onPress = {() => { navigate("PackDetails", {"duration": 6}) }}
                        containerStyle = {{ position: 'absolute', margin: 10, bottom: 0, right: 10 }}
                        /> 
                    </View > 
                    <View style = { styles.box } >
                        <Image source = { require('../assets/memberOption3.jpg') }
                        style = { styles.optionLogo }
                        resizeMode = "contain" >
                        </Image> 
                        <Avatar size = "small"
                        rounded icon = {{ name: 'add', color: '#E62221' }}
                        overlayContainerStyle = {{ backgroundColor: 'white' }}
                        onPress = {() => { navigate("PackDetails", {"duration": 12})}}
                        containerStyle = {{ position: 'absolute', margin: 10, bottom: 0, right: 10 }}
                        /> 
                    </View > 
                </View> 
            </View > 
            </ScrollView> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainText: {
        fontWeight: "bold",
        marginTop: 15,
        alignSelf: 'flex-start',
        marginLeft: 30
    },
    subText: {
        fontWeight: "300",
        paddingBottom: 10,
        alignSelf: 'flex-start',
        fontSize: 12,
        marginLeft: 30
    },
    memberOptionList: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 20,
        paddingTop: 0,
        marginTop: 10
    },
    box: {
        flexBasis: width / 2 - 40,
        margin: 10,
        height: 210
    },
    optionLogo: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 7
    },
    closeButton: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end'
    },
    ModalHead: {
        fontSize: 24,
        margin: 20,
        alignSelf: 'center'
    },
    preferenceHead: {
        alignSelf: 'center',
        fontSize: 16,
        alignItems: 'center',
        marginTop: 40,
    },
    preferences: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width - 40,
        marginTop: 60,
    },
    preference: {
        backgroundColor: '#E62221',
        width: (width - 40) / 3 - 20,
        margin: 10,
        height: 40,
        borderRadius: 40,
    },
    prefText: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingTop: 10,
    },
    headWrap: {
        alignItems: 'center',
    },
    paymentButton: {
        width: width - 80,
        height: 50,
        backgroundColor: '#E62221',
        borderRadius: 50,
        marginBottom: 30,
        alignItems: 'center',
        padding: 8,
        paddingTop: 15,
        marginTop: 100,
        marginLeft: 15,
    },
    paymentText: {
        color: 'white'
    },
    estimate: {
        marginTop: 20,
        backgroundColor: '#ededed',
        paddingBottom: 20,
    },
    estimateBox: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width - 60,
        marginTop: 10,
        marginLeft: 10
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
        right: 10,
        top: 0
    }

});