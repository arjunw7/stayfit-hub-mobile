import React, { Component } from 'react';
import { Avatar, SearchBar, ListItem, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import GradientHeader from '../components/GradientHeader';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
export default class SuperAdminEmployeeHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            employeeType: this.props.navigation.state.params.employeeType,
            frontdeskInput: '',
            trainerInput: '',
            headTrainerInput: '',
        }
        if(this.props.navigation.state.params.employeeType=='trainer'){       
            axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/trainers')
            .then((response) => {
                console.log(response)
                this.setState({trainers:response.data})
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
        }
        else if(this.props.navigation.state.params.employeeType=='headTrainer'){       
            axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/headTrainers')
            .then((response) => {
                console.log(response)
                this.setState({headTrainers:response.data})
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
        }
        else if(this.props.navigation.state.params.employeeType=='frontdesk'){       
            axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/frontdeskAdmins')
            .then((response) => {
                console.log(response)
                this.setState({frontdeskAdmins:response.data})
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
        }
        
    }
    static navigationOptions = {
        title: 'Employees',
        header: null
    }
    renderEmployeeTabs(empType, navigate){
        if(empType=='trainer'){
            return (
                <View>
                    <GradientHeader title="Trainers" navigation={this.props.navigation}/>
                    <SearchBar
                    round
                    lightTheme
                    searchIcon={{ size: 24 }}
                    containerStyle={{width:width, backgroundColor:'#f7f7f7'}}
                    inputStyle={{backgroundColor:'white'}}
                    inputContainerStyle={{backgroundColor:'white'}}
                    onChangeText={(trainerInput) => this.setState({trainerInput})}
                    placeholder='Search trainers...' />
                    <ScrollView>
                    {
                        this.state.trainers
                        .filter(i => this.state.trainerInput === '' || i.name.includes(this.state.trainerInput))
                        .map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.name}
                            subtitle={item.email}
                            containerStyle={{width:width}}
                            leftIcon={{ name: 'av-timer'}}
                            titleStyle={{fontSize:14}}
                            subtitleStyle={{fontSize:12}}
                            onPress={() => navigate('SuperAdminViewEmployee', {employee: item, employeeType: this.state.employeeType})}
                        />
                        ))
                    }
                    </ScrollView>
              </View>
            )
        }
        else if(empType=='headTrainer'){
            return(
                <View>
                    <GradientHeader title="Head Trainers" navigation={this.props.navigation}/>
                    <SearchBar
                    round
                    lightTheme
                    searchIcon={{ size: 24 }}
                    containerStyle={{width:width, backgroundColor:'#f7f7f7'}}
                    inputStyle={{backgroundColor:'white'}}
                    inputContainerStyle={{backgroundColor:'white'}}
                    onChangeText={(headTrainerInput) => this.setState({headTrainerInput})}
                    placeholder='Search head trainer...' />
                    <ScrollView>
                    {
                        this.state.headTrainers
                        .filter(i => this.state.headTrainerInput === '' || i.name.includes(this.state.headTrainerInput))
                        .map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.name}
                            subtitle={item.email}
                            containerStyle={{width:width}}
                            leftIcon={{ name: 'av-timer'}}
                            titleStyle={{fontSize:14}}
                            subtitleStyle={{fontSize:12}}
                            onPress={() => navigate('SuperAdminViewEmployee', {employee: item, employeeType: this.state.employeeType})}
                        />
                        ))
                    }
                    </ScrollView>
              </View>
            )
        }
        else if(empType=='frontdesk'){
            return(
                <View>
                    <GradientHeader title="Frontdesk Admins" navigation={this.props.navigation}/>
                    <SearchBar
                    round
                    lightTheme
                    searchIcon={{ size: 24 }}
                    containerStyle={{width:width, backgroundColor:'#f7f7f7'}}
                    inputStyle={{backgroundColor:'white'}}
                    inputContainerStyle={{backgroundColor:'white'}}
                    onChangeText={(frontdeskInput) => this.setState({frontdeskInput})}
                    placeholder='Search frontdesk admin...' />
                    <ScrollView>
                    {
                        this.state.frontdeskAdmins
                        .filter(i => this.state.frontdeskInput === '' || i.name.includes(this.state.frontdeskInput))
                        .map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.name}
                            subtitle={item.email}
                            containerStyle={{width:width}}
                            leftIcon={{ name: 'av-timer'}}
                            titleStyle={{fontSize:14}}
                            subtitleStyle={{fontSize:12}}
                            onPress={() => navigate('SuperAdminViewEmployee', {employee: item, employeeType: this.state.employeeType})}
                        />
                        ))
                    }
                    </ScrollView>
              </View>
            )
        }
    }
  render() {
    const { navigate } = this.props.navigation;
        if(this.state.trainers || this.state.headTrainers || this.state.frontdeskAdmins){
            return (
                <View style={styles.container}>
                    {this.renderEmployeeTabs(this.state.employeeType, navigate)}
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
                                onPress={() => navigate('SuperAdminAddEmployee', {empType: this.state.employeeType})}
                            />
                </View>
        
            )
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
    width:width
  },
  headDesign:{
    width:width,
    height:140
  },
  mainIcons:{
    width:width-40,
    margin:20,
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  mainIcon:{
    width:width/2-40,
    margin:10,
    paddingTop:20,
    paddingBottom:20,
    borderRadius:7,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor:'white',
    height:100
  },
  iconText:{
    fontSize:12,
    color:'#E62221',
    alignSelf:'center',
    alignItems:'center',
    marginTop:10
  },
  loader:{
    marginTop:'100%',
  }
});