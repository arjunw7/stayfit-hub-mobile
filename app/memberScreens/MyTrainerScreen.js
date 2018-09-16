import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput
} from 'react-native';
import axios from 'axios';
var width = Dimensions.get('window').width;
var base_url = "http://192.168.0.4:8080/"
export default class MyTrainerScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
          user: JSON.parse(this.props.navigation.state.params.user)
      }     
  }
  componentDidMount(){
    axios.get(base_url + 'members/' + this.state.user.id)
      .then((response) => {
            axios.get(response.data._links.trainer.href)
              .then((response2) => {
                  this.setState({trainer:response2.data})
              })
              .catch((error) => {
                alert(error)
              })
      })
      .catch((error) => {
        alert(error)
      })
  }
    static navigationOptions = {
        title: 'Trainer Details',
        header:null
      };

  renderTrainer(){
    if(this.state.trainer){
      return(
        <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Name"
                value={this.state.trainer.name}
                editable={false}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={40}
                keyboardType="email-address"
                style={styles.inputStyle1}
                placeholder="Email"
                value={this.state.trainer.email}
                editable={false}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={10}
                keyboardType="phone-pad"
                style={styles.inputStyle1}
                placeholder="Gender"
                value={this.state.trainer.gender}
                editable={false}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={10}
                keyboardType="phone-pad"
                style={styles.inputStyle1}
                placeholder="Mobile number"
                value={this.state.trainer.phone}
                editable={false}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
              <DatePicker
                    style={styles.inputStyle2}
                    date={this.state.trainer.dob}
                    mode="date"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    placeholder="Select date of birth"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                      dateInput: {
                        borderWidth:0,
                        paddingLeft:7,
                        marginTop:0,
                        paddingTop:0
                      },
                      dateText:{
                        fontSize:12,
                        alignSelf: 'flex-start',
                        alignContent: 'flex-start',
                      },
                      placeholderText:{
                        fontSize:12,
                        alignSelf: 'flex-start',
                        alignContent: 'flex-start',
                      }
                    }}
                    disabled={true}>
              </DatePicker>
          </View>
         </View>
      )
    }
    return(
      <View style={{
          width:width,
          margin:30,
          alignSelf:'center'
        }}>
          <Text>Trainer details not yet updated yet.</Text>
      </View>
      
    )
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
            marginTop:-10
          }}>My Trainer</Text>
        </LinearGradient>
        {this.renderTrainer()}
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
    height:140
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
    }
});