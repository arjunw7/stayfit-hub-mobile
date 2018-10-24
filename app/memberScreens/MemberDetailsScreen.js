import React, { Component } from 'react';
import { Avatar, FormLabel, Button } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class MemberDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      goal: {
        id: this.props.navigation.state.params.goalId,
        name: this.props.navigation.state.params.goalName,
        description: this.props.navigation.state.params.goalText
      }
    }
    }
  static navigationOptions = {
    title: 'Member Details',
    header:null
  };
  changeGender(gender){
    if(gender=='Male'){
      this.setState({
        isMale: true,
        isFemale: false,
        gender: 'Male'
      })
    }
    if(gender=='Female'){
      this.setState({
        isFemale: true,
        isMale: false,
        gender: 'Female'
      })
    }
  }
  connectEmail(){
    const { navigate } = this.props.navigation;
    if(!this.state.gender || !this.state.name || !this.state.height || !this.state.weight){
      alert("Please enter all the details.")
    }
    else if(parseFloat(this.state.height)>10 || parseFloat(this.state.height)<3){
      alert("Your height seems to be incorrect. Please verify.")
    }
    else if(parseFloat(this.state.weight)>200 ||parseFloat(this.state.weight)<30){
      alert("Your weight seems to be incorrect. Please verify.")
    }
    else {
      var member = {
        goal:this.state.goal,
        gender:this.state.gender,
        name: this.state.name,
        height: this.state.height,
        weight:this.state.weight
      }
      console.log(member)
      var memberString = JSON.stringify(member)
      navigate("ConnectEmail", {member: memberString})
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container}>
         <Avatar
          size="small"
          rounded
          icon={{name: 'arrow-back'}}
          onPress={() => navigate('GoalSelection')}
          containerStyle={{margin: 30}}
        />
        <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.infoText}>
            Tell us more about you!
          </Text>
          <View style={styles.inlineButtons}>
              <View >
                <Button onPress={() => this.changeGender("Male")}
                    title="MALE"
                    titleStyle={{ color: "white" }}
                    buttonStyle={[styles.base, this.state.isMale && styles.activeGender]}
                    containerStyle={{ marginTop: 20 }}
                  />
              </View>
              <View >
              <Button onPress={() =>this.changeGender("Female")}
                  title="FEMALE"
                  titleStyle={{ color: "white" }}
                  buttonStyle={[styles.base, this.state.isFemale && styles.activeGender]}
                  containerStyle={{ marginTop: 20 }}
                />
            </View>
          </View>
          <View style={styles.form}>
            <FormLabel labelStyle={{
              color:'#E62221',
              fontWeight:'300'
            }}>Your name</FormLabel>
            <TextInput
                  maxLength={30}
                  value={this.state.name}
                  style={styles.inputStyle}
                  onChangeText={(name) => this.setState({name:name})}
                />
            <FormLabel labelStyle={{
              color:'#E62221',
              fontWeight:'300'
            }}>Your height(feet)</FormLabel>
            <TextInput
                  keyboardType="decimal-pad"
                  value={this.state.height}
                  style={styles.inputStyle}
                  onChangeText={(height) => this.setState({height:height})}
                />
            <FormLabel labelStyle={{
              color:'#E62221',
              fontWeight:'300'
            }}>Your weight(kg)</FormLabel>
             <TextInput
                  keyboardType="decimal-pad"
                  value={this.state.weight}
                  style={styles.inputStyle}
                  onChangeText={(weight) => this.setState({weight:weight})}
                />
            <TouchableHighlight onPress={() => this.connectEmail()}
                underlayColor="transparent">
                <View style={styles.nextButton}>
                    <Text style={styles.genderText}>NEXT</Text>
                </View>
            </TouchableHighlight>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  innerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back:{
      position:'absolute',
      top:30,
      left:15
  },
  infoText:{
      color:'#E62221',
      fontSize:14,
      fontWeight:"300",
      alignSelf:'center',
      marginTop:40
  },
  genderButton:{
    width:140,
    height:55,
    backgroundColor: '#E62221',
    borderRadius: 60,
    marginBottom: 30,
    alignItems: 'center',
    padding:8,
    paddingTop:15,
    margin:10
  },
  inlineButtons:{
    flexWrap: 'wrap',
    flexDirection:'row',
    flex:1,
    alignSelf: 'center',
    marginTop:20
  },
  genderText:{
    color:'white',
    fontSize:14
  },
  form:{
    width:width,
    alignSelf:'center',
    padding:20,
    flex:8
  },
  heightInputs:{
    width:width,
    flexWrap: 'wrap',
    flexDirection:'row',
    flex:1,
  },
  label:{
    color:'#E62221'
  },
  input:{
    borderColor: '#E62221'
  },
  nextButton:{
    width:width-60,
    height:50,
    backgroundColor: '#E62221',
    borderRadius: 60,
    marginBottom: 30,
    alignItems: 'center',
    alignSelf: 'center',
    padding:8,
    paddingTop:15,
    marginTop: 30,
    marginLeft:30,
    marginRight:30
  },
  units:{
    color:'#E62221',
    fontSize: 12,
    borderColor:'#E62221',
    borderRadius:7,
    borderWidth:1,
    padding:2,
    height:20,
    marginTop:20
  },
  base:{
      width:140,
      height:50,
      backgroundColor: '#db6b6b',
      borderRadius: 60,
      marginBottom: 30,
      alignItems: 'center',
      padding:8,
      paddingTop:10
  },
  activeGender:{
    backgroundColor:'#E62221'
  },
  inputStyle:{
    width:width-80,
    marginLeft: 20,
    height:40,
    borderBottomColor:'#E62221',
    borderBottomWidth: 1,
  }

});

