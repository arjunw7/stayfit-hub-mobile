import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import SelectMultiple from 'react-native-select-multiple'
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class SuperAdminAddExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: []
    }
    axios.get(CONFIG.base_url + 'muscleGroups/')
    .then((response) => {
        this.setState({muscleGroups:response.data._embedded.muscleGroups})
    })
    .catch((error) => {
        alert(error)
    })
  }
  static navigationOptions = {
    title: 'Add Exercise',
    header:null
  };

  componentDidMount(){
    
  }
  onSelectionsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  addExercise(){
    var exercise = {
      name: this.state.name,
      selectedItems:[]
    }
    axios.post(CONFIG.base_url + 'exercises/', exercise)
    .then((response) => {
      var exerciseWithParth = {
        name: this.state.name,
        partsTargeted: this.state.selectedItems
      }
        axios.put(CONFIG.base_url + 'exercises/'+response.data.id, exerciseWithParth)
        .then((response) => {
            alert("Exercise Created.")
            const { navigate } = this.props.navigation;
            navigate('SuperAdminHome')
        })
        .catch((error) => {
            console.log(error)
            alert(JSON.stringify(error))
        })
    })
    .catch((error) => {
        console.log(error)
        alert(JSON.stringify(error))
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.muscleGroups && this.state.selectedItems){
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
            }}>Add Exercise</Text>
          </LinearGradient>
          <ScrollView>
          <View style={styles.inputForm}>
            <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <TextInput
                  maxLength={30}
                  style={styles.inputStyle1}
                  placeholder="Enter Exercise Name"
                  onChangeText={(name) => this.setState({name:name})}
                />
            </View>
            <View style={styles.inputContainer1}>
              <View style={{flexDirection: 'row'}}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <Text style={{fontSize:12, marginTop:5, marginLeft:5}}> Target Muscles</Text>
              </View>
              <SelectMultiple
                items={this.state.muscleGroups}
                selectedItems={this.state.selectedItems}
                onSelectionsChange={this.onSelectionsChange} />
            </View>
            <TouchableHighlight onPress={() => this.addExercise()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Add Exercise</Text>
                  </View>
              </TouchableHighlight>
          </View>
          </ScrollView>
        </View>
      );
    }
    else{
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headDesign:{
    width:width,
    height:140
  },
  inputContainer1: {
    backgroundColor: '#ededed',
    padding:5,
    marginTop: 15,
    paddingLeft:5,
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
});