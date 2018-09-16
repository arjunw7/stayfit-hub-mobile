import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { Picker } from 'react-native-picker-dropdown'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput
} from 'react-native';
var width = Dimensions.get('window').width;
var base_url = "http://192.168.0.4:8080/"
export default class HealthProfileScreen extends Component {
  constructor(props) {
    super(props);
      this.state ={
          user: JSON.parse(this.props.navigation.state.params.user),
          goalsList:[]
      }
      axios.get(base_url + 'goals')
        .then((response) => {
            this.setState({goalsList:response.data._embedded.goals})
        })
        .catch((error) => {
            alert(error)
        })
  }
    static navigationOptions = {
    title: 'Health Profile',
    header:null
  };

  componentDidMount(){
   axios.get(base_url + 'members/' + this.state.user.id)
    .then((response) => {
        this.setState({user:response.data})
        this.getGoal()
    })
    .catch((error) => {
        alert(error)
    })
  }
  getGoal(){
    var goalURL = this.state.user._links.goal.href
    axios.get(goalURL)
        .then((response) => {
            this.setState({goal:response.data})
        })
        .catch((error) => {
            alert(error)
        })
  }
  
  submitChanges(){
    alert("Changes saved successfully.")
  }
  updateHeight(itemValue){
    var tempMember = this.state.user;
    tempMember.height = itemValue
    this.setState({user:tempMember})
  }
  updateWeight(itemValue){
    var tempMember = this.state.user;
    tempMember.weight = itemValue
    this.setState({user:tempMember})
  }
  updateGoal(itemIndex){
    axios.get(base_url + 'goals/'+itemIndex)
    .then((response) => {
        var updatedGoal = response.data._links.self.href
        var goalURL = this.state.user._links.goal.href
        axios({ 
          method: 'PUT', 
          url: goalURL,
          headers: {
            "Content-Type": "text/uri-list"},
          data: updatedGoal
         })
        .then((response) => {
           this.getGoal()
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
  updateMember(){
      axios.put(base_url + 'members/'+this.state.user.id, this.state.user)
      .then((response) => {
          axios.get(base_url + 'members/'+this.state.user.id)
          .then((response) => {
              this.setState({user:response.data})
              alert("Member details updated.")
          })
          .catch((error) => {
              console.log(error)
              alert(error)
          })
      })
      .catch((error) => {
          console.log(error)
          alert(error)
      })
    }
  renderGoal(){
    if(this.state.goal){
      return(
        <Picker
              selectedValue={this.state.goal.id}
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateGoal(itemIndex)}>   
              {
                this.state.goalsList
                .map((item, i) => (
                  <Picker.Item key={i} label={item.name} value={item.id} />
                ))
              }
        </Picker>
      )
    } else{
      return(
        <Picker
              style={styles.inputStyle}
              placeholder="Select goal"
              onValueChange={(itemIndex) => this.updateGoal(itemIndex)}>  
              {
                this.state.goalsList
                .map((item, i) => (
                  <Picker.Item key={i} label={item.name} value={item.id} />
                ))
              }
        </Picker>
      )
    }
  }
  calculateBMI(){
    var w = this.state.user.weight
    var h = this.state.user.height * 0.3
    return Math.round(w / h / h * 10) / 10
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
          <Avatar
            size="small"
            rounded
            icon={{name: 'arrow-back'}}
            onPress={() => navigate('Profile')}
            containerStyle={{margin: 30}}
          />
          <Text style={{
            fontSize:24,
            color:'white',
            marginLeft:30,
            marginTop:20
          }}>My Health Profile</Text>
        </LinearGradient>
        <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={4}
                keyboardType="decimal-pad"
                style={styles.inputStyle1}
                placeholder="Enter height"
                value={this.state.user.height.toString()}
                onChangeText={(height) => this.updateHeight(height)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={4}
                keyboardType="decimal-pad"
                style={styles.inputStyle1}
                placeholder="Enter weight"
                value={this.state.user.weight.toString()}
                onChangeText={(weight) => this.updateWeight(weight)}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              {this.renderGoal()}
          </View>
          </View>
          <View style={styles.bottomSection}>
          <LinearGradient 
              colors={['#e0e0e0', '#e0e0e0', '#e0e0e0']} style={{
              width:width/2-20,
              alignSelf:'center',
              paddingTop:20,
              paddingBottom:20,
              marginRight:10,
              borderRadius:5
            }}>
            <Text style={styles.mainText}>
              BODY MASS INDEX</Text>
            <Text style={styles.subtext}>NORMAL</Text>
            <Text style={styles.bigNumber}>{this.calculateBMI()}</Text>
            
          </LinearGradient>
          <LinearGradient 
              colors={['#e0e0e0', '#e0e0e0', '#e0e0e0']}  style={{
              width:width/2-20,
              alignSelf:'center',
              paddingTop:20,
              paddingBottom:20,
              borderRadius:5
            }}>
            <Text style={styles.mainText}>
              IDEAL WEIGHT</Text>
            <Text style={styles.subtext}>ACCORDING TO WEIGHT</Text>
            <Text style={styles.bigNumber}>67.23</Text>
          </LinearGradient>
    </View>
    <TouchableHighlight onPress={() =>this.updateMember()} underlayColor="transparent"  style={{marginTop:100}}>
        <View style={styles.login}>
          <Text style={styles.loginText}>Save</Text>
        </View>
    </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headDesign:{
    width:width,
    height:160
  },
  aboutRow:{
    width:width-40,
    marginLeft:20,
    marginRight:20,
    borderBottomWidth:1,
    borderBottomColor:'#e4e4e4',
    height:50
  },
  fieldName:{
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
  bottomSection:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems:'center',
    width:width-30,
    alignSelf:'center',
    marginTop:20
  },
  bigNumber:{
    fontWeight:'bold',
    fontSize:36,
    alignSelf:'center',
    color:'#565656'
  },
  subtext:{
    fontWeight:'300',
    fontSize:8,
    alignSelf:'center',
    color:'#565656'
  },
  mainText:{
    fontWeight:'bold',
    fontSize:12,
    alignSelf:'center',
    color:'#565656'
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    height:40,
    padding:5,
    paddingTop: 8,
    marginTop: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize:12
  },
  inputStyle1: {
    flex: 1,
    paddingLeft: 7,
    fontSize:12
  },
  inputStyle2: {
    marginTop: -6,
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
      marginLeft: 40,
    },
    loginText:{
      color:'white'
    },
});